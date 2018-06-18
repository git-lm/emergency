<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of welcome
 *
 * @author Administrator
 */
class welcome extends CI_Controller {

    var $data = array();

    function __construct() {

        parent::__construct();
        $this->load->model('model_cmf');
        $this->load->model('uploads');
        $this->load->add_package_path(APPPATH . '../package_main', false);
        $this->now_time = date('Y-m-d H:i:s');
        $this->emer_users_info = $this->session->userdata('emer_users_info');
        if (!empty($this->emer_users_info)) {
            $this->data['emer_users_info'] = (Array) $this->emer_users_info;
        } else {
            header('Location:' . base_url());
            exit();
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

}

?>
