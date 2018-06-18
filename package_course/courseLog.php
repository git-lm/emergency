
<html>
    <?php include 'package_main/com_header.php' ?>
    <body class="gray-bg">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>课程记录</h5>
                    </div>
                    <div class="ibox-content">
                        <div class="row">


                            <div class="col-sm-3">
                                <form action="" method="get" id="course_form">
                                    <div class="input-group">
                                        <input name="start" type="hidden" value="<?php echo @$search['start'] ?>">
                                        <input name="c_id" type="hidden" value="<?php echo @$search['c_id'] ?>">
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
                                        <th>记录名称</th>
                                        <th>发送方</th>
                                        <th>接收方</th>
                                        <th>内容</th>
                                        <th>时间</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    foreach ($lists as $list) {
                                        ?>
                                        <tr>
                                            <td><?php echo $list->rownum ?></td>
                                            <td><?php echo $list->type_name ?></td>
                                            <td><?php echo $list->from_name ?></td>
                                            <td><?php echo $list->to_name ?></td>
                                            <td><?php echo $list->content ?></td>
                                            <td><?php echo $list->add_time ?></td>
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
</html>