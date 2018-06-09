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
                                <h5>修改密码</h5>
                            </div>
                            <div class="ibox-content">
                                <form class="form-horizontal" method="post" id="baoxiao_form" action="{base}metal/add_baoxiao" enctype="multipart-formdatas">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">原密码：</label>
                                        <div class="col-sm-3">
                                            <input type="text" name="password" placeholder="请输入原密码" class="form-control" value=""> 
                                        </div>  <span class="help-block m-b-none" id="pwd_tips"></span>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">新密码：</label>
                                        <div class="col-sm-3">
                                            <input type="password" name="npassword" placeholder="请输入新密码" class="form-control" value="">
                                        </div>  <span class="help-block m-b-none" id="npwd_tips"></span>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">再次输入密码：</label>
                                        <div class="col-sm-3">
                                            <input type="password" name="againpassword" placeholder="请再次输入密码" class="form-control" value="">
                                        </div>  <span class="help-block m-b-none" id="apwd_tips"></span>
                                    </div>

                                    <div class="form-group">
                                        <div class="col-sm-offset-3 col-sm-8">
                                            <button class="btn btn-sm btn-white change_pwd" type="button">提 交</button>
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
            $('input[name="password"]').change(function(){
                $("#pwd_tips").text("");
            })
            $('input[name="npassword"]').change(function(){
                $("#npwd_tips").text("");
            })
            $('input[name="againpassword"]').change(function(){
                $("#apwd_tips").text("");
            })
            $(".change_pwd").click(function(){
                var password=$.trim($('input[name="password"]').val());
                var npassword=$.trim($('input[name="npassword"]').val());
                var againpassword=$.trim($('input[name="againpassword"]').val());
                if(password==""){
                    $("#pwd_tips").text("请输入原密码");
                    return;
                }
                if(npassword==""){
                    $("#npwd_tips").text("请输入新密码");
                    return;
                }
                if(againpassword==""){
                    $("#apwd_tips").text("请再次输入新密码");
                    return;
                }else{
                    if(npassword!=againpassword){
                        $("#apwd_tips").text("两次密码输入不一致");
                        return;
                    }
                }
                $.post(base+"metal/change_pwd",{"npassword":npassword,"password":password},function(data){
                    if(data=="wrong"){
                        $("#pwd_tips").text("原密码输入错误");
                        return;
                    }else if(data=="ok"){
                        parent.layer.open({
                            content:"修改成功,请重新登录",
                            yes:function(data){
                                logout();
                            }
                        })
                    }else{
                        parent.layer.open({
                            content:"修改失败"
                        })
                    }
                })
            })
        })
    </script>
</html>