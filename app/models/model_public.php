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

    /*
     * 验证小组登录信息
     */

    public function loginCheckGroup($params) {
        if (!empty($params['username']) && !empty($params['password'])) {
            $sql = 'select * from groups where  username ="' . $params['username'] . '" and password = "' . $params['password'] . '"';
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

    /*
     * 获取所在的课程
     * g_id 小组ID
     */

    public function getGroupCourse($g_id = 0) {
        $sql = 'select c.* from groups g left join courses c  on g.c_id = c.id where g.id = ' . $g_id;
        $course = $this->db->query($sql)->row_array();
        return $course;
    }

    /*
     * 获取课程下的教学流程
     * cid  课程ID
     */

    public function getCourseFlow($cid = 0) {
        $sql = 'select * from procedures where state = 0 and c_id =' . $cid;
        $procedures = $this->db->query($sql)->result();
        return $procedures;
    }

    /*
     * 获取正在上课的流程
     * c_id  课程ID
     * 
     */

    public function getProcessProcedures($c_id = 0) {
        $sql = 'select * from record_procedures where c_id = ' . $c_id . ' and end_time is null';
        $record_procedures = $this->db->query($sql)->row();
        return $record_procedures;
    }

    /*
     * 获取流程下的事件索引
     * prd_id 流程ID
     */

    public function getProceduresProcess($prd_id = 0) {
        $sql = 'select * from process where p_id = ' . $prd_id . ' order by id asc';
        $process = $this->db->query($sql)->result();
        return $process;
    }

    /*
     * 获取单个索引具体内容
     * p_id 流程事件ID 
     */

    public function getProcess($p_id = 0) {
        $sql = 'select * from process where id = ' . $p_id;
        $process = $this->db->query($sql)->row();
        return $process;
    }

    /*
     * 获取正在上课的流程事件
     * c_id  正在上课课程
     */

    public function getProcessRecord($c_id = 0) {
        $sql = 'select * from record_process where c_id = ' . $c_id . ' order by id desc';
        $record_process = $this->db->query($sql)->row();
        return $record_process;
    }
    
    

}

?>
