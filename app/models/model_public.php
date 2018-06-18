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
     * 获取users 信息
     * u_id 
     */

    public function getUser($u_id = 0) {
        $sql = 'select * from users where id = ' . $u_id;
        $user = $this->db->query($sql)->row();
        return $user;
    }

    /*
     * 获取小组信息
     * g_id 
     */

    public function getGroup($g_id = 0) {
        $sql = 'select * from groups where id = ' . $g_id;
        $group = $this->db->query($sql)->row();
        return $group;
    }

    /*
     * 获取所有小组信息
     * g_id 
     */

    public function getGroups($param) {
        $groups = $this->db->get_where('groups', $param)->result();
        return $groups;
    }

    /*
     * 验证教师登录信息
     */

    public function loginCheckTeacher($params) {
        if (!empty($params['username']) && !empty($params['password'])) {
            $sql = 'select * from users  where   username ="' . $params['username'] . '" and password = "' . md5($params['password']) . '"';
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

    /*
     * 获取单个素材
     * m_id 
     */

    public function getMaterial($m_id = 0) {
        $sql = 'select * from materials where id = ' . $m_id;
        $material = $this->db->query($sql)->row();
        return $material;
    }

    /*
     * 保存消息
     */

    public function setMessage($param) {
        $this->db->insert('record_chat', $param);
        $rows = $this->db->affected_rows();
        if ($rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    /*
     * 获取发送后前端接收的信息
     * g_id  小组ID 有小组ID 就是获取小组名称
     * u_id  教师ID 有教师ID 就是获取教师名称
     * cr_id 聊天记录ID 有聊天记录就是获取聊天记录信息
     */

    public function getMessage($g_id = 0, $u_id = 0, $cr_id = 0) {

        if (!empty($cr_id)) {
            if (!empty($g_id)) {
                $sql = 'select * from groups where id = ' . $g_id;
                $group = $this->db->query($sql)->row();
            }
        } else {
            return '';
        }
    }

    /*
     * 获取问题
     * param
     */

    public function getProblems($param) {
        $problems = $this->db->get_where('problems', $param)->result();
        return $problems;
    }

    /*
     * 获取单个问题
     * param
     */

    public function getProblem($p_id = 0) {
        $sql = 'select * from problems where id = ' . $p_id;
        $problem = $this->db->query($sql)->row();
        return $problem;
    }

    /*
     * 获取所有发言
     * c_id 小组ID
     */

    public function getChats($param, $order = '') {
        if (!empty($order)) {
            $this->db->order_by($order);
        }
        $record_chat = $this->db->get_where('record_chat', $param)->result();
        return $record_chat;
    }

    /*
     * 保存评论
     */

    public function setReview($param) {
        $this->db->insert('review', $param);
        $rows = $this->db->affected_rows();
        if ($rows == 0) {
            return false;
        } else {
            return true;
        }
    }

}

?>
