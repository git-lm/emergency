
<html>
    <?php include 'package_main/com_header.php' ?>
    <body class="gray-bg">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>精品课程</h5>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-sm-3">
                                <form action="{base}activity/activity_lists" method="post" id="course_form">
                                    <div class="input-group">
                                        <input type="text" value="<?php echo @$search['aname'] ?>" placeholder="请输入关键词" name="aname" class="input-sm form-control"> <span class="input-group-btn">
                                            <button type="submit" class="btn btn-sm btn-primary" > 搜索</button> </span>
                                    </div>
                                </form>
                                <button data-toggle="button" class="right btn btn-primary btn-outline" type="button" onclick="">新增活动</button>
                            </div>



                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>编号</th>
                                        <th>课程名称</th>
                                        <th>上课老师</th>
                                        <th>上课时间</th>

                                        <th>查看</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    foreach ($lists as $list) {
                                        ?>
                                        <tr>
                                            <td><?php echo $list->rownum ?></td>
                                            <td><?php echo $list->title ?></td>
                                            <td><?php echo $list->uname ?></td>
                                            <td><?php echo $list->begin_time ?></td>
                                            <td>
                                                <button type="button" class="btn btn-default btn-sm " onclick="window.location.href = '{base}activity/activity_edit/<?php echo $list->id ?>'">修改</button>


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