<html>
    <?php include 'package_main/com_header.php' ?>
    <body>
        <div class="col-sm-12">
            <div class="ibox float-e-margins">
                <div class="ibox-content text-center p-md">
                    <div class="form-group">
                        <label class="font-noraml">LOGO 选择</label>
                        <form id="logoedit" action="{base}sysconfig/logoedit" method="post">
                            <div>
                                <input class="form-control" name="url" type="file">				
                                <button data-toggle="button" class="right btn btn-primary btn-outline logoedit" type="button">修改LOGO</button>
                            </div>
                        </form>
                    </div>
                    <div class="m-t-md">
                        <p>点击以下图片查看效果：</p>
                        <div class="p-lg ">
                            <?php
                            if (!empty($logourl)) {
                                ?>
                                <a href="{base}<?php echo $logourl ?>" target="_blank">

                                    <img class="img-responsive img-shadow" src="{base}<?php echo $logourl ?>" alt="">

                                </a>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </body>
    <script src="{base}js/emergency/sysconfig.js"></script>
</html>