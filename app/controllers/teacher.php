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

    /*
     * 获取正在上课的流程
     */

    public function getProceduresRecord() {
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

    /*
     * 获取正在上课的流程
     */

    public function getProcessRecord() {
        $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
        if (!empty($processCourse)) {
            //获取正在上课的流程
            $record_process = $this->model_teacher->getProcessRecord($processCourse->id);
            if (!empty($record_process)) {
                //获取流程索引事件
                $process = $this->model_teacher->getProcess($record_process->pc_id);
                $resjson['state'] = 'ok';
                $resjson['msg'] = $process;
            } else {
                $resjson['state'] = 'no';
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

    /*
     * 获取选中流程的资源的索引
     */

    public function getProceduresProcess() {
        if (!empty($_POST['prd_id'])) {
            $ProceduresProcess = $this->model_teacher->getProceduresProcess($_POST['prd_id']);
            $resjson['state'] = 'ok';
            $resjson['msg'] = $ProceduresProcess;
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '获取失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 获取索引具体内容
     */

    public function getProcess() {
        if (!empty($_POST['p_id'])) {
            $process = $this->model_teacher->getProcess($_POST['p_id']);
            $resjson['state'] = 'ok';
            $resjson['msg'] = $process;
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '获取失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 教师流程事件记录   就是索引记录
     * p_id 流程 事件表
     */

    public function setProcess() {
        if (!empty($_POST['p_id'])) {
            $process = $this->model_teacher->getProcess($_POST['p_id']);
            if (!empty($process)) {
                $procedures = $this->model_teacher->getProcedures($process->p_id);
                if (!empty($procedures)) {
                    $req = $this->model_teacher->setProcess($procedures->c_id, $process->id);
                    if ($req) {
                        $resjson['state'] = 'ok';
                        $resjson['msg'] = $process;
                    } else {
                        $resjson['state'] = 'no';
                        $resjson['msg'] = '上屏失败';
                    }
                } else {
                    $resjson['state'] = 'no';
                    $resjson['msg'] = '上屏失败';
                }
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '上屏失败';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '上屏失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 获取  课程  事件和   课程  小组
     * prd_id  流程ID
     */

    public function getEventGroup() {
        if (!empty($_POST['prd_id'])) {
            $procedures = $this->model_teacher->getProcedures($_POST['prd_id']);
            if (!empty($procedures)) {
                //获取课程小组
                $groups = $this->model_teacher->getCourseGroup($procedures->c_id);
                if (!empty($groups)) {
                    //获取课程事件
                    $events = $this->model_teacher->getEvents($procedures->c_id);
                    //获取课程所有事件小组分配情况
                    $item['c_id'] = $procedures->c_id;
                    $record_events = $this->model_teacher->getEventGroup($item);
                    $eventGroupHtml = '';
                    foreach ($record_events as $key => $val) {
                        $group = $this->model_teacher->getGroup($val->g_id);
                        $event = $this->model_teacher->getEvent($val->e_id);

                        $eventGroupHtml .= '<li>' .  $event->title  . ':' .$group->name . '</li>';
                    }


                    if (!empty($events)) {
                        $resjson['state'] = 'ok';
                        $resjson['event'] = $events;
                        $resjson['group'] = $groups;
                        $resjson['eventgroup'] = $eventGroupHtml;
                    } else {
                        $resjson['state'] = 'no';
                        $resjson['msg'] = '获取事件失败';
                    }
                } else {
                    $resjson['state'] = 'no';
                    $resjson['msg'] = '获取小组失败';
                }
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '获取数据失败';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '获取数据失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 事件注入
     * event  事件ID 数组
     * group  小组ID 数组
     */

    public function setEventGroup() {
        if (!empty($_POST['event']) && !empty($_POST['group'])) {
            $this->db->trans_begin();
            $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
            for ($i = 0; $i < count($_POST['event']); $i++) {
                for ($j = 0; $j < count($_POST['group']); $j++) {
                    //注入小组事件
                    $item['c_id'] = $processCourse->id;
                    $item['e_id'] = $_POST['event'][$i];
                    $item['g_id'] = $_POST['group'][$j];

                    $record_events = $this->model_teacher->getEventGroup($item);
                    if (empty($record_events)) {
                        $req = $this->model_teacher->setEventGroup($processCourse->id, $_POST['event'][$i], $_POST['group'][$j]);
                    }
                }
            }
            if (!empty($req)) {
                $this->db->trans_commit();
                $resjson['state'] = 'ok';
                $resjson['msg'] = '小组事件注入成功';
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '小组事件注入失败';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '注入失败';
        }
        echo json_encode($resjson);
    }

}

?>
