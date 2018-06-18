
<html>
    <?php include 'package_main/com_header.php' ?>
    <body class="gray-bg">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>我的课程</h5>
                    </div>
                    <div class="ibox-content">
                        <div class="row">


                            <div class="col-sm-3">
                                <form action="{base}course/myCourse.html" method="get" id="course_form">
                                    <div class="input-group">
                                        <input type="text" value="<?php echo @$search['title'] ?>" placeholder="请输入关键词" name="title" class="input-sm form-control"> <span class="input-group-btn">
                                            <button type="submit" class="btn btn-sm btn-primary" > 搜索</button> </span>
                                    </div>
                                </form>
                            </div>
                            <?php
                            if ($emer_users_info['type'] == 2) {
                                ?>
                                <button data-toggle="button" class="right btn btn-primary btn-outline course-add" type="button">新增课程</button>
                            <?php } ?>

                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>编号</th>
                                        <th>课程名称</th>
                                        <th>上课时间</th>
                                        <th>下课时间</th>

                                        <th>查看</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    foreach ($lists as $list) {
                                        ?>
                                        <tr>
                                            <td><?php echo $list->rownum ?></td>
                                            <td class="course-title"><?php echo $list->title ?></td>
                                            <td><?php echo $list->begin_time ?></td>
                                            <td><?php echo $list->end_time ?></td>
                                            <td >
                                                <?php
                                                if ($list->state == 1 ) {
                                                    ?>
                                                    <button type="button" class="btn btn-default btn-sm " onclick="window.location.href = '{base}course/courseInfo.html?cid=<?php echo $list->id ?>'">课程信息</button>
                                                    <?php
                                                    if ($emer_users_info['type'] == 2 && $list->state == 1) {
                                                        ?>
                                                        <button type="button" class="btn btn-default btn-sm course-edit" itemid="<?php echo $list->id ?>">修改课程名称</button>
                                                    <?php } else if ($emer_users_info['type'] == 1) { ?>
                                                        <?php
                                                        if ($list->iselite == 0) {
                                                            ?>
                                                            <button type="button" class="btn btn-default btn-sm course-elite" itemtype="1" itemid="<?php echo $list->id ?>">精品推荐</button>
                                                        <?php } else { ?>
                                                            <button type="button" class="btn btn-default btn-sm course-elite" itemtype="0" itemid="<?php echo $list->id ?>">取消推荐</button>
                                                        <?php } ?>
                                                    <?php } ?>
                                                <?php } ?>
                                            </td>
                                        </tr>
                                    <?php } ?>


                                </tbody>
                            </table>
                            <div class="col-sm-12"style=" text-align: center">
                                <div class="btn-group ymul" style="margin: 0 auto">
                                    {分页}
                                </div>
                            </div>
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