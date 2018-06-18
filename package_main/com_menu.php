<!--左侧导航开始-->
<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="nav-close"><i class="fa fa-times-circle"></i>
    </div>
    <div class="sidebar-collapse">
        <ul class="nav" id="side-menu">
            <li class="nav-header">
                <div class="dropdown profile-element" style="margin-left: 20%">
                    <span><img alt="image" width="80px" height="80px" class="img-circle" src="{base}<?php echo @$emer_users_info['photo'] ?>" /></span>
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">

                        <span class="clear">
                            <span class="text-muted text-xs block"><strong class="font-bold">


                                </strong><b class="caret"></b></span>
<!--                            <span class="text-muted text-xs block">超级管理员<b class="caret"></b></span>-->
                        </span>
                    </a>
                    <ul class="dropdown-menu animated fadeInRight m-t-xs">
                        <li><a class="J_menuItem" href="{base}metal/change_pwd.html">修改密码</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="javascript:void()" class="logout">安全退出</a>
                        </li>
                    </ul>
                </div>
                <div class="logo-element">
                </div>
            </li>

            <li>
                <a class="J_menuItem" href="{base}course/eliteList.html">
                    <i class="fa fa-home"></i>
                    <span class="nav-label">精品推荐</span>
                </a>


            </li>
            <li>

                <a  href="#">
                    <i class="fa fa-home"></i>
                    <span class="nav-label">应急决策</span>
                </a>
                <ul class="nav nav-second-level">
                    <li>
                        <a class="J_menuItem" href="{base}course/myCourse.html" data-index="0">我的课程</a>
                    </li>

                </ul>

            </li>


            <?php
            if (!empty($emer_users_info) && $emer_users_info['type'] == 1) {
                ?>
                <li>

                    <a  href="#">
                        <i class="fa fa-home"></i>
                        <span class="nav-label">系统配置</span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a class="J_menuItem" href="{base}sysconfig/logo.html" data-index="0">LOGO设置</a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="{base}sysconfig/users.html" data-index="0">账号设置</a>
                        </li>

                    </ul>

                </li>
            <?php } ?>











        </ul>
    </div>
</nav>
<script>
    $('.J_menuItem').click(function () {
        $('.J_menuItem').css('color', '#fff');
        $(this).css('color', 'red');
    })

</script>
<!--左侧导航结束-->