
<html>
    <?php include 'package_main/com_header.php' ?>
    <body class="gray-bg">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>{eTitle}-》事件叠加问题</h5>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-sm-3">
                                <?php
                                if ($emer_users_info['type'] == 2) {
                                    ?>
                                    <button data-toggle="button" class="right btn btn-primary btn-outline problems-add" itemid="{eId}" type="button">新增事件叠加问题</button>
                                <?php } ?>
                            </div>



                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>编号</th>
                                        <th>问题名称</th>
                                        <th>相关事件</th>
                                        <?php
                                        if ($emer_users_info['type'] == 2) {
                                            ?>
                                            <th>操作</th>
                                        <?php } ?>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    foreach ($lists as $list) {
                                        ?>
                                        <tr>
                                            <td><?php echo $list->rownum ?></td>
                                            <td><?php echo $list->title ?></td>
                                            <td>
                                                <?php
                                                if (!empty($list->relevant_title) && !empty($list->relevant_url)) {
                                                    ?>
                                                    <a href='{base}<?php echo $list->relevant_url ?>'><?php echo $list->relevant_title ?></a>
                                                <?php } ?>
                                            </td>
                                            <?php
                                            if ($emer_users_info['type'] == 2) {
                                                ?>
                                                <td>
                                                    <button type="button" class="btn btn-default btn-sm problems-edit" itemid="<?php echo $list->id ?>">修改</button>
                                                    <button type="button" class="btn btn-default btn-sm problems-del" itemid="<?php echo $list->id ?>">删除</button>
                                                </td>
                                            <?php } ?>
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