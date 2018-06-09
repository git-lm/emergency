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
class Login extends CI_Controller {

    var $data = array();

    function __construct() {

        parent::__construct();
        $this->load->model('model_cmf');
        $this->load->model('uploads');
        $this->load->add_package_path(APPPATH . '../package_main', false);
        $this->now_time = date('Y-m-d H:i:s');
    }

    public function index() {
        $data = lz_tag();
        $data = array_merge($data, $this->data);

        $this->parser->parse('login', $data);
    }

    /*
     * 
     */

    public function userLogin() {

        if (!empty($_POST['username']) && !empty($_POST['password'])) {
            $sql = 'select * from users where username = "' . $_POST['username'] . '" and password  = "' . md5($_POST['password']) . '"';
            $users = $this->db->query($sql)->row();
            if (!empty($users)) {
                $this->session->set_userdata('emer_users_info', $users);
                $arr['state'] = 'ok';
            } else {
                $arr['state'] = 'no';
                $arr['msg'] = '用户名或密码错误';
            }
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '用户名或密码不能为空';
        }
        echo json_encode($arr);
    }

}

?>
