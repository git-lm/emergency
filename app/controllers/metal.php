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
        $this->load->model('uploads');
        $this->load->add_package_path(APPPATH . '../package_main', false);
        $this->now_time = date('Y-m-d H:i:s');
        $emergerncyGroupId = $this->session->userdata('emergerncyGroupId');
        $emergerncyUserId = $this->session->userdata('emergerncyUserId');
        $this->uid = 0;
        $this->gid = 0;
        if (!empty($emergerncyGroupId)) {
            $this->gid = $emergerncyGroupId;
        }
        if (!empty($emergerncyUserId)) {
            $this->uid = $emergerncyUserId;
        }
    }

    /*
     * 首页
     */

    public function index() {
        $data = lz_tag();
        $data = array_merge($data, $this->data);
        $this->parser->parse(__FUNCTION__, $data);
    }

    /*
     * 前端接收消息 保存数据
     */

    public function setMessages() {
        if (!empty($_POST['content'])) {
            $processCourse = $this->model_teacher->getProcessCourse($this->uid);
            if (!empty($processCourse)) {
                $item['content'] = trim($_POST['content']);
                $item['c_id'] = $processCourse->id;
                $item['u_id'] = $this->uid;
                $item['g_id'] = $this->gid;
                $item['type'] = 1;
                $item['add_time'] = $this->now_time;
                $req = $this->model_public->setMessage($item);
                if ($req) {
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
