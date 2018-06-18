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
            $this->emergerncyGroup = $this->model_public->getGroup($emergerncyGroupId);
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
        $group = $this->model_public->getGroup($this->emergerncyGroup->id);
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
        //获取课程下所有小组
        $cItem['c_id'] = $group->c_id;
        $groups = $this->model_public->getGroups($cItem);
        $groupCourse->groups = $groups;
        //获取所有发言信息
        $cItem['type'] = 1;
        $chats = $this->model_public->getChats($cItem, 'id desc');
        foreach ($chats as $val) {
            if ($val->source == 2 && $val->u_id == $this->emergerncyGroup->id) {
                $val->className = 'R_chat';
            } else {
                $val->className = 'L_chat';
            }
            if ($val->source == 1) {
                $val->name = $this->model_public->getUser($val->u_id)->name;
            } else {
                $val->name = $this->model_public->getGroup($val->u_id)->name;
            }
        }
        $groupCourse->chats = $chats;
        echo json_encode($groupCourse);
    }

    /*
     * 获取素材
     * m_id 素材ID
     */

    public function getStudentMaterial() {
        if (!empty($_POST['m_id'])) {
            $material = $this->model_public->getMaterial($_POST['m_id']);
            $resjson['state'] = 'ok';
            $resjson['msg'] = $material;
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '获取失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 查看各小组
     */

    public function getCourseGroup() {
        $group = $this->getGroup();
        if (!empty($group)) {
            $cItem['c_id'] = $group->c_id;
            $groups = $this->model_public->getGroups($cItem);
            $resjson['state'] = 'ok';
            $resjson['msg'] = $groups;
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '获取小组失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 查看教学流程索引
     */

    public function getProcess() {
        //获取小组所在的课程
        $course = $this->model_public->getGroupCourse($this->emergerncyGroup->id);
        if (!empty($course)) {
            //获取正在上课的流程ID
            $record_procedures = $this->model_public->getProcessProcedures($course['id']);
            //获取正在上课的所有流程事件
            $process = $this->model_public->getProceduresProcess($record_procedures->prd_id);
            $resjson['state'] = 'ok';
            $resjson['msg'] = $process;
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '暂无课程';
        }
        echo json_encode($resjson);
    }

    /*
     * 评论点评
     * g_id  被评论人
     * content 评论内容
     */

    public function setReview() {
        if (isset($_POST['g_id']) && !empty($_POST['content'])) {
            $item['c_id'] = $this->getGroup()->c_id;
            $item['u_id'] = $this->emergerncyGroup->id;
            $item['to_u_id'] = $_POST['g_id'];
            $item['content'] = $_POST['content'];
            $item['source'] = 2;
            $item['add_time'] = $this->now_time;
            $req = $this->model_public->setReview($item);
            if ($req) {
                $resjson['state'] = 'ok';
                $resjson['msg'] = '评论成功';
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '评论失败2';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '评论失败1';
        }
        echo json_encode($resjson);
    }

    //
}

?>
