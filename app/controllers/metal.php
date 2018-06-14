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
        $this->load->model('uploads');
        $this->load->add_package_path(APPPATH . '../package_main', false);
        $this->now_time = date('Y-m-d H:i:s');
    }

    /*
     * 首页
     */

    public function index() {
        phpinfo();
    }

}

?>
