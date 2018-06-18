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
     * 获取教师所有课程
     * 
     */

    public function getCourse($param) {
        $course = $this->db->get_where('courses', $param)->result();
        return $course;
    }

    /*
     * 开始上课
     * c_id
     */

    public function beginCourse($c_id = 0) {
        $sql = 'update courses set state = 2 ,begin_time = "' . date('Y-m-d H:i:s') . '" where id = ' . $c_id;
        $this->db->query($sql);
        $rows = $this->db->affected_rows();
        if ($rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    /*
     * 结束上课
     * c_id
     */

    public function endCourse($c_id = 0) {
        $sql = 'update courses set state = 3 ,begin_time = "' . date('Y-m-d H:i:s') . '" where id = ' . $c_id;
        $this->db->query($sql);
        $rows = $this->db->affected_rows();
        if ($rows == 0) {
            return false;
        } else {
            return true;
        }
    }

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
     * 获取单个流程
     * p_id ID
     */

    public function getProcedures($p_id = 0) {
        $sql = 'select * from procedures where id = ' . $p_id;
        $procedures = $this->db->query($sql)->row();
        return $procedures;
    }

    /*
     * 添加教师上课流程索引记录
     * c_id 课程ID 
     * pc_id 流程事件索引ID
     */

    public function setProcess($c_id = 0, $pc_id = 0) {
        $sql = 'insert into record_process(c_id ,pc_id,add_time) values(' . $c_id . ',' . $pc_id . ',"' . date('Y-m-d H:i:s') . '")';
        $this->db->query($sql);
        $rows = $this->db->affected_rows();
        if ($rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    /*
     * 获取课程事件
     * c_id 课程ID
     */

    public function getEvents($c_id = 0) {
        $sql = 'select * from events where c_id = ' . $c_id;
        $events = $this->db->query($sql)->result();
        return $events;
    }

    /*
     * 小组 事件注入
     * c_id 课程ID
     * e_id 事件ID
     * g_id 小组
     * prd_id 流程ID
     */

    public function setEventGroup($c_id = 0, $prd_id = 0, $e_id = 0, $g_id = 0) {
        $sql = 'insert into record_events (c_id , prd_id , e_id , g_id , add_time) values(' . $c_id . ', ' . $prd_id . ' , ' . $e_id . ' , ' . $g_id . ' , "' . date('Y-m-d H:i:s') . '")';
        $this->db->query($sql);
        $rows = $this->db->affected_rows();
        if ($rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    /*
     * 获取小组事件
     * c_id 课程ID
     * e_id 事件ID
     * g_id 小组
     */

    public function getEventGroup($param) {
        $record_events = $this->db->get_where('record_events', $param)->result();
        return $record_events;
    }

    /*
     * 获取单个事件
     * id 事件ID
     */

    public function getEvent($id = 0) {
        $sql = 'select * from events where id = ' . $id;
        $event = $this->db->query($sql)->row();
        return $event;
    }

    /*
     * 获取小组事件列表
     * param 查询条件
     * c_id  课程ID
     * g_id  小组ID
     */

    public function getGroupEvents($param = null) {
        $where = '';
        if (!empty($param) && is_array($param)) {
            $where = 'where  1 = 1 ';
            if (!empty($param['c_id'])) {
                $where .= ' and re.c_id = ' . $param['c_id'];
            }
            if (!empty($param['g_id'])) {
                $where .= ' and re.g_id = ' . $param['g_id'];
            }
            if (!empty($param['prd_id'])) {
                $where .= ' and re.prd_id = ' . $param['prd_id'];
            }
        }

        $sql = 'select e.* from record_events re left join events e on e.id = re.e_id ' . $where;
        $events = $this->db->query($sql)->result();
        return $events;
    }

    /*
     * 获取小组已经注入事件的所有问题.
     * g_id 小组ID
     * prd_id  流程ID
     */

    public function getGroupEventsProblem($g_id = 0, $prd_id = 0) {
        $sql = 'select  p.* from problems p INNER JOIN record_events re on re.e_id = p.e_id where re.g_id = ' . $g_id . ' and prd_id =  ' . $prd_id;
        $eventProblem = $this->db->query($sql)->result();
        return $eventProblem;
    }

    /*
     * 获取小组问题
     * param  查询信息
     * g_id 小组ID
     * pb_id 问题ID
     */

    public function getGroupProblem($param) {
        $record_problems = $this->db->get_where('record_problems', $param)->result();
        return $record_problems;
    }

    /*
     * 添加小组问题 
     * c_id  课程ID
     * g_id  小组ID
     * pd_id 问题ID
     * prd_id 流程ID
     */

    public function setGroupProblem($c_id = 0, $prd_id = 0, $g_id = 0, $pb_id = 0) {
        $sql = 'insert into record_problems (c_id , prd_id ,g_id ,pb_id ,add_time ) values (' . $c_id . ', ' . $prd_id . ',' . $g_id . ',' . $pb_id . ',"' . date('Y-m-d H:i:s') . '")';
        $this->db->query($sql);
        $rows = $this->db->affected_rows();
        if ($rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    /*
     * 获取课程素材
     * param 查询条件
     * c_id 课程ID
     */

    public function getCourseMaterial($param = null) {
        $record_problems = $this->db->get_where('materials', $param)->result();
        return $record_problems;
    }

    /*
     * 获取小组素材
     *  param  查询信息
     * c_id 课程ID 
     * g_id 小组ID
     * m_id 素材ID
     */

    public function getGroupMaterials($param) {
        $record_materials = $this->db->get_where('record_materials', $param)->result();
        return $record_materials;
    }

    /*
     * 添加小组素材
     * c_id 课程ID 
     * g_id 小组ID
     * m_id 素材ID
     * prd_id 流程ID
     */

    public function setGroupMaterial($c_id = 0, $prd_id, $g_id = 0, $m_id = 0) {
        $sql = 'insert into record_materials (c_id , prd_id , g_id ,m_id ,add_time ) values (' . $c_id . ', ' . $prd_id . ',' . $g_id . ',' . $m_id . ',"' . date('Y-m-d H:i:s') . '")';
        $this->db->query($sql);
        $rows = $this->db->affected_rows();
        if ($rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    /*
     * 获取评估内容
     * param
     * c_id 课程ID
     * p_id 流程ID
     */

    public function getProcesslAssess($param) {
        $assess = $this->db->get_where('assess', $param)->result();
        return $assess;
    }

    /*
     * 添加课程流程评估内容
     * c_id 课程ID
     * p_id 流程ID
     * content 评估内容
     */

    public function setProcesslAssess($c_id = 0, $p_id = 0, $content) {

        $sql = 'insert into assess (c_id , p_id , content ,add_time ) values (' . $c_id . ', ' . $p_id . ',"' . $content . '","' . date('Y-m-d H:i:s') . '")';
        $this->db->query($sql);
        $rows = $this->db->affected_rows();
        if ($rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    /*
     * 更新课程流程评估内容
     * c_id 课程ID
     * p_id 流程ID
     * content 评估内容
     */

    public function updateProcesslAssess($c_id = 0, $p_id = 0, $content) {
        $sql = 'update assess set content = "' . $content . '" where c_id = ' . $c_id . ' and p_id = ' . $p_id;
        $this->db->query($sql);
        $rows = $this->db->affected_rows();
        if ($rows == 0) {
            return false;
        } else {
            return true;
        }
    }

}

?>
