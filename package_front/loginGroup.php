<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>一款基于JQuery做的动画背景后台管理登录模板 - </title>

        <link href="{base}css/front/main.css" rel="stylesheet" type="text/css" />
    </head>
    <script>
        var base = '{base}';
    </script>
    <body>


        <div class="login">
            <div class="box png">
                <div class="logo png"></div>
                <div class="input">
                    <div class="log">
                        <div class="name">
                            <label>用户名</label><input type="text" class="text" id="" placeholder="账号"  name="username" />
                        </div>
                        <div class="pwd">
                            <label>密　码</label><input type="password" class="text" id="value_2" placeholder="密码" name="password" tabindex="2" />
                            <input type="button" class="loginSubmit loginGroupSubmit" tabindex="3" value="登录" />
                            <div class="check"></div>
                        </div>
                        <div class="tip"></div>
                    </div>
                </div>
            </div>
            <div class="air-balloon ab-1 png"></div>
            <div class="air-balloon ab-2 png"></div>
            <div class="footer"></div>
        </div>

        <script src="/js/jquery.min.js"></script>
        <script src="/js/front/fun.base.js"></script>
        <script src="/js/front/script.js"></script>
        <script src="/js/front/main.js"></script>
        <script src="/js/plugins/layer/layer.min.js"></script>
        <script src="/js/front/public.js"></script>

        <!--[if IE 6]>
        <script src="js/DD_belatedPNG.js" type="text/javascript"></script>
        <script>DD_belatedPNG.fix('.png')</script>
        <![endif]-->

    </body>
</html>