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
        <script type="text/javascript" src="/js/front/student.js"></script>
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

                    <a class="dp">小组点评</a>
                </div>


                <p class="lct">教学流程图</p>
                <ul class="procedure">

                </ul>
                <!--idea-->
                <div class="idea">
                    <a href="javascript:;">查看各组观点</a>
                    <a href="javascript:;">教学流程索引</a>
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
                    <span class="nr_name">名称</span>
                    <img src="images/1.png" alt="" class="show_nr">
                </div>
            </div>
            <!-- center  end -->

            <!-- right -->
            <div class="right">

                <!-- right_top -->
                <div class="right_top right_top_student">
                    <ol>
                        <li class="cur">相关案例</li>
                        <li>事件案例</li>
                        <li>素材展示</li>
                    </ol>	

                    <ul>
                        <li class="cur relevants">
                            <div></div>
                            <p class="p_more">查看更多</p>
                        </li>

                        <li class="events">
                            <div></div>
                            <p class="p_more">查看更多</p>
                        </li>

                        <li class="materials">
                            <div></div>

                            <p class="p_more">查看更多</p>
                        </li>
                    </ul>
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
                    <textarea placeholder="事件演练"></textarea>
                    <button>发送</button>
                </div>
            </div>
        </div>

        <!--弹出层  各组观点-->
        <div class="show_Ceng" style="display:none;">
            <div class="ceng"></div>
            <div class="show_box">
                <p class="dq_idea">调取观点<span class="close">x</span></p>
                <div class="left">
                    <ul>
                        <li>应急指挥组</li>
                        <li>现场处置组</li>
                        <li>维持秩序A组</li>
                        <li>维持秩序B组</li>
                    </ul>
                </div>
                <div class="right2">
                    <div class="show_chats">
                        <ol>
                            <li><span class="time">2018-2-3</span><p class="xinxi">死到那时可说的搜索</p></li>
                            <li><span class="time">2018-2-3</span><p class="xinxi">死到那时可说的搜索</p></li>
                            <li><span class="time">2018-2-3</span><p class="xinxi">死到那时可说的搜索</p></li>
                            <li><span class="time">2018-2-3</span><p class="xinxi">死到那时可说的搜索</p></li>
                            <li><span class="time">2018-2-3</span><p class="xinxi">死到那时可说的搜索</p></li>
                            <li><span class="time">2018-2-3</span><p class="xinxi">死到那时可说的搜索</p></li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!--弹出层  各组点评-->
        <div class="show_Ceng" style="display:none;">
            <div class="ceng"></div>
            <div class="show_box">
                <p class="dq_idea">点评区<span class="close">x</span></p>
                <div class="left">
                    <ul>
                        <li>应急指挥组</li>
                        <li>现场处置组</li>
                        <li>维持秩序A组</li>
                        <li>维持秩序B组</li>
                    </ul>
                </div>
                <div class="right2">
                    <div class="show_chats show_chats_pl">
                        <textarea placeholder="您的点评"></textarea>
                        <input type="button" value="保存"  class="btn" />
                    </div>
                </div>
            </div>
        </div>

        <!--弹出层  数字索引-->
        <div class="show_Ceng" style="display:none;">
            <div class="ceng"></div>
            <div class="show_box show_box_number">
                <p class="dq_idea">调取观点<span class="close">x</span></p>

                <div class="right2">
                    <div class="show_chats">
                        <ol>
                            <li><span class="time">1</span><p class="xinxi">死到那时可说的搜索</p></li>
                            <li><span class="time">2</span><p class="xinxi">死到那时可说的搜索</p></li>
                            <li><span class="time">3</span><p class="xinxi">死到那时可说的搜索</p></li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

    </body>
</html>