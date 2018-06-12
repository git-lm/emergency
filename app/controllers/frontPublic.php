<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
header("content-type:text/html; charset=utf-8");
/*
 * 前端 公共类
 */

class frontPublic extends CI_Controller {

    var $data = array();

    function __construct() {

        parent::__construct();
        $this->load->model('model_cmf');
        $this->load->model('model_public');
        $this->load->model('uploads');
        $this->load->add_package_path(APPPATH . '../package_front', false);
        $this->now_time = date('Y-m-d H:i:s');
    }

    /*
     * 前端教师登录页面
     */

    public function loginTeacher() {
        $data = lz_tag();
        $data = array_merge($data, $this->data);
        $this->parser->parse(__FUNCTION__, $data);
    }

    /*
     * 验证登录信息
     */

    public function loginCheckTeacher() {
        if (!empty($_POST['username']) && !empty($_POST['password'])) {
            $resjson = $this->model_public->loginCheckTeacher($_POST);
            if ($resjson['state'] == 'ok') {
                $this->session->set_userdata('emergerncyUserId', $resjson['msg']['id']);
                $resjson['state'] = 'ok';
                $resjson['msg'] = '登录成功';
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = $resjson['msg'];
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '请完整填写登录信息';
        }
        echo json_encode($resjson);
    }

    /*
     * 前端小组登录页面
     */

    public function loginGroup() {
        $data = lz_tag();
        $data = array_merge($data, $this->data);
        $this->parser->parse(__FUNCTION__, $data);
    }

    /*
     * 验证登录信息
     */

    public function loginCheckGroup() {

        if (!empty($_POST['username']) && !empty($_POST['password'])) {

            $resjson = $this->model_public->loginCheckGroup($_POST);
            if ($resjson['state'] == 'ok') {
                //获取小组信息
                $group = $resjson['msg'];
                $course = $this->model_public->getGroupCourse($group['id']);
                if (!empty($course)) {
                    if (!empty($course['state']) && $course['state'] == 2) {
                        $this->session->set_userdata('emergerncyGroupId', $group['id']);
                        $resjson['state'] = 'ok';
                        $resjson['msg'] = '登录成功';
                    } else {
                        $resjson['state'] = 'no';
                        $resjson['msg'] = '该小组课程未上课：上课时间为' . $course['begin_time'];
                    }
                } else {
                    $resjson['state'] = 'no';
                    $resjson['msg'] = '该小组无课程';
                }
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = $resjson['msg'];
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '请完整填写登录信息';
        }
        echo json_encode($resjson);
    }

}

?>
