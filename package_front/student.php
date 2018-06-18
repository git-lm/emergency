<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>应急模拟演练实训系统</title>
        <!--css-->
        <link rel="stylesheet" type="text/css" href="/css/front/public.css" />
        <link rel="stylesheet" type="text/css" href="/css/front/index.css" />
        <!--js-->
        <script type="text/javascript" src="/js/jquery.min.js"></script>
        <script type="text/javascript" src="/js/front/index.js"></script>
        <script src="/js/plugins/layer/layer.min.js"></script>

    </head>
    <script>
        var base = '{base}';
    </script>
    <body>
        <div class="main student">
            <!-- 左侧nav -->
            <div class="nav">
                <div class="top_nav">
                    <div class="group-name"></div>

                    <a class="dp" style="">小组点评</a>
                </div>


                <p class="lct">教学流程图</p><input type="hidden" name="client_id" >
                <ul class="procedure">

                </ul>
                <!--idea-->
                <div class="idea">
                    <a href="javascript:;" class="checkGroupChat">查看各组观点</a>
                    <a href="javascript:;" class="checkProcess">教学流程索引</a>
                </div>

            </div>

            <!-- 左侧nav  end -->

            <!-- center -->
            <div class="center">
                <!--c_top-->
                <div class="c_top c_top_student">
                    <div class="L half">
                        <div class="group-name"></div>
                        <p class="name procedureName"></p>
                    </div>
                    <div class="R half half_tea">
                        问题展示区
                        <div class="div_show">
                            <ul class="questions">

                            </ul>

                            <span href="javascript:;" class="lookmore" style="cursor:pointer; color:#888; padding-top:20px;display:block;">点击查看更多</span>
                        </div>
                    </div>
                </div>

                <!--vises-->
                <div class="vises">

                </div>
            </div>
            <!-- center  end -->

            <!-- right -->
            <div class="right">

                <!-- right_top -->
                <div class="right_top right_top_student">
                    <ol>
                        <li class="cur" >相关案例</li>
                        <li class="">事件案例</li>
                        <li class="">素材展示</li>
                    </ol>	

                    <ul>
                        <li class="cur relevants">
                            <div class="showRelevants"></div>
                            <p class="p_more">查看更多</p>
                        </li>

                        <li class="events">
                            <div class="showEvent"></div>
                            <p class="p_more">查看更多</p>
                        </li>

                        <li class="materials">
                            <div class="showMaterials"></div>

                            <p class="p_more">查看更多</p>
                        </li>
                    </ul>
                </div>

                <!-- right  end -->

                <div class="show_chat">

                </div>

                <!-- man_list -->
                <div class="man_list">
                    <ul>

                    </ul>
                </div>
                <!-- chat_shi -->
                <div class="chat_shi">
                    <textarea placeholder="事件演练" name="chatCon"></textarea>
                    <button class="chatSend">发送</button>
                    <input name="to_u_id" type="hidden" value="0">
                    <input name="source" type="hidden" value="2">
                </div>
            </div>
        </div>



       

       

        <script type="text/javascript" src="/js/front/public.js"></script>
        <script type="text/javascript" src="/js/front/student.js"></script>
    </body>
</html>