<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
header("content-type:text/html; charset=utf-8");
/*
 * 前端 教师类
 */

class Teacher extends CI_Controller {

    var $data = array();

    function __construct() {

        parent::__construct();
        $this->load->model('model_teacher');
        $this->load->model('uploads');
        $this->load->add_package_path(APPPATH . '../package_front', false);
        $this->now_time = date('Y-m-d H:i:s');
        $emergerncyUserId = $this->session->userdata('emergerncyUserId');
        if (!empty($emergerncyUserId)) {
            $sql = 'select * from users where id = ' . $emergerncyUserId;
            $this->emergerncyUser = $this->db->query($sql)->row();
            if (empty($this->emergerncyUser)) {
                header('Location:' . base_url() . 'frontPublic/loginTeacher');
                return;
            }
        } else {
            header('Location:' . base_url() . 'frontPublic/loginTeacher');
            return;
        }
    }

    /*
     * 首页
     */

    public function index() {
        $data = lz_tag();
        $data = array_merge($data, $this->data);
        $this->parser->parse('teacher', $data);
    }

    /*
     * 获取教师头像
     */

    public function getTeacherPhoto() {
        echo $this->emergerncyUser->photo;
    }

    //获取教师正在上课的课程
    public function getProcessCourse() {
        $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
        if (!empty($processCourse)) {

            $time = time();
            $beginTime = strtotime($processCourse->begin_time);
            $processCourse->time = $time - $beginTime;
        }
        echo json_encode($processCourse);
    }

    //获取正在上课的教学流程
    public function getProcessCourseFlow() {
        $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
        if (!empty($processCourse)) {
            $procedures = $this->model_teacher->getCourseFlow($processCourse->id);
        } else {
            $procedures = '';
        }
        echo json_encode($procedures);
    }

    //获取正在上课的小组
    public function getProcessCourseGroup() {
        $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
        if (!empty($processCourse)) {
            $groups = $this->model_teacher->getCourseGroup($processCourse->id);
        } else {
            $groups = '';
        }
        echo json_encode($groups);
    }

    //获取正在上课的流程
    public function getProcessProcedures() {
        $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
        if (!empty($processCourse)) {
            //获取正在上课的流程
            $record_procedures = $this->model_teacher->getProcessProcedures($processCourse->id);
            if (!empty($record_procedures)) {
                //获取流程索引
                $process = $this->model_teacher->getProceduresProcess($record_procedures->prd_id);
                $resjson['state'] = 'ok';
                $resjson['prd_id'] = $record_procedures->prd_id;
                $resjson['process'] = $process;
            }
        } else {
            $resjson['state'] = 'no';
        }
        echo json_encode($resjson);
    }

    /*     * **************************************************分隔符     上部分刷新获取   下部分事件获取****************************************************************************************** */

    /*
     * 选择课程
     */

    public function getTeacherCourse() {
        $courses = $this->model_teacher->getCourse($this->emergerncyUser->id);
        echo json_encode($courses);
    }

    /*
     * 开始流程
     *  procedureId  要上课的流程ID
     */

    public function setProcedure() {

        if (!empty($_POST['procedureId'])) {
            //判断是否已开始过该流程
            $count = $this->model_teacher->getProceduresIsBegin($_POST['procedureId']);
            if ($count == 0) {

                //正在上课的课程
                $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
                //获取正在上课的流程
                $record_procedures = $this->model_teacher->getProcessProcedures($processCourse->id);

                //如果不为空说明有正在上课的流程,结束正在上课的流程
                if (!empty($record_procedures)) {
                    $this->model_teacher->setProceduresEnd($record_procedures->id);
                }
                //开始选择要上课的流程
                $res = $this->model_teacher->setProceduresBegin($processCourse->id, $_POST['procedureId']);
                if ($res) {
                    //获取流程索引
                    $process = $this->model_teacher->getProceduresProcess($_POST['procedureId']);
                    $resjson['state'] = 'ok';
                    $resjson['msg'] = $process;
                } else {
                    $resjson['state'] = 'no';
                    $resjson['msg'] = '开始失败';
                }
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '该流程已开始';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '开始失败';
        }
        echo json_encode($resjson);
    }

}

?>
