<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of model_student
 *
 * @author Administrator
 */
class model_public extends CI_Model {
    /*
     * 验证教师登录信息
     */

    public function loginCheckTeacher($params) {
        if (!empty($params['username']) && !empty($params['password'])) {
            $sql = 'select * from users where type = 2 and username ="' . $params['username'] . '" and password = "' . MD5($params['password']) . '"';
            $res = $this->db->query($sql)->row_array();
            if (!empty($res)) {
                $resjson['state'] = 'ok';
                $resjson['msg'] = $res;
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '无此用户';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '请完整填写登录信息';
        }
        return $resjson;
    }

}

?>
