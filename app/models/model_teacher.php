<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of model_teacher
 *
 * @author Administrator
 */
class model_teacher extends CI_Model {
    /*
     * 获取教师正在上课的课程
     * uid 教师ID
     */

    public function getProcessCourse($uid) {

        $sql = 'select * from courses where u_id = ' . $uid . ' and state = 2';
        $processCourse = $this->db->query($sql)->row();
        return $processCourse;
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
     * 选择小组
     * cid 课程ID
     */

    public function getCourseGroup($cid = 0) {
        $sql = 'select * from groups where  c_id =' . $cid;
        $groups = $this->db->query($sql)->result();
        return $groups;
    }

    /*
     * 选择教师课程
     *  uid 教师ID
     *  
     */

    public function getTeacherCourse($uid = 0, $state = 1) {
        //先判断是否有正在上的课程
        $sql = 'select * from courses where u_id = ' . $uid . ' and state = ' . $state;
        $courses = $this->db->query($sql)->result();
        return $courses;
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
     * 结束正在上课流程
     * c_id  课程ID
     * prd_id 流程ID
     */

    public function setProceduresEnd($rp_id = 0) {
        $sql = 'update record_procedures set end_time = "' . date('Y-m-d H:i:s') . '" where id = ' . $rp_id;
        $this->db->query($sql);
        $rows = $this->db->affected_rows();
        if ($rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    /*
     * 开始正在上课的流程
     * c_id  课程ID
     * prd_id 流程ID
     */

    public function setProceduresBegin($c_id = 0, $prd_id = 0) {
        $sql = 'insert into record_procedures(c_id , prd_id , begin_time) values("' . $c_id . '" , "' . $prd_id . '" , "' . date('Y-m-d H:i:s') . '") ';
        $this->db->query($sql);
        $rows = $this->db->affected_rows();
        if ($rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    /*
     * 获取该流程是否已经开始过
     * prd_id 流程ID
     */

    public function getProceduresIsBegin($prd_id = 0) {
        $sql = 'select count(0) count from record_procedures where prd_id = ' . $prd_id;
        $count = $this->db->query($sql)->row()->count;
        return $count;
    }

    /*
     * 获取流程下的事件索引
     * prd_id 流程ID
     */

    public function getProceduresProcess($prd_id = 0) {
        $sql = 'select * from process where p_id = ' . $prd_id;
        $process = $this->db->query($sql)->result();
        return $process;
    }

}

?>
