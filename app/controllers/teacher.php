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
        $this->load->model('model_public');
        $this->load->model('model_gateway');
        $this->load->model('uploads');
        $this->load->add_package_path(APPPATH . '../package_front', false);
        $this->now_time = date('Y-m-d H:i:s');
        $emergerncyUserId = $this->session->userdata('emergerncyUserId');
        if (!empty($emergerncyUserId)) {
            $this->emergerncyUser = $this->model_public->getUser($emergerncyUserId);
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
            //获取正在上课的所有教学流程
            $processCourse->procedures = $this->model_public->getCourseFlow($processCourse->id);
            //获取正在上课的所有小组
            $cItem['c_id'] = $processCourse->id;
            $processCourse->groups = $this->model_public->getGroups($cItem);
            //获取正在上课的流程
            $record_procedures = $this->model_public->getProcessProcedures($processCourse->id);
            //获取正在上课的流程ID
            $processCourse->prd_id = $record_procedures->prd_id;
            //获取正在上课的流程的所有事件
            $processCourse->processAll = $this->model_public->getProceduresProcess($record_procedures->prd_id);
            //获取正在上课的事件
            $record_process = $this->model_public->getProcessRecord($processCourse->id);
            //获取正在上课的事件的索引
            $processCourse->process = $this->model_public->getProcess($record_process->pc_id);
            //获取所有发言信息

            $cItem['type'] = 1;
            $chats = $this->model_public->getChats($cItem, 'id desc');
            foreach ($chats as $val) {
                if ($val->source == 1 && $val->u_id == $this->emergerncyUser->id) {
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
            $processCourse->chats = $chats;
            //加入组
            $this->joinGroup();
        }
        echo json_encode($processCourse);
    }

    /*
     * 把教师加入到组中  方便发送信息
     * 先通过教师ID 获取他的client_id
     * 在通过client_id 加入到组中
     */

    public function joinGroup() {
        $ClientIdByUids = $this->model_gateway->getClientIdByUid('t' . $this->emergerncyUser->id); //返回一个数组
        $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
        if (!empty($ClientIdByUids)) {
            $client_id = $ClientIdByUids[0];
            $this->model_gateway->joinGroup($client_id, $processCourse->id);
        }
    }

    /*     * **************************************************分隔符     上部分刷新获取   下部分事件获取****************************************************************************************** */

    //获取教师所有课程
    public function getCourse() {
        $item['u_id'] = $this->emergerncyUser->id;
        $item['state'] = 1;
        $course = $this->model_teacher->getCourse($item);
        $resjson['state'] = 'ok';
        $resjson['msg'] = $course;
        echo json_encode($resjson);
    }

    /*
     * 选择课程
     */

    public function getTeacherCourse() {
        $courses = $this->model_teacher->getCourse($this->emergerncyUser->id);
        echo json_encode($courses);
    }

    /*
     * 开始上课
     */

    public function beginCourse() {
        if (!empty($_POST['c_id'])) {
            $item['u_id'] = $this->emergerncyUser->id;
            $item['state'] = 1;
            $item['id'] = $_POST['c_id'];
            $course = $this->model_teacher->getCourse($item);
            if (!empty($course)) {
                $req = $this->model_teacher->beginCourse($_POST['c_id']);
                if ($req) {
                    //保存登录信息
                    $item['u_id'] = $this->emergerncyUser->id;
                    $item['type'] = 2;
                    $item['c_id'] = $_POST['c_id'];
                    $item['add_time'] = $this->now_time;
                    $this->model_public->setMessage($item);
                    //保存登录信息结束
                    $resjson['state'] = 'ok';
                    $resjson['msg'] = '上课成功';
                } else {
                    $resjson['state'] = 'no';
                    $resjson['msg'] = '上课失败';
                }
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '该课程不是您的';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '获取失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 结束上课
     */

    public function endCourse() {
        $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
        if (!empty($processCourse)) {
            $req = $this->model_teacher->endCourse($processCourse->id);
            if ($req) {
                $message['type'] = 'end';
                $msgString = json_encode($message);
                $this->model_gateway->sendToGroup($processCourse->id, $msgString);
                $resjson['state'] = 'ok';
                $resjson['msg'] = '该课程已结束';
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '结束失败';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '该课程已结束';
        }
        echo json_encode($resjson);
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
                if (!empty($processCourse)) {
                    //获取正在上课的流程
                    $record_procedures = $this->model_public->getProcessProcedures($processCourse->id);

                    //如果不为空说明有正在上课的流程,结束正在上课的流程
                    if (!empty($record_procedures)) {
                        $this->model_teacher->setProceduresEnd($record_procedures->id);
                    }
                    //开始选择要上课的流程
                    $res = $this->model_teacher->setProceduresBegin($processCourse->id, $_POST['procedureId']);
                    if ($res) {
                        //获取流程索引
                        $process = $this->model_public->getProceduresProcess($_POST['procedureId']);
                        $resjson['state'] = 'ok';
                        $resjson['msg'] = $process;
                    } else {
                        $resjson['state'] = 'no';
                        $resjson['msg'] = '开始失败';
                    }
                } else {
                    $resjson['state'] = 'no';
                    $resjson['msg'] = '该课程已结束';
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
            $ProceduresProcess = $this->model_public->getProceduresProcess($_POST['prd_id']);
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
            $process = $this->model_public->getProcess($_POST['p_id']);
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
            $process = $this->model_public->getProcess($_POST['p_id']);
            if (!empty($process)) {
                $procedures = $this->model_teacher->getProcedures($process->p_id);
                if (!empty($procedures)) {
                    $req = $this->model_teacher->setProcess($procedures->c_id, $process->id);
                    if ($req) {
                        $message['type'] = 'resource';
                        $message['url'] = $process->material;
                        $msgString = json_encode($message);
                        $this->model_gateway->sendToGroup($procedures->c_id, $msgString);
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
     * 获取课程小组
     */

    public function getCourseGroup() {
        $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
        if (!empty($processCourse)) {
            $cItem['c_id'] = $processCourse->id;
            $groups = $this->model_public->getGroups($cItem);
            $resjson['state'] = 'ok';
            $resjson['msg'] = $groups;
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '该课程已结束';
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
                $cItem['c_id'] = $procedures->c_id;
                $groups = $this->model_public->getGroups($cItem);
                if (!empty($groups)) {
                    $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
                    if (!empty($processCourse)) {
                        //获取课程事件
                        $events = $this->model_teacher->getEvents($procedures->c_id);
                        $processProcedures = $this->model_public->getProcessProcedures($processCourse->id);
                        //获取课程所有事件小组分配情况
                        $item['c_id'] = $procedures->c_id;
                        $item['prd_id'] = $processProcedures->prd_id;
                        $record_events = $this->model_teacher->getEventGroup($item);
                        $eventGroupHtml = '';
                        foreach ($record_events as $key => $val) {
                            $group = $this->model_public->getGroup($val->g_id);
                            $event = $this->model_teacher->getEvent($val->e_id);

                            $eventGroupHtml .= '<li>' . $event->title . ':' . $group->name . '</li>';
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
                        $resjson['msg'] = '该课程已结束';
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
            if (!empty($processCourse)) {
                $processProcedures = $this->model_public->getProcessProcedures($processCourse->id);
                for ($i = 0; $i < count($_POST['event']); $i++) {
                    for ($j = 0; $j < count($_POST['group']); $j++) {
                        //注入小组事件
                        $item['c_id'] = $processCourse->id;
                        $item['e_id'] = $_POST['event'][$i];
                        $item['g_id'] = $_POST['group'][$j];
                        $item['prd_id'] = $processProcedures->prd_id;
                        $record_events = $this->model_teacher->getEventGroup($item);
                        if (empty($record_events)) {
                            $event = $this->model_teacher->getEvent($_POST['event'][$i]);
                            $message['type'] = 'event';
                            $message['title'] = $event->title;
                            $message['e_id'] = $event->id;
                            $msgString = json_encode($message);
                            $this->model_gateway->sendToUid('s' . $_POST['group'][$j], $msgString);
                            $req = $this->model_teacher->setEventGroup($processCourse->id, $processProcedures->prd_id, $_POST['event'][$i], $_POST['group'][$j]);
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
                $resjson['msg'] = '该课程已结束';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '注入失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 获取小组已经注入的小组事件的所有问题
     * g_id  小组ID
     */

    public function getGroupEventsProblem() {
        if (!empty($_POST['g_id'])) {
            $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
            if (!empty($processCourse)) {
                $processProcedures = $this->model_public->getProcessProcedures($processCourse->id);
                $eventProblem = $this->model_teacher->getGroupEventsProblem($_POST['g_id'], $processProcedures->prd_id);
                $resjson['state'] = 'ok';
                $resjson['msg'] = $eventProblem;
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '该课程已结束';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '获取失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 问题分发
     * problem 问题数组
     * g_id 小组
     */

    public function setGroupProblem() {
        if (!empty($_POST['problem']) && !empty($_POST['g_id'])) {
            $this->db->trans_begin();
            $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
            if (!empty($processCourse)) {
                $processProcedures = $this->model_public->getProcessProcedures($processCourse->id);
                for ($i = 0; $i < count($_POST['problem']); $i++) {
                    //注入小组事件问题
                    $item['pb_id'] = $_POST['problem'][$i];
                    $item['g_id'] = $_POST['g_id'];
                    $item['prd_id'] = $processProcedures->prd_id;

                    $record_problems = $this->model_teacher->getGroupProblem($item);
                    if (empty($record_problems)) {
                        $problem = $this->model_public->getProblem($_POST['problem'][$i]);
                        $message['type'] = 'problem';
                        $message['title'] = $problem->title;
                        $message['p_id'] = $problem->id;
                        $msgString = json_encode($message);
                        $this->model_gateway->sendToUid('s' . $_POST['g_id'], $msgString);
                        $req = $this->model_teacher->setGroupProblem($processCourse->id, $processProcedures->prd_id, $_POST['g_id'], $_POST['problem'][$i]);
                    }
                }
                if (!empty($req)) {
                    $this->db->trans_commit();
                    $resjson['state'] = 'ok';
                    $resjson['msg'] = '小组分发问题成功';
                } else {
                    $resjson['state'] = 'no';
                    $resjson['msg'] = '小组分发问题失败';
                }
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '该课程已结束';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '分发失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 获取素材
     * type 素材类型
     */

    public function getCourseMaterial() {
        if (!empty($_POST['type'])) {
            $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
            if (!empty($processCourse)) {
                $item['c_id'] = $processCourse->id;
                $item['type'] = $_POST['type'];
                $materials = $this->model_teacher->getCourseMaterial($item);
                $resjson['state'] = 'ok';
                $resjson['msg'] = $materials;
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '该课程已结束';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '获取素材失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 素材分发
     * g_id 小组ID
     * type 素材类型
     * m_id 素材ID 
     */

    public function setGroupMaterial() {
        if (!empty($_POST['g_id']) && !empty($_POST['type']) && !empty($_POST['m_id'])) {
            $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
            if (!empty($processCourse)) {
                $processProcedures = $this->model_public->getProcessProcedures($processCourse->id);
                $item['c_id'] = $processCourse->id;
                $item['m_id'] = $_POST['m_id'];
                $item['g_id'] = $_POST['g_id'];
                $item['prd_id'] = $processProcedures->prd_id;
                $record_materials = $this->model_teacher->getGroupMaterials($item);
                if (empty($record_materials)) {
                    $this->model_teacher->setGroupMaterial($processCourse->id, $processProcedures->prd_id, $item['g_id'], $item['m_id']);
                    $material = $this->model_public->getMaterial($item['m_id']);
                    $message['type'] = 'material';
                    $message['title'] = $material->title;
                    $message['m_id'] = $material->id;
                    $msgString = json_encode($message);
                    $this->model_gateway->sendToUid('t' . $item['g_id'], $msgString);
                    $resjson['state'] = 'ok';
                    $resjson['msg'] = '素材分发成功';
                } else {
                    $resjson['state'] = 'no';
                    $resjson['msg'] = '该小组已有该素材';
                }
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '该课程已结束';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '素材分发失败';
        }
        echo json_encode($resjson);
    }

    /*
     * 添加教学评估内容
     * Assess 评估内容
     */

    public function setProcesslAssess() {
        if (!empty($_POST['assess'])) {
            $processCourse = $this->model_teacher->getProcessCourse($this->emergerncyUser->id);
            if (!empty($processCourse)) {
                $processProcedures = $this->model_public->getProcessProcedures($processCourse->id);
                $item['c_id'] = $processCourse->id;
                $item['p_id'] = $processProcedures->prd_id;
                $assess = $this->model_teacher->getProcesslAssess($item);
                $content = str_replace('"', '\'', $_POST['assess']);
                if (!empty($assess)) {
                    $req = $this->model_teacher->updateProcesslAssess($processCourse->id, $processProcedures->prd_id, $content);
                } else {
                    $req = $this->model_teacher->setProcesslAssess($processCourse->id, $processProcedures->prd_id, $content);
                }

                if (!empty($req)) {
                    $resjson['state'] = 'ok';
                    $resjson['msg'] = '评估成功';
                } else {
                    $resjson['state'] = 'no';
                    $resjson['msg'] = '评估失败';
                }
            } else {
                $resjson['state'] = 'no';
                $resjson['msg'] = '该课程已结束';
            }
        } else {
            $resjson['state'] = 'no';
            $resjson['msg'] = '请填写评估内容';
        }
        echo json_encode($resjson);
    }

}

?>
