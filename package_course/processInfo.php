
<html>
    <?php include 'package_main/com_header.php' ?>
    <body class="gray-bg">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>{pTitle}-》课程流程事件</h5>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-sm-3">

                                <button data-toggle="button" class="right btn btn-primary btn-outline process-add" itemid="{pId}" type="button">新增流程事件索引</button>
                            </div>



                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>编号</th>
                                        <th>教学索引</th>
                                        <th>事件注入</th>
                                        <th>素材展示</th>
                                        <th>查看发言</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    foreach ($lists as $list) {
                                        ?>
                                        <tr>
                                            <td><?php echo $list->rownum ?></td>
                                            <td><?php echo $list->indexes ?></td>
                                            <td><?php echo $list->injection ?></td>
                                            <td>
                                                <?php
                                                if (!empty($list->material) && !empty($list->material_name)) {
                                                    ?>
                                                    <a href='{base}<?php echo $list->material ?>'><?php echo $list->material_name ?></a>
                                                <?php } ?>
                                            </td>
                                            <td><?php echo $list->material ?></td>
                                            <td>
                                                <button type="button" class="btn btn-default btn-sm process-edit" itemid="<?php echo $list->id ?>">修改</button>
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
</html>