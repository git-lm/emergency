
<html>
    <?php include 'package_main/com_header.php' ?>
    <body class="gray-bg">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>账号管理</h5>
                    </div>
                    <div class="ibox-content">
                        <div class="row">


                            <div class="col-sm-3">
                                <form action="{base}sysconfig/users.html" method="get" id="user_form">
                                    <div class="input-group">
                                        <input type="text" value="<?php echo @$search['name'] ?>" placeholder="请输入姓名" name="name" class="input-sm form-control"> <span class="input-group-btn">
                                            <button type="submit" class="btn btn-sm btn-primary" > 搜索</button> </span>
                                    </div>
                                </form>
                            </div>
                            <button data-toggle="button" class="right btn btn-primary btn-outline user-add" type="button">新增账号</button>


                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>编号</th>
                                        <th>姓名</th>
                                        <th>账号</th>
                                        <th>账号类型</th>
                                        <th>头像</th>
                                        <th>查看</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    foreach ($lists as $list) {
                                        ?>
                                        <tr>
                                            <td><?php echo $list->rownum ?></td>
                                            <td><?php echo $list->name ?></td>
                                            <td><?php echo $list->username ?></td>
                                            <td><?php echo $list->typeName ?></td>
                                            <td><img src="{base}<?php echo $list->photo ?>" style="width: 50px;height: 50px"></td>
                                            <td >

                                                <button type="button" class="btn btn-default btn-sm user-edit" itemid="<?php echo $list->id ?>">修改</button>
                                                <button type="button" class="btn btn-default btn-sm user-del" itemid="<?php echo $list->id ?>">删除</button>
                                                <button type="button" class="btn btn-default btn-sm user-reset" itemid="<?php echo $list->id ?>">重置密码</button>

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
    <script src="{base}js/emergency/sysconfig.js"></script>
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