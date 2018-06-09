<html>
    <?php include PACKAGE_MAIN_PAGE . '/com_header.php' ?>
    <link href="{base}css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" rel="stylesheet">

    <body class="gray-bg">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">

                    <div class="col-sm-12">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h5>我要报销</h5>
                            </div>
                            <div class="ibox-content">
                                <form class="form-horizontal" method="post" id="baoxiao_form" action="{base}metal/add_baoxiao" enctype="multipart-formdatas">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">报销名称：</label>
                                        <div class="col-sm-3">
                                            <input type="text" name="title" placeholder="请输入报销名称" class="form-control" value=""><span class="help-block m-b-none" id="titles"></span> 
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">报销金额(元)：</label>
                                        <div class="col-sm-3">
                                            <input type="text" name="price" placeholder="请输入报销金额" class="form-control" value="">
                                            <span class="help-block m-b-none" id="prices"></span>
                                        </div>
                                    </div>
                                    <div class="ibox-content" >
                                        <div class="row">
                                            <label class="col-sm-3 control-label">报销凭证：</label>
                                            <div class="col-md-6" >
                                                <div class="img-preview img-preview-sm">
                                                    <img id="imgShow" class="imgkj" src="" alt="#" />
                                                </div>
                                                <div class="btn-group">
                                                    <a href="javascript:void(0)" class="a-upload">
                                                        <input type="file" name="photo" id="photo" >
                                                    </a>
                                                </div><span class="help-block m-b-none" id="photos"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-offset-3 col-sm-8">
                                            <button class="btn btn-sm btn-white add_baoxiao" type="button">提 交</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </body>
    <script type="text/javascript" src="{base}js/uploadPreview.min.js"></script>

    <script>
        $(function () {
            window.onload = function () {
                new uploadPreview({UpBtn: "photo", DivShow: "imgdiv", ImgShow: "imgShow"});
            }
        })
    </script>
</html>