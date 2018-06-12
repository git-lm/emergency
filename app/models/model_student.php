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
class model_student extends CI_Model {
    /*
     * 获取小组信息
     * g_id 小组ID
     */

    public function getGroup($g_id = 0) {
        $sql = 'select * from groups where id = ' . $g_id;
        $group = $this->db->query($sql)->row_array();
        return $group;
    }

    /*
     * 获取小组的所有问题
     * g_id 小组ID
     * prd_id 流程ID
     * c_id 课程ID
     */

    public function getGroupProblems($g_id = 0, $prd_id = 0, $c_id = 0) {
        $sql = 'select p.* from record_problems rp left join problems p on rp.pb_id = p.id  where c_id = ' . $c_id . ' and g_id = ' . $g_id . ' and prd_id = ' . $prd_id . ' order by rp.id desc';
        $problems = $this->db->query($sql)->result_array();
        return $problems;
    }

    /*
     * 获取小组的所有案例
     * g_id 小组ID
     * prd_id 流程ID
     * c_id 课程ID
     */

    public function getGroupRelevants($g_id = 0, $prd_id = 0, $c_id = 0) {
        $sql = 'select r.* from record_relevants rr left join relevants r on rr.r_id = r.id  where rr.c_id = ' . $c_id . ' and g_id = ' . $g_id . ' and prd_id = ' . $prd_id . ' order by rr.id desc';
        $relevants = $this->db->query($sql)->result_array();
        return $relevants;
    }

    /*
     * 获取小组的所有事件
     * g_id 小组ID
     * prd_id 流程ID
     * c_id 课程ID
     */

    public function getGroupEvents($g_id = 0, $prd_id = 0, $c_id = 0) {
        $sql = 'select e.* from record_events re left join events e on re.e_id = e.id  where re.c_id = ' . $c_id . ' and g_id = ' . $g_id . ' and prd_id = ' . $prd_id . ' order by re.id desc';
        $events = $this->db->query($sql)->result_array();
        return $events;
    }

    /*
     * 获取小组的所有素材
     * g_id 小组ID
     * prd_id 流程ID
     * c_id 课程ID
     */

    public function getGroupMaterials($g_id = 0, $prd_id = 0, $c_id = 0) {
        $sql = 'select m.* from record_materials rm left join materials m on rm.m_id = m.id  where rm.c_id = ' . $c_id . ' and g_id = ' . $g_id . ' and prd_id = ' . $prd_id . ' order by rm.id desc';
        $materials = $this->db->query($sql)->result_array();
        return $materials;
    }

}

?>
