$(function() {
    window.onload = function(){
        $(document).find(".main,.ceng").height($(window).height());
        $(document).find(".center").width($('.main').width() - $(".right").width()*2-1 );  //设置body的高度
        $(document).find(".vises").height($('.main').height() - $(".c_top").height());
        $(document).find(".show_chats").css("max-height",$(window).height()*0.7);
        $(document).find(".show_chat").height($(".right").height() - $(".right_top").height() - $(".chat_shi").height());

        //教学流程图的间距
        $(".lct").css('padding-top', ""+$(window).height()*0.2 - $(".top_nav").height()+"px");
    }


    //查看更多  教师
    $(".more_btn").click(function(event) {
        if($(this).text() == "查看更多"){
            $(this).parents(".right_top_teacher").find("li").show();
            $(this).text("收起");
        }else{
            $(this).parents(".right_top_teacher").find("li").hide();
            $(".right_top_teacher .qus li:nth-child(1),.right_top_teacher .qus li:nth-child(2)").show();
            $(this).text("查看更多");
        }
    });

    //查看更多问题  学生
    $(".lookmore").click(function(event) {
        if($(this).text() == "点击查看更多"){
            $(this).parents(".half_tea").find("li").show();
            $(this).text("收起");
        }else{
            $(this).parents(".half_tea").find("li").hide();
            $(".half_tea li.cur").show();
            $(this).text("点击查看更多");
        }
    });

    //查看更多  学生
    $(".p_more").click(function(event) {
        if($(this).text() == "查看更多"){
            $(this).parents("li").find("div").show();
            $(this).text("收起");
        }else{
            $(this).parents("li").find("div").hide();
            $(".right_top_student ul li div:nth-child(1),.right_top_student ul li div:nth-child(2),.right_top_student ul li div:nth-child(3)").show();
            $(this).text("查看更多");
        }
    });

    //questions  隐藏questions
    $(".questions").mouseleave(function(event) {
        $(".cur_qus").nextAll().hide();
    });

    $(".qus").mouseleave(function(event) {
        $(".cur_tea2").nextAll().hide();
    });

    //tag切换
    $(".right_top_student ol li").click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(".right_top_student ul li").eq($(this).index()).addClass('cur').siblings().removeClass('cur');
    });



    //关闭弹出层
    $(".close,.ceng").click(function(event) {
        $(".show_Ceng").hide();
    });

    //@消失
    $(".man_list li,.main").click(function(event) {
        $(".man_list").hide();
    });


    //弹出层的tab切换
    $(".show_chats1 ol li").click(function(event) {
        $(this).addClass("cur").siblings().removeClass('cur');
        $(".show_list .btn").fadeIn();
        $(".show_list .list").hide();
        $(".show_list .list:nth-child(1),.show_list .list:nth-child(2),.show_list .list:nth-child(3)").show();
    });

    //弹出层的内容全部加载
    $(".show_list .btn").click(function(event) {
        $(".show_list .list").fadeIn();
        $(this).fadeOut();
    });

});
