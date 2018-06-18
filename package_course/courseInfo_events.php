
<html>
    <?php include 'package_main/com_header.php' ?>
    <body class="gray-bg">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>{course_title}-课程信息</h5>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-sm-10">
                                <button data-toggle="button" class="right btn btn-primary btn-danger col-sm-2 course-info"  onclick="window.location.href='{base}course/courseInfo.html?type=procedures&cid={cid}'"  type="button">教学流程</button>
                                <button data-toggle="button" class="right btn btn-primary btn-danger col-sm-1 course-info"  onclick="window.location.href='{base}course/courseInfo.html?type=groups&cid={cid}'"  type="button">小组分配</button>
                                <button data-toggle="button" class="right btn btn-primary btn-danger col-sm-2 course-info"  onclick="window.location.href='{base}course/courseInfo.html?type=materials&cid={cid}'"  type="button">资源素材库</button>
                                <button data-toggle="button" class="right btn btn-primary btn-success col-sm-2 course-info"  onclick="window.location.href='{base}course/courseInfo.html?type=problems&cid={cid}'" type="button">事件叠加</button>
                                <button data-toggle="button" class="right btn btn-primary btn-danger col-sm-1 course-info"  onclick="window.location.href='{base}course/courseInfo.html?type=relevants&cid={cid}'" type="button">相关案例</button>


                            </div>
                            <?php
                            if ($emer_users_info['type'] == 2 && $course_state == 1 ) {
                                ?>
                                <button data-toggle="button" class="right btn btn-primary btn-outline addevents" type="button" itemid="<?php echo $course_id ?>">新增事件叠加</button>
                            <?php } ?>

                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>编号</th>
                                        <th>事件名称</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    foreach ($lists as $list) {
                                        ?>
                                        <tr>
                                            <td><?php echo $list->rownum ?></td>
                                            <td class="events-title"><?php echo $list->title ?></td>
                                            <td>
                                                <?php
                                                if ($emer_users_info['type'] == 2 && $course_state == 1 ) {
                                                    ?>
                                                    <button type="button" class="btn btn-default btn-sm events-edit"  itemid="<?php echo $list->id ?>">修改</button>
                                                    <button type="button" class="btn btn-default btn-sm events-del"  itemid="<?php echo $list->id ?>">删除</button>
                                                    <button type="button" class="btn btn-default btn-sm" onclick="window.location.href='{base}course/problemsInfo.html?eid=<?php echo $list->id ?>'">添加问题</button>
                                                <?php } else { ?>
                                                    <button type="button" class="btn btn-default btn-sm" onclick="window.location.href='{base}course/problemsInfo.html?eid=<?php echo $list->id ?>'">查看问题</button>
                                                <?php } ?>

                                            </td>
                                        </tr>
                                    <?php } ?>



                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    </body>
    <script src="{base}js/emergency/course.js"></script>
    <script>
        $(function () {
            $(".ymul a").click(function () {
                var href = $(this).attr('href');
                $(this).attr('href', 'javascript:void(0)');
                $("#course_form").attr('action', href);
                $("#course_form").submit();
            })
        })
    </script>
</html>