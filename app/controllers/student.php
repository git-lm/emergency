<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
header("content-type:text/html; charset=utf-8");
/*
 * 前端 学生类
 */

class Student extends CI_Controller {

    var $data = array();

    function __construct() {

        parent::__construct();
        $this->load->model('model_cmf');
        $this->load->model('model_student');
        $this->load->model('model_public');
        $this->load->model('uploads');
        $this->load->add_package_path(APPPATH . '../package_front', false);
        $this->now_time = date('Y-m-d H:i:s');
        $emergerncyGroupId = $this->session->userdata('emergerncyGroupId');
        if (!empty($emergerncyGroupId)) {
            $sql = 'select * from groups where id = ' . $emergerncyGroupId;
            $this->emergerncyGroup = $this->db->query($sql)->row();
            if (empty($this->emergerncyGroup)) {
                header('Location:' . base_url() . 'frontPublic/loginGroup');
                return;
            }
        } else {
            header('Location:' . base_url() . 'frontPublic/loginGroup');
            return;
        }
    }

    /*
     * 首页
     */

    public function index() {
        $data = lz_tag();
        $data = array_merge($data, $this->data);
        $this->parser->parse('student', $data);
    }

    /*
     * 获取登录的小组信息
     */

    public function getGroup() {
        $group = $this->model_student->getGroup($this->emergerncyGroup->id);
        return $group;
    }

    /*
     * 获取小组课程信息
     */

    public function getGroupCourse() {
        $groupCourse = new stdClass();
        //获取小组信息
        $group = $this->getGroup();
        $groupCourse->group = $group;
        //获取小组所在的课程
        $course = $this->model_public->getGroupCourse($this->emergerncyGroup->id);
        //获取课程下的流程信息
        $procedures = $this->model_public->getCourseFlow($course['id']);
        $groupCourse->procedures = $procedures;
        //获取正在上课的流程ID
        $record_procedures = $this->model_public->getProcessProcedures($course['id']);
        $groupCourse->prd_id = $record_procedures->prd_id;
        //获取正在上课的事件
        $record_process = $this->model_public->getProcessRecord($course['id']);
        //获取正在上课的事件的索引
        $groupCourse->process = $this->model_public->getProcess($record_process->pc_id);
        //获取小组的所有问题
        $problems = $this->model_student->getGroupProblems($this->emergerncyGroup->id, $record_procedures->prd_id, $course['id']);
        $groupCourse->problems = $problems;
        //获取小组的所有案例
        $relevants = $this->model_student->getGroupRelevants($this->emergerncyGroup->id, $record_procedures->prd_id, $course['id']);
        $groupCourse->relevants = $relevants;
        //获取小组的所有相关事件
        $events = $this->model_student->getGroupEvents($this->emergerncyGroup->id, $record_procedures->prd_id, $course['id']);
        $groupCourse->events = $events;
        //获取小组的所有相关素材
        $materials = $this->model_student->getGroupMaterials($this->emergerncyGroup->id, $record_procedures->prd_id, $course['id']);
        $groupCourse->materials = $materials;
        echo json_encode($groupCourse);
    }

}

?>
