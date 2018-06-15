<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title></title>
        <!--css-->
        <link rel="stylesheet" type="text/css" href="/css/front/public.css" />
        <link rel="stylesheet" type="text/css" href="/css/front/index.css" />

        <!--js-->
        <script type="text/javascript" src="/js/jquery.min.js"></script>
        <script type="text/javascript" src="/js/front/index.js"></script>
        <script src="/js/plugins/layer/layer.min.js"></script>


        <script>
            var base = '{base}';
        </script>
    </head>
    <body>
        <div class="main teacher">
            <!-- 左侧nav -->
            <div class="nav">
                <div class="top_nav">
                    <img src="" alt="" class="header" /><a class="dp"></a><br />
                    <span class="timing">0</span>
                </div>


                <p class="lct">教学流程图</p>
                <div class='flow'>
                    
                </div>
            </div>

            <!-- 左侧nav  end -->

            <!-- center -->
            <div class="center">
                <!--c_top-->
                <div class="c_top c_top_teacher">
                    <div class="pm">
                        <div class="halfs">
                            <span class="courseName"></span>
                            <span class="procedureName">暂无流程</span>
                        </div>

                        <div class="lesson">
                        </div>   
                    </div>
                </div>

                <!--vises-->
                <div class="vises">
                    <span class="nr_name">名称</span>
                    <img src="images/1.png" alt="" class="show_nr">
                </div>
            </div>
            <!-- center  end -->

            <!-- right -->
            <div class="right">

                <!-- right_top -->
                <div class="right_top right_top_teacher">
                    <button>教学流程索引</button>
                    <ol class="qus">
                    </ol>

                    <p class="ckgd"><button class="more_btn">查看更多</button></p>

                </div>

                <!-- right  end -->

                <div class="show_chat">
                    <div class="L_chat chat">
                        <span class="mc">张飞</span>张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞
                    </div>

                    <div class="L_chat chat">
                        <span class="mc">张飞</span>张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞
                    </div>

                    <div class="R_chat chat">
                        <span class="mc">张飞</span>张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞张飞
                    </div>
                </div>

                <!-- man_list -->
                <div class="man_list">
                    <ul>
                        <li>张三</li>
                        <li>张三</li>
                        <li>张三</li>
                        <li>张三</li>
                        <li>张三</li>
                        <li>张三</li>
                    </ul>
                </div>
                <!-- chat_shi -->
                <div class="chat_shi">
                    <textarea placeholder="事件演练" name="teacherCon"></textarea>
                    <button class="teacherSend">发送</button>
                </div>
            </div>
        </div>

        <!--弹出层  素材分发-->
        <div class="show_Ceng" style="display:none;">
            <div class="ceng"></div>
            <div class="show_box show_box_number">
                <div class="right2">
                    <div class="show_chats show_chats_pl">
                        <ol class="ol_one five">
                            <li>ppt</li>
                            <li>视频</li>
                            <li>文档</li>
                            <li>图片</li>
                            <li>其它素材</li>
                        </ol>

                        <p class="choose">选择素材区</p>
                        <ol class="ol_one four">
                            <li>xxxx问题</li>
                            <li>xxxx问题</li>
                            <li>xxxx问题</li>
                            <li>xxxx问题</li>
                            <li>xxxx问题</li>
                        </ol>

                        <p class="choose">选择组</p>
                        <ol class="ol_one four">
                            <li>xxxx问题</li>
                            <li>xxxx问题</li>
                            <li>xxxx问题</li>
                            <li>xxxx问题</li>
                            <li>xxxx问题</li>
                        </ol>

                    </div>
                </div>
            </div>
        </div>

        <!--弹出层  小组名块-->
        <div class="show_Ceng" style="display:none;">
            <div class="ceng"></div>
            <div class="show_box show_box_number">
                <div class="right2">
                    <div class="show_chats show_chats_pl">
                        <ol class="ol_one there">
                            <li>事件注入</li>
                            <li>问题分发</li>
                            <li>素材分发</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>



        <!--弹出层  点击问题分发页面-->
        <div class="show_Ceng" style="display:none;">
            <div class="ceng"></div>
            <div class="show_box show_box_number">
                <div class="right2">
                    <div class="show_chats show_chats_pl">
                        <p class="choose">选择租</p>
                        <ol class="ol_one four">
                            <li>群发突发事件</li>
                            <li>群发突发事件</li>
                            <li>群发突发事件</li>
                            <li>群发突发事件</li>
                            <li>群发突发事件</li>
                        </ol>

                        <p class="choose">问题选择</p>
                        <ol class="ol_one four">
                            <li>xxxx问题</li>
                            <li>xxxx问题</li>
                            <li>xxxx问题</li>
                            <li>xxxx问题</li>
                            <li>xxxx问题</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>



        <!--弹出层  点击事件注入页面-->


        <!--弹出层  资源展示区-->
        <div class="show_Ceng" style="display:none;">
            <div class="ceng"></div>
            <div class="show_box show_box_number">
                <div class="right2">
                    <div class="show_chats show_chats1">
                        <ol class="there">
                            <li class="cur"><span class="time">1</span><p class="xinxi">资源展示区1</p></li>
                            <li><span class="time">2</span><p class="xinxi">资源展示区2</p></li>
                            <li><span class="time">3</span><p class="xinxi">资源展示区3</p></li>
                        </ol>

                        <!-- show_list -->
                        <div class="show_list">
                            <div class="list">数据1</div>
                            <div class="list">数据2</div>
                            <div class="list">数据3</div>
                            <div class="list">111</div>
                            <div class="list">111</div>
                            <input type="button" value="加在全部"  class="btn" />
                        </div>
                        <!-- show_list -->
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript" src="{base}js/front/public.js"></script>
        <script type="text/javascript" src="{base}js/front/teacher.js"></script>

    </body>
</html>