<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of login
 * 系统设置
 * @author Administrator
 */
class Sysconfig extends CI_Controller {

    var $data = array();

    function __construct() {

        parent::__construct();
        $this->load->model('model_cmf');
        $this->load->model('uploads');
        $this->load->add_package_path(APPPATH . '../package_sysconfig', false);
        $this->now_time = date('Y-m-d H:i:s');
    }

    public function logo() {
        $data = lz_tag();
        $data = array_merge($data, $this->data);
        $sql = 'select * from sysconfig';
        $sysconfig = $this->db->query($sql)->row();
        $data['logourl'] = !empty($sysconfig->logourl) ? $sysconfig->logourl : '';
        $this->parser->parse('logo', $data);
    }

    /*
     * 编辑LOGO
     */

    public function logoedit() {
        if (!empty($_FILES)) {
            $url = '';
            if (!empty($_FILES["url"]) && $_FILES["url"]['size'] != 0) {
                $url = $this->uploads->savefile($_FILES["url"]);
            }
            $item['logourl'] = $url;
            $this->db->update('sysconfig', $item);
            $arr['state'] = 'no';
            $arr['msg'] = '编辑LOGO成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '编辑失败';
        }
        echo json_encode($arr);
    }

    /*
     * 账号管理
     */

    public function users($start = 0) {
        $data = lz_tag();
        $data = array_merge($data, $this->data);
        $config['per_page'] = 10;
        $config['uri_segment'] = 3;
        $config['base_url'] = base_url() . 'sysconfig/users.html';
        if (!empty($_GET['start'])) {
            $start = $_GET['start'];
        } else {
            $start = 0;
        }
        $where = '';
        if (!empty($_GET) && !empty($_GET['title'])) {
            $where = ' and title like "%' . $_GET['title'] . '%"';
        }
        $sql = 'select u.* ';
        $from_where = '  from users u   where u.state = 0';
        $limit = " order by  id desc  limit {$start},{$config['per_page']} ";
        $users = $this->db->query($sql . $from_where . $limit)->result();
        $data['分页'] = $this->model_cmf->pages($from_where, $config);
        foreach ($users as $key => $user) {
            $user->rownum = $key + 1;
            if ($user->type == 1) {
                $user->typeName = '管理员';
            } else if ($user->type == 2) {
                $user->typeName = '讲师';
            } else if ($user->type == 3) {
                $user->typeName = '领导';
            } else {
                $user->typeName = '异常';
            }
        }
        $data['lists'] = $users;
        $this->parser->parse(__FUNCTION__, $data);
    }

    /*
     * 新增账号
     */

    public function userAdd() {
        if (!empty($_POST['nickname']) && !empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['type']) && !empty($_FILES)) {
            if (!empty($_FILES["photo"]) && $_FILES["photo"]['size'] != 0) {
                $item['photo'] = $this->uploads->savefile($_FILES["photo"]);
            }
            $item['name'] = $_POST['nickname'];
            $item['username'] = $_POST['username'];
            $item['password'] = md5($_POST['password']);
            $item['type'] = $_POST['type'];
            $this->db->insert('users', $item);
            $arr['state'] = 'ok';
            $arr['msg'] = '新增成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '请完整填写';
        }
        echo json_encode($arr);
    }

    /*
     * 获取账号信息
     */

    public function getUser() {
        if (!empty($_POST['uid'])) {
            $sql = 'select * from users where id = ' . $_POST['uid'];
            $user = $this->db->query($sql)->row();
            $arr['state'] = 'ok';
            $arr['msg'] = $user;
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '获取信息失败';
        }
        echo json_encode($arr);
    }

    /*
     * 编辑账号
     */

    public function userEdit() {
        if (!empty($_POST['nickname']) && !empty($_POST['uid'])) {
            if (!empty($_FILES["photo"]) && $_FILES["photo"]['size'] != 0) {
                $item['photo'] = $this->uploads->savefile($_FILES["photo"]);
            }
            $item['name'] = $_POST['nickname'];
            $where['id'] = $_POST['uid'];
            $this->db->update('users', $item, $where);
            $arr['state'] = 'ok';
            $arr['msg'] = '编辑成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '请完整填写';
        }
        echo json_encode($arr);
    }

    /*
     * 删除账号
     */

    public function userDel() {
        if (!empty($_POST['uid'])) {
            $sql = 'update users set state = 1  where id = ' . $_POST['uid'];
            $this->db->query($sql);
            $arr['state'] = 'ok';
            $arr['msg'] = '删除成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

    /*
     * 重置账号密码
     */

    public function userReset() {
        if (!empty($_POST['uid'])) {
            $sql = 'update users set password = "' . md5('123456') . '"  where id = ' . $_POST['uid'];
            $this->db->query($sql);
            $arr['state'] = 'ok';
            $arr['msg'] = '重置成功，密码为123456';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

}

?>
