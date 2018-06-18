<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
header("content-type:text/html; charset=utf-8");
/*
 * 课程类
 */

class Course extends CI_Controller {

    var $data = array();

    function __construct() {

        parent::__construct();
        $this->load->model('model_cmf');
        $this->load->model('uploads');
        $this->load->add_package_path(APPPATH . '../package_course', false);
        $this->now_time = date('Y-m-d H:i:s');
        $this->emer_users_info = $this->session->userdata('emer_users_info');
        if (!empty($this->emer_users_info)) {
            $this->data['emer_users_info'] = (Array) $this->emer_users_info;
        } else {
            header('Location:' . base_url());
            exit();
        }
    }

    /*
     * 精品推荐
     */

    public function eliteList() {
        $data = lz_tag();
        $data = array_merge($data, $this->data);
        $config['per_page'] = 10;
        $config['uri_segment'] = 3;
        $config['base_url'] = base_url() . 'course/eliteList.html';
        $where = '';
        if (!empty($_GET['start'])) {
            $start = $_GET['start'];
        } else {
            $start = 0;
        }
        if (!empty($_GET['title'])) {
            $where = ' and title like "%' . $_GET['title'] . '%"';
        }
//        $sql = 'select * from courses where state = 2 and iselite = 1 ';
        $sql = 'select c.*,u.name uname ';
        $from_where = '  from courses c left join users u on u.id = c.u_id    where c.state = 3 and c.iselite = 1  ' . $where;
        $limit = " order by  id desc  limit {$start},{$config['per_page']} ";
        $courses = $this->db->query($sql . $from_where . $limit)->result();
        $data['分页'] = $this->model_cmf->pages($from_where, $config);
        foreach ($courses as $key => $course) {
            $course->rownum = $key + 1;
        }
        $data['lists'] = $courses;
        $data['search'] = $_GET;
        $this->parser->parse(__FUNCTION__, $data);
    }

    /*
     * 查看课程日志
     */

