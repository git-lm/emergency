<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of login
 * 登录
 * @author Administrator
 */
class Metal extends CI_Controller {

    var $data = array();

    function __construct() {

        parent::__construct();
        $this->load->model('model_cmf');
        $this->load->model('model_public');
        $this->load->model('model_teacher');
        $this->load->model('model_gateway');
        $this->load->model('uploads');
        $this->load->add_package_path(APPPATH . '../package_main', false);
        $this->now_time = date('Y-m-d H:i:s');
        $this->emergerncyGroupId = $this->session->userdata('emergerncyGroupId');
        $this->emergerncyUserId = $this->session->userdata('emergerncyUserId');
        $this->uid = 0;
        $this->c_id = 0;
        if (!empty($this->emergerncyGroupId)) {
            $this->uid = $this->emergerncyGroupId; //小组ID
            $processCourse = $this->model_public->getGroupCourse($this->uid); //小组的课程
            $this->c_id = !empty($processCourse['id']) ? $processCourse['id'] : 0;  //课程ID
            $emergerncyGroup = $this->model_public->getGroup($this->emergerncyGroupId); //小组信息
            $this->name = $emergerncyGroup->name; //教师名称
        }
        if (!empty($this->emergerncyUserId)) {
            $this->uid = $this->emergerncyUserId; //教师ID
            $processCourse = $this->model_teacher->getProcessCourse($this->uid);  //教师所上课程
            $this->c_id = !empty($processCourse->id) ? $processCourse->id : 0; //课程ID
            $emergerncyUser = $this->model_public->getUser($this->emergerncyUserId); //教师信息
            $this->name = $emergerncyUser->name; //教师名称
        }
    }

    /*
     * 绑定事件
     * client_id  客户端唯一ID
     */

    public function bindUid() {
        if (!empty($_POST['client_id'])) {
            if (!empty($this->emergerncyUserId)) {
                $uid = 't' . $this->uid;
                $this->model_gateway->bindUid($_POST['client_id'], $uid);
            }

            if (!empty($this->emergerncyGroupId)) {
                $uid = 's' . $this->uid;
                $this->model_gateway->joinGroup($_POST['client_id'], $this->c_id);
            }
            $resjson['state'] = 'ok';
            $resjson['msg'] = '绑定成功';
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '绑定失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 前端接收消息 保存数据
     */

    public function setMessages() {
        if (!empty($_POST['content'])) {
            if (!empty($this->c_id)) {
                $item['content'] = trim($_POST['content']);
                $item['c_id'] = $this->c_id;
                $item['u_id'] = $this->uid;
                $item['to_u_id'] = $_POST['to_u_id'];
                $item['type'] = 1;
                $item['source'] = $_POST['source'];
                $item['add_time'] = $this->now_time;
                $req = $this->model_public->setMessage($item);
                if ($req) {
                    $messageAll['type'] = 'message';
                    $messageAll['name'] = $this->name;
                    $messageAll['content'] = trim($_POST['content']);
                    $msgString = json_encode($messageAll);
                    $this->model_gateway->sendToGroup($this->c_id, $msgString);

                    if (!empty($_POST['to_u_id'])) {
                        //单独发的
                        $message['type'] = 'oneMessage';
                        $message['content'] = $this->name . ":" . trim($_POST['content']);
                        $msgString = json_encode($message);
                        $this->model_gateway->sendToUid('s' . $_POST['to_u_id'], $msgString);
                    } else {
                        //群发的
                        $message['type'] = 'oneMessage';
                        $message['content'] = $this->name . ":" . trim($_POST['content']);
                        $msgString = json_encode($message);
                        $this->model_gateway->sendToGroup($this->c_id, $msgString);
                    }

                    $resjson['state'] = 'ok';
                    $resjson['msg'] = '发送成功';
                } else {
                    $resjson['state'] = 'no';
                    $resjson['msg'] = '发送失败';
                }
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '暂无课程';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '发送失败';
        }
        echo json_encode($resjson);
    }

}

?>