    public function courseLog() {
        if (!empty($_GET['c_id'])) {
            $data = lz_tag();
            $data = array_merge($data, $this->data);
            $config['per_page'] = 10;
            $config['uri_segment'] = 3;
            $config['base_url'] = base_url() . 'course/courseLog.html?c_id=' . $_GET['c_id'];
            if (!empty($_GET['start'])) {
                $start = $_GET['start'];
            } else {
                $start = 0;
            }
            $sql = "select * ";
            $from_where = " from (
                        select type , c_id , u_id , to_u_id , source , content , add_time   from record_chat rc 
                        UNION ALL
                        select 11 type , re.c_id , c.u_id , g_id to_u_id , 1 source , CONCAT_WS(',','分发',prd.title , e.title) content , re.add_time    from record_events  re left join events e on e.id = re.e_id left join procedures prd on prd.id = re.prd_id left join courses c on c.id = re.c_id
                        UNION ALL
                        select 12 type , rm.c_id , c.u_id , g_id to_u_id , 1 source , CONCAT_WS(',','分发',prd.title , m.name , m.title ) content , rm.add_time   from record_materials rm left join courses c on c.id = rm.c_id left join procedures prd on prd.id = rm.prd_id LEFT JOIN materials m on m.id = rm.m_id 
                        UNION ALL
                        select 13 type , rpb.c_id , c.u_id , rpb.g_id to_u_id , 1 source , CONCAT_WS(',','分发',prd.title , e.title , pb.title) content , rpb.add_time from record_problems rpb left join courses c on c.id = rpb.c_id left join procedures prd on prd.id = rpb.prd_id left join problems pb on pb.id = rpb.pb_id left join events e on e.id = pb.e_id 
                        UNION ALL
                        select 14 type , rpd.c_id , c.u_id , 0 to_u_id , 1 source , CONCAT_WS(',','开始',prd.title ) content , rpd.begin_time add_time from record_procedures rpd left join courses c on c.id = rpd.c_id LEFT JOIN procedures prd on prd.id = rpd.prd_id 
                        UNION ALL
                        select 15 type , rp.c_id , c.u_id , 0 to_u_id , 1 source , CONCAT_WS( ',','上屏' , pc.indexes , pc.injection ) content , rp.add_time from record_process rp left join courses c on c.id = rp.c_id left join process pc on pc.id = rp.pc_id
                        UNION ALL 
                        select 16 type , rev.c_id  ,c.u_id , g_id to_u_id , 1 source , CONCAT_WS(',','分发', r.title) content , rev.add_time from record_relevants rev LEFT JOIN courses c on c.id = rev.c_id left join procedures prd on prd.id = rev.prd_id left join relevants r on r.id = rev.r_id 
                        ) t where c_id =   " . $_GET['c_id'];
            $limit = " ORDER BY t.add_time desc   limit {$start},{$config['per_page']} ";
            $logs = $this->db->query($sql . $from_where . $limit)->result();
            $data['分页'] = $this->model_cmf->pages($from_where, $config);
            foreach ($logs as $key => $log) {
                $log->rownum = $key + 1;
                //获取去方
                if (empty($log->to_u_id)) {
                    $log->to_name = '全体';
                } else {
                    if ($log->source == 1) {
                        $sql = 'select * from groups where id = ' . $log->to_u_id;
                        $group = $this->db->query($sql)->row();
                        $log->to_name = $group->name;
                    } else {
                        $sql = 'select * from users where id = ' . $log->to_u_id;
                        $user = $this->db->query($sql)->row();
                        $log->to_name = $user->name;
                    }
                }
                //获取来方
                if ($log->source == 1) {
                    $sql = 'select * from users where id = ' . $log->u_id;
                    $user = $this->db->query($sql)->row();
                    $log->from_name = $user->name;
                } else {

                    $sql = 'select * from groups where id = ' . $log->u_id;
                    $group = $this->db->query($sql)->row();
                    $log->from_name = $group->name;
                }
                //获取类型
                if ($log->type == 1) {
                    $log->type_name = '信息';
                } else if ($log->type == 2) {
                    $log->type_name = '登录';
                } else if ($log->type == 2) {
                    $log->type_name = '退出';
                } else if ($log->type == 11) {
                    $log->type_name = '事件叠加记录';
                } else if ($log->type == 12) {
                    $log->type_name = '小组分发素材记录';
                } else if ($log->type == 13) {
                    $log->type_name = '小组事件分发问题';
                } else if ($log->type == 14) {
                    $log->type_name = '教学流程记录';
                } else if ($log->type == 15) {
                    $log->type_name = '流程事件记录';
                } else if ($log->type == 16) {
                    $log->type_name = '小组课程案例记录';
                }
            }
            $data['lists'] = $logs;
            $data['search'] = $_GET;
            $this->parser->parse(__FUNCTION__, $data);
        }
    }

    /*
     * 我的课程
     */

    public function myCourse() {

        $data = lz_tag();
        $data = array_merge($data, $this->data);
        $config['per_page'] = 10;
        $config['uri_segment'] = 3;
        $config['base_url'] = base_url() . 'course/eliteList.html';
        if (!empty($_GET['start'])) {
            $start = $_GET['start'];
        } else {
            $start = 0;
        }
        $where = '';
        if (!empty($_GET) && !empty($_GET['title'])) {
            $where .= ' and title like "%' . $_GET['title'] . '%"';
        }
        if ($this->emer_users_info->type == 2) {
            $where .= ' and  u_id = ' . $this->emer_users_info->id;
        }
        $sql = 'select c.* ';
        $from_where = '  from courses c   where c.state <> 4 ' . $where;
        $limit = " order by  id desc  limit {$start},{$config['per_page']} ";
        $courses = $this->db->query($sql . $from_where . $limit)->result();
        $data['分页'] = $this->model_cmf->pages($from_where, $config);
        foreach ($courses as $key => $course) {
            $course->rownum = $key + 1;
        }
        $data['lists'] = $courses;
        $data['search'] = $_GET;
        $this->parser->parse(__FUNCTION__, $data);
    }

    /*
     * 新增课程
     */

    public function courseAdd() {
        if (!empty($_POST['title'])) {
            try {
                $item['title'] = $_POST['title'];
                $item['u_id'] = $this->emer_users_info->id;
                $item['add_time'] = $this->now_time;
                $this->db->insert('courses', $item);
                $cid = $this->db->insert_id();

                $arr['state'] = 'ok';
                $arr['msg'] = $cid;
            } catch (Exception $exc) {
                $arr['state'] = 'no';
                $arr['msg'] = '保存失败';
            }
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '请填写课程名称';
        }
        echo json_encode($arr);
    }

    /*
     * 编辑课程
     */

    public function courseEdit() {
        if (!empty($_POST['title']) && !empty($_POST['cid'])) {
            try {
                $sql = 'select * from courses where id = ' . $_POST['cid'] . ' and u_id = ' . $this->emer_users_info->id;
                $course = $this->db->query($sql)->row();
                if (empty($course)) {
                    $arr['state'] = 'no';
                    $arr['msg'] = '这不是您的课程请勿编辑';
                } else if ($course->state == 2) {
                    $arr['state'] = 'no';
                    $arr['msg'] = '该课程已上课，不能编辑';
                } else if ($course->state == 1) {
                    $item['title'] = $_POST['title'];
                    $where = 'id = ' . $_POST['cid'];
                    $this->db->update('courses', $item, $where);
                    $arr['state'] = 'ok';
                    $arr['msg'] = '编辑成功';
                } else {
                    $arr['state'] = 'no';
                    $arr['msg'] = '编辑失败';
                }
            } catch (Exception $exc) {
                $arr['state'] = 'no';
                $arr['msg'] = '编辑失败';
            }
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '编辑失败';
        }
        echo json_encode($arr);
    }

    /*
     * 精品推荐
     * c_id
     * type
     */

    public function course_elite() {
        if (!empty($_POST['cid']) && isset($_POST['type'])) {
            if ($_POST['type'] == 1) {
                $item['iselite'] = 1;
            } else {
                $item['iselite'] = 0;
            }
            $where['id'] = $_POST['cid'];
            $this->db->update('courses', $item, $where);
            $arr['state'] = 'ok';
            $arr['msg'] = '操作成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '推荐失败';
        }
        echo json_encode($arr);
    }

    /*
     * 修改课程更多信息   
     *      教学流程 
     */

    public function courseInfo() {
        if (!empty($_GET['cid'])) {
            $where = '';
            if ($this->emer_users_info->type == 2) {
                $where .= ' and  u_id = ' . $this->emer_users_info->id;
            }
            $sql = 'select * from courses where id = ' . $_GET['cid'] . $where;
            $course = $this->db->query($sql)->row();
            if (!empty($course)) {
                $data = lz_tag();
                $data = array_merge($data, $this->data);
                $data['cid'] = $_GET['cid'];
                $data['course_title'] = $course->title;
                $data['course_id'] = $course->id;
                $data['course_state'] = $course->state;
                if (empty($_GET['type']) || $_GET['type'] == 'procedures') {
                    //说明是添加教学索引

                    $sql = 'select * from procedures where state = 0 and  c_id = ' . $course->id;
                    $procedures = $this->db->query($sql)->result();
                    foreach ($procedures as $key => $val) {
                        $val->rownum = $key + 1;
                    }
                    $data['lists'] = $procedures;
                    $this->parser->parse('courseInfo_procedures', $data);
                } else if ($_GET['type'] == 'groups') {
                    //说明是小组分配
                    $sql = 'select * from groups where  c_id = ' . $course->id;
                    $groups = $this->db->query($sql)->result();
                    foreach ($groups as $key => $val) {
                        $val->rownum = $key + 1;
                    }
                    $data['lists'] = $groups;
                    $this->parser->parse('courseInfo_groups', $data);
                } else if ($_GET['type'] == 'materials') {
                    //说明是资源素材
                    $sql = 'select m.*,p.name pname from materials m left join param p on p.id = m.type where  c_id = ' . $course->id;
                    $materials = $this->db->query($sql)->result();
                    foreach ($materials as $key => $val) {
                        $val->rownum = $key + 1;
                    }
                    $data['lists'] = $materials;
                    $this->parser->parse('courseInfo_materials', $data);
                } else if ($_GET['type'] == 'problems') {
                    //说明是事件叠加
                    $sql = 'select * from events  where  c_id = ' . $course->id;
                    $events = $this->db->query($sql)->result();
                    foreach ($events as $key => $val) {
                        $val->rownum = $key + 1;
                    }
                    $data['lists'] = $events;
                    $this->parser->parse('courseInfo_events', $data);
                } else if ($_GET['type'] == 'relevants') {
                    //说明是相关案例
                    $sql = 'select * from relevants  where  c_id = ' . $course->id;
                    $relevants = $this->db->query($sql)->result();
                    foreach ($relevants as $key => $val) {
                        $val->rownum = $key + 1;
                    }
                    $data['lists'] = $relevants;
                    $this->parser->parse('courseInfo_relevants', $data);
                }
            } else {
                header('Location:' . base_url() . 'course/myCourse.html');
            }
        } else {
            header('Location:' . base_url() . 'course/myCourse.html');
        }
    }

    /*
     * 新增教学流程
     */

    public function courseInfo_proceduresAdd() {
        if (!empty($_POST['title']) && !empty($_POST['cid'])) {
            $item['title'] = $_POST['title'];
            $item['c_id'] = $_POST['cid'];
            try {
                $this->db->insert('procedures', $item);
                $arr['state'] = 'ok';
                $arr['msg'] = '添加成功';
            } catch (Exception $exc) {
                $arr['state'] = 'no';
                $arr['msg'] = '添加失败';
            }
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '请正确填写信息';
        }
        echo json_encode($arr);
    }

    /*
     * 编辑教学流程
     */

    public function courseInfo_proceduresEdit() {
        if (!empty($_POST['title']) && !empty($_POST['cid']) && !empty($_POST['pid'])) {
            $where = '';
            if ($this->emer_users_info->type == 2) {
                $where .= 'and  c.u_id = ' . $this->emer_users_info->id;
            }
            $sql = 'select * from procedures p left join courses c on c.id = p.c_id where   p.id = ' . $_POST['pid'] . ' and c.id =   ' . $_POST['cid'] . $where;
            $procedure = $this->db->query($sql)->row();
            if (!empty($procedure)) {
                $item['title'] = $_POST['title'];
                $where = 'id = ' . $_POST['pid'];
                try {
                    $this->db->update('procedures', $item, $where);
                    $arr['state'] = 'ok';
                    $arr['msg'] = '修改成功';
                } catch (Exception $exc) {
                    $arr['state'] = 'ok';
                    $arr['msg'] = '修改失败';
                }
            } else {
                $arr['state'] = 'no';
                $arr['msg'] = '信息提交错误';
            }
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '请正确填写信息';
        }
        echo json_encode($arr);
    }

    /*
     * 删除课程流程
     */

    public function courseInfo_proceduresDel() {
        if (!empty($_POST['cid']) && !empty($_POST['pid'])) {
            $where = '';
            if ($this->emer_users_info->type == 2) {
                $where .= 'and  c.u_id = ' . $this->emer_users_info->id;
            }
            $sql = 'select * from procedures p left join courses c on c.id = p.c_id where   p.id = ' . $_POST['pid'] . ' and c.id =   ' . $_POST['cid'] . $where;
            $procedure = $this->db->query($sql)->row();
            if (!empty($procedure)) {
                try {
                    $sql = 'update procedures set state = 1 where id = ' . $_POST['pid'];
                    $this->db->query($sql);
                    $arr['state'] = 'ok';
                    $arr['msg'] = '删除成功';
                } catch (Exception $exc) {
                    $arr['state'] = 'no';
                    $arr['msg'] = '删除失败';
                }
            } else {
                $arr['state'] = 'no';
                $arr['msg'] = '信息提交错误';
            }
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '请正确填写信息';
        }
        echo json_encode($arr);
    }

    /*
     * 流程事件
     */

    public function processInfo() {
        if (!empty($_GET['pid'])) {
            $data = lz_tag();
            $data = array_merge($data, $this->data);
            $sql = 'select * from procedures where id = ' . $_GET['pid'];
            $procedures = $this->db->query($sql)->row();
            $sql = 'select * from courses where id = ' . $procedures->c_id;
            $course = $this->db->query($sql)->row();
            $data['course_state'] = $course->state;
            $data['pTitle'] = $procedures->title;
            $data['pId'] = $procedures->id;
            $sql = 'select * from process where p_id = ' . $_GET['pid'];
            $process = $this->db->query($sql)->result();
            foreach ($process as $key => $val) {
                $val->rownum = $key + 1;
            }
            $data['lists'] = $process;
            $this->parser->parse(__FUNCTION__, $data);
        }
    }

    /*
     * 新增流程事件
     */

    public function processAdd() {
        if (!empty($_POST['pid'])) {
            try {
                if (!empty($_FILES["material"]) && $_FILES["material"]['size'] != 0) {
                    $material = $this->uploads->savefile($_FILES["material"]);
                    $material_name = $_FILES["material"]['name'];
                }
                $item['indexes'] = !empty($_POST['indexes']) ? $_POST['indexes'] : '';
                $item['injection'] = !empty($_POST['injection']) ? $_POST['injection'] : '';
                $item['material'] = !empty($material) ? $material : '';
                $item['material_name'] = !empty($material_name) ? $material_name : '';
                $item['p_id'] = $_POST['pid'];
                $item['add_time'] = $this->now_time;
                $this->db->insert('process', $item);
                $arr['state'] = 'ok';
                $arr['msg'] = '添加成功';
            } catch (Exception $exc) {
                $arr['state'] = 'no';
                $arr['msg'] = '添加失败';
            }
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '添加失败';
        }
        echo json_encode($arr);
    }

    /*
     * 获取事件索引
     */

    public function getProcess() {
        if (!empty($_POST['pid'])) {
            $sql = 'select * from process where id = ' . $_POST['pid'];
            $process = $this->db->query($sql)->row();
            $arr['state'] = 'ok';
            $arr['msg'] = $process;
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

    /*
     * 编辑事件索引
     */

    public function processEdit() {
        if (!empty($_POST['pid'])) {
            if (!empty($_FILES["material"]) && $_FILES["material"]['size'] != 0) {
                $material = $this->uploads->savefile($_FILES["material"]);
                $material_name = $_FILES["material"]['name'];
                $item['material'] = !empty($material) ? $material : '';
                $item['material_name'] = !empty($material_name) ? $material_name : '';
            }
            $item['indexes'] = !empty($_POST['indexes']) ? $_POST['indexes'] : '';
            $item['injection'] = !empty($_POST['injection']) ? $_POST['injection'] : '';

            $item['add_time'] = $this->now_time;
            $where = 'id = ' . $_POST['pid'];
            $this->db->update('process', $item, $where);
            $arr['state'] = 'ok';
            $arr['msg'] = '编辑成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

    /*
     * 添加小组信息
     */

    public function groupsAdd() {
        if (!empty($_POST['name']) && !empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['cid'])) {
            $item['name'] = $_POST['name'];
            $item['username'] = $_POST['username'];
            $item['password'] = $_POST['password'];
            $item['c_id'] = $_POST['cid'];
            $this->db->insert('groups', $item);
            $arr['state'] = 'ok';
            $arr['msg'] = '添加成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

    /*
     * 编辑小组信息
     */

    public function groupsEdit() {
        if (!empty($_POST['name']) && !empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['gid'])) {
            $item['name'] = $_POST['name'];
            $item['username'] = $_POST['username'];
            $item['password'] = $_POST['password'];
            $where = 'id = ' . $_POST['gid'];
            $this->db->update('groups', $item, $where);
            $arr['state'] = 'ok';
            $arr['msg'] = '编辑成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

    /*
     * 删除小组
     */

    public function groupsDel() {
        if (!empty($_POST['gid'])) {
            $sql = 'delete from groups where id = ' . $_POST['gid'];
            $this->db->query($sql);
            $arr['state'] = 'ok';
            $arr['msg'] = '删除成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

    /*
     * 获取资源类型
     */

    public function getParam() {
        $sql = 'select * from param where type = 1 ';
        $param = $this->db->query($sql)->result();
        echo json_encode($param);
    }

    /*
     * 新增资源素材
     */

    public function materialAdd() {
        if (!empty($_POST['c_id'])) {
            try {
                if (!empty($_FILES["url"]) && $_FILES["url"]['size'] != 0) {
                    $url = $this->uploads->savefile($_FILES["url"]);
                    $title = $_FILES["url"]['name'];
                }
                $item['name'] = !empty($_POST['name']) ? $_POST['name'] : '';
                $item['type'] = !empty($_POST['type']) ? $_POST['type'] : '';
                $item['url'] = !empty($url) ? $url : '';
                $item['title'] = !empty($title) ? $title : '';
                $item['c_id'] = $_POST['c_id'];
                $this->db->insert('materials', $item);
                $arr['state'] = 'ok';
                $arr['msg'] = '添加成功';
            } catch (Exception $exc) {
                $arr['state'] = 'no';
                $arr['msg'] = '添加失败';
            }
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '添加失败';
        }
        echo json_encode($arr);
    }

    /*
     * 获取素材
     */

    public function getMaterial() {
        if (!empty($_POST['mid'])) {
            $sql = 'select * from materials where id = ' . $_POST['mid'];
            $material = $this->db->query($sql)->row();
            $arr['state'] = 'ok';
            $arr['msg'] = $material;
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

    /*
     * 编辑事件索引
     */

    public function materialEdit() {
        if (!empty($_POST['mid'])) {
            if (!empty($_FILES["url"]) && $_FILES["url"]['size'] != 0) {
                $url = $this->uploads->savefile($_FILES["url"]);
                $title = $_FILES["url"]['name'];
                $item['url'] = !empty($url) ? $url : '';
                $item['title'] = !empty($title) ? $title : '';
            }
            $item['name'] = !empty($_POST['name']) ? $_POST['name'] : '';
            $item['type'] = !empty($_POST['type']) ? $_POST['type'] : '';


            $where = 'id = ' . $_POST['mid'];
            $this->db->update('materials', $item, $where);
            $arr['state'] = 'ok';
            $arr['msg'] = '编辑成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

    /*
     * 删除小组
     */

    public function materialDel() {
        if (!empty($_POST['mid'])) {
            $sql = 'delete from materials where id = ' . $_POST['mid'];
            $this->db->query($sql);
            $arr['state'] = 'ok';
            $arr['msg'] = '删除成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

    /*
     * 新增事件叠加
     */

    public function courseInfo_eventsAdd() {
        if (!empty($_POST['title']) && !empty($_POST['cid'])) {
            $item['title'] = $_POST['title'];
            $item['c_id'] = $_POST['cid'];
            try {
                $this->db->insert('events', $item);
                $arr['state'] = 'ok';
                $arr['msg'] = '添加成功';
            } catch (Exception $exc) {
                $arr['state'] = 'no';
                $arr['msg'] = '添加失败';
            }
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '请正确填写信息';
        }
        echo json_encode($arr);
    }

    /*
     * 编辑教学流程
     */

    public function courseInfo_eventsEdit() {
        if (!empty($_POST['title']) && !empty($_POST['eid'])) {
            $item['title'] = $_POST['title'];
            $where = 'id = ' . $_POST['eid'];
            try {
                $this->db->update('events', $item, $where);
                $arr['state'] = 'ok';
                $arr['msg'] = '修改成功';
            } catch (Exception $exc) {
                $arr['state'] = 'ok';
                $arr['msg'] = '修改失败';
            }
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '信息提交错误';
        }

        echo json_encode($arr);
    }

    /*
     * 删除课程流程
     */

    public function courseInfo_eventsDel() {
        if (!empty($_POST['eid'])) {
            try {
                $sql = 'delete from events where id = ' . $_POST['eid'];
                $this->db->query($sql);
                $arr['state'] = 'ok';
                $arr['msg'] = '删除成功';
            } catch (Exception $exc) {
                $arr['state'] = 'no';
                $arr['msg'] = '删除失败';
            }
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '信息提交错误';
        }

        echo json_encode($arr);
    }

    /*
     * 事件叠加问题
     */

    public function problemsInfo() {
        if (!empty($_GET['eid'])) {
            $data = lz_tag();
            $data = array_merge($data, $this->data);

            $sql = 'select * from events where id = ' . $_GET['eid'];
            $event = $this->db->query($sql)->row();
            $sql = 'select * from courses where id = ' . $event->c_id;
            $course = $this->db->query($sql)->row();
            $data['course_state'] = $course->state;
            $data['eTitle'] = $event->title;
            $data['eId'] = $event->id;
            $sql = 'select * from problems where e_id = ' . $_GET['eid'];
            $problems = $this->db->query($sql)->result();
            foreach ($problems as $key => $val) {
                $val->rownum = $key + 1;
            }
            $data['lists'] = $problems;
            $this->parser->parse(__FUNCTION__, $data);
        }
    }

    /*
     * 新增事件叠加问题
     */

    public function problemsAdd() {
        if (!empty($_POST['eid']) && !empty($_POST['title']) && !empty($_FILES)) {
            if (!empty($_FILES["relevant_url"]) && $_FILES["relevant_url"]['size'] != 0) {
                $relevant_url = $this->uploads->savefile($_FILES["relevant_url"]);
                $relevant_title = $_FILES["relevant_url"]['name'];
                $item['relevant_url'] = !empty($relevant_url) ? $relevant_url : '';
                $item['relevant_title'] = !empty($relevant_title) ? $relevant_title : '';
            }

            $item['e_id'] = $_POST['eid'];
            $item['title'] = $_POST['title'];
            $this->db->insert('problems', $item);
            $arr['state'] = 'ok';
            $arr['msg'] = '新增成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '请完整填写信息';
        }
        echo json_encode($arr);
    }

    /*
     * 获取事件叠加问题
     */

    public function getProblems() {
        if (!empty($_POST['eid'])) {
            $sql = 'select * from problems where id = ' . $_POST['eid'];
            $problem = $this->db->query($sql)->row();
            $arr['state'] = 'ok';
            $arr['msg'] = $problem;
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '获取失败';
        }
        echo json_encode($arr);
    }

    /*
     * x修改事件叠加问题
     */

    public function problemsEdit() {
        if (!empty($_POST['eid']) && !empty($_POST['title'])) {
            if (!empty($_FILES["relevant_url"]) && $_FILES["relevant_url"]['size'] != 0) {
                $relevant_url = $this->uploads->savefile($_FILES["relevant_url"]);
                $relevant_title = $_FILES["relevant_url"]['name'];
                $item['relevant_url'] = !empty($relevant_url) ? $relevant_url : '';
                $item['relevant_title'] = !empty($relevant_title) ? $relevant_title : '';
            }
            $item['title'] = $_POST['title'];
            $where['id'] = $_POST['eid'];
            unset($_POST['eid']);
            $this->db->update('problems', $item, $where);
            $arr['state'] = 'ok';
            $arr['msg'] = '修改成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '请完整填写信息';
        }
        echo json_encode($arr);
    }

    /*
     * 删除事件叠加问题
     */

    public function problemsDel() {
        if (!empty($_POST['eid'])) {
            $sql = 'delete from problems where id = ' . $_POST['eid'];
            $this->db->query($sql);
            $arr['state'] = 'ok';
            $arr['msg'] = '删除成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

    /*
     * 新增相关案例
     */

    public function relevantsAdd() {
        if (!empty($_POST['title']) || !empty($_POST['cid']) || !empty($_FILES)) {
            if (!empty($_FILES["event_url"]) && $_FILES["event_url"]['size'] != 0) {
                $event_url = $this->uploads->savefile($_FILES["event_url"]);
                $event_name = $_FILES["event_url"]['name'];
                $item['event_url'] = !empty($event_url) ? $event_url : '';
                $item['event_name'] = !empty($event_name) ? $event_name : '';
            }
            $item['title'] = $_POST['title'];
            $item['c_id'] = $_POST['cid'];
            $item['summary'] = !empty($_POST['summary']) ? $_POST['summary'] : '';
            $this->db->insert('relevants', $item);
            $arr['state'] = 'ok';
            $arr['msg'] = '新增成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '请完整填写';
        }
        echo json_encode($arr);
    }

    /*
     * 获取相关案例
     */

    public function getRelevant() {
        if (!empty($_POST['rid'])) {
            $sql = 'select * from relevants where id = ' . $_POST['rid'];
            $relevant = $this->db->query($sql)->row();
            $arr['state'] = 'ok';
            $arr['msg'] = $relevant;
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

    /*
     * x修改相关案例
     */

    public function relevantEdit() {
        if (!empty($_POST['rId']) && !empty($_POST['title'])) {
            if (!empty($_FILES["event_url"]) && $_FILES["event_url"]['size'] != 0) {
                $event_url = $this->uploads->savefile($_FILES["event_url"]);
                $event_name = $_FILES["event_url"]['name'];
                $item['event_url'] = !empty($event_url) ? $event_url : '';
                $item['event_name'] = !empty($event_name) ? $event_name : '';
            }
            $item['title'] = $_POST['title'];
            $item['summary'] = !empty($_POST['summary']) ? $_POST['summary'] : '';
            $where['id'] = $_POST['rId'];
            unset($_POST['rId']);
            $this->db->update('relevants', $item, $where);
            $arr['state'] = 'ok';
            $arr['msg'] = '修改成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '请完整填写信息';
        }
        echo json_encode($arr);
    }

    /*
     * 删除相关案例
     */

    public function relevantDel() {
        if (!empty($_POST['rid'])) {
            $sql = 'delete from relevants where id = ' . $_POST['rid'];
            $this->db->query($sql);
            $arr['state'] = 'ok';
            $arr['msg'] = '删除成功';
        } else {
            $arr['state'] = 'no';
            $arr['msg'] = '系统错误';
        }
        echo json_encode($arr);
    }

    /*
     * 验证课程是否已经开课
     */

    public function chekcCourseBegin() {
        if (!empty($_POST['cid'])) {
            $sql = 'select * from courses where id = ' . $_POST['cid'];
            $course = $this->db->query($sql)->row();
            if (!empty($course)) {
                if (!empty($course->add_time)) {
                    echo 'begin';
                } else {
                    echo 'nobegin';
                }
            } else {
                echo 'wu';
            }
        } else {
            echo 'error';
        }
    }

}
