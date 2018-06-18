$(function () {
    //获取课程信息
    var index = layer.load(1,{
        shade: [0.5,'#000']
    })
    $.post(base + 'student/getGroupCourse', function (data) {
        //获取小组信息
        var group = data.group;
        if (group.name == '') {
            $('.group-name').text('无用户名');
        } else {
            $('.group-name').text(group.name);
        }
        //获取课程下的所有流程
        var procedure = data.procedures;
        var procedureHtml = '';
        for (var i = 0; i < procedure.length; i++) {
            procedureHtml += '<li itemid="' + procedure[i].id + '">' + procedure[i].title + '</li>';
        }
        $('.procedure').html(procedureHtml);
        var prd_id = data.prd_id;
        var procedureName = $('.procedure li[itemid="' + prd_id + '"]').text();
        $('.procedure li[itemid="' + prd_id + '"]').addClass('purple whiteColor');
        if (procedureName != '') {
            $('.procedureName').text(procedureName);
        } else {
            $('.procedureName').text('暂无流程');
        }
        //获取正在上课的事件
        //正在上课的事件
        var process = data.process;
        if (process != '') {
            var visesHeight = $('.vises').height();
            var visesWidth = $('.vises').width();
            $('.vises').html('<iframe height="' + visesHeight + '" width="' + visesWidth + '"  src="' + base + process.material + '"></iframe> ');
        }
        //获取小组所有问题
        var problems = data.problems;
        var questionsHtml = '';
        if (problems != '') {
            for (var i = 0; i < problems.length; i++) {
                questionsHtml += '<li>' + problems[i].title + '</li>';
            }
        } else {
            questionsHtml += '<li class="noProblem">无问题</li>';
        }
        $('.questions').html(questionsHtml);
        //获取小组所有相关案例
        var relevants = data.relevants;
        var relevantsHtml = '';
        if (relevants != '') {
            for (var i = 0; i < relevants.length; i++) {
                relevantsHtml += '<div class="al" itemid="' + relevants[i].id + '">' + relevants[i].title + '</div>';
            }
        } else {
            relevantsHtml += '<div class="noRelevant">无相关案例</div>';
        }
        $('.relevants div').html(relevantsHtml);
        //获取小组所有相关事件
        var events = data.events;
        var eventsHtml = '';
        if (events != '') {
            for (var i = 0; i < events.length; i++) {
                eventsHtml += '<div class="sj" itemid="' + events[i].id + '">' + events[i].title + '</div>';
            }
        } else {
            eventsHtml += '<div class="noEvent">无相关事件案例</div>';
        }
        $('.events .showEvent').html(eventsHtml);
        //获取小组所有相关素材
        var materials = data.materials;
        var materialsHtml = '';
        if (materials != '') {
            for (var i = 0; i < materials.length; i++) {
                materialsHtml += '<div class="sc" itemid="' + materials[i].id + '">' + materials[i].title + '</div>';
            }
        } else {
            materialsHtml += '<div class="noMaterial">无素材</div>';
        }
        $('.materials div').html(materialsHtml);
        var group = data.groups;
        var groupHtml = '';
        //获取正在上课的小组
        for (var i = 0; i < group.length; i++) {
            groupHtml += '<span class="'+ group[i].id+'">' + group[i].name + '</span>';
        }
        $('.lesson').html(groupHtml);
        var groupHtml = '<li itemid="0">所有人</li>';
        for (var i = 0; i < group.length; i++) {
            groupHtml += '<li itemid="'+group[i].id +'">' + group[i].name + '</li>';
        }
        $('.man_list ul').html(groupHtml);
        //获取所有发言的信息
        var chats = data.chats;
        var chatHtml = '';
        if (chats != '') {
            for (var i = 0; i < chats.length; i++) {
                chatHtml += ' <div class="'+chats[i].className+' chat">'
                +'<span class="mc">'+chats[i].name+'</span><br />'+chats[i].content+''
                +'</div>';
            }
            $('.show_chat').html(chatHtml);
        }
        layer.close(index); 
    }, 'json')
    
    
    $(document).on('click' , 'div .sc' ,function(){
        var m_id = $(this).attr('itemid');
        var index = layer.load(1,{
            shade: [0.5,'#000']
        })
        $.post(base +'student/getStudentMaterial',{
            'm_id':m_id
        },function(data){
            layer.close(index); 
            if(data.state == 'ok'){
                
                layer.open({
                    type: 2,
                    title: false,
                    area: ['630px', '360px'],
                    shade: 0.8,
                    closeBtn: 0,
                    shadeClose: true,
                    content: data.msg.url,
                    btn: ['确定'],
                    yes:function(){
                        layer.closeAll();
                    }
                });
            }else{
                layer.msg(data.msg);
            }
        },'json')
    })
    //查看各小组观点
    $('.checkGroupChat').click(function(){
        var index = layer.load(1,{
            shade: [0.5,'#000']
        })
        $.post(base +'student/getCourseGroup',function(data){
            layer.close(index); 
            if(data.state =='ok'){
                var groupHtml = '';
                var groups = data.msg;
                for (var i = 0; i < groups.length; i++) {
                    groupHtml += '<li itemid="' + groups[i].id + '">' + groups[i].name + '</li>';
                }
                var html = '<div class="show_Ceng">'
                +'<div class="ceng"></div>'
                +'<div class="show_box">'
                +'<div class="left">'
                +'<ul class="showGroupChat">'
                +groupHtml
                +'</ul>'
                +'</div>'
                +'<div class="right2">'
                +'<div class="show_chats">'
                +'<textarea name="groupChat"></textarea>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>';
                layer.open({
                    title: '查看各小组观点',
                    type: 1,
                    content: html,
                    area: ['800px', '500px'],
                    btn: ['确定'],
                    yes:function(){
                        layer.closeAll();
                    }
                });
            }else{
                layer.msg(data.msg);
            }
        
        },'json')
    
    })
    //查看教学索引
    $('.checkProcess').click(function(){
        var index = layer.load(1,{
            shade: [0.5,'#000']
        })
        $.post(base +'student/getProcess',function(data){
            layer.close(index); 
            if(data.state =='ok'){
                var processHtml = '';
                var process = data.msg;
                for (var i = 0; i < process.length; i++) {
                    processHtml += '<li><p class="xinxi">' + process[i].indexes + '</p></li>';
                }
                var html = '<div class="show_Ceng" style="display:block;">'
                +'<div class="ceng"></div>'
                +'<div class="show_box show_box_number">'
                +'<div class="right2">'
                +'<div class="show_chats">'
                +'<ol>'
                +processHtml
                +'</ol>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>';
                layer.open({
                    title: '查看教学索引',
                    type: 1,
                    content: html,
                    area: ['300px', '300px'],
                    btn: ['确定'],
                    yes:function(){
                        layer.closeAll();
                    }
                });
            }else{
                layer.msg(data.msg);
            }
        
        },'json')
    })
    
    //小组点评
    $('.student .dp').click(function(){
        var index = layer.load(1,{
            shade: [0.5,'#000']
        })
        $.post(base +'student/getCourseGroup',function(data){
            layer.close(index); 
            if(data.state =='ok'){
                var groupHtml = '<li itemid="0">上课讲师</li>';
                var groups = data.msg;
                for (var i = 0; i < groups.length; i++) {
                    groupHtml += '<li itemid="' + groups[i].id + '">' + groups[i].name + '</li>';
                }
                var html = '<div class="show_Ceng"">'
                +'<div class="ceng"></div>'
                +'<div class="show_box">'
                +'<div class="left">'
                +'<ul class="showGroupDp">'
                +groupHtml
                +'</ul>'
                +'</div>'
                +'<div class="right2">'
                +'<div class="show_chats show_chats_pl">'
                +'<textarea placeholder="您的点评" name="dp"></textarea>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>';
                layer.open({
                    title: '小组点评',
                    type: 1,
                    content: html,
                    area: ['800px', '500px'],
                    btn: ['确定点评','取消'],
                    yes:function(){
                        var g_id = $('.showGroupDp .cur').attr('itemid')
                        var dp = $('textarea[name="dp"]').val();
                        if(g_id == undefined || g_id == ''){
                            layer.msg('请选择小组');
                            return;
                        }
                        if(dp == undefined || dp == ''){
                            layer.msg('请填写点评内容');
                            return;
                        }
                        var index = layer.load(1,{
                            shade: [0.5,'#000']
                        })
                        $.post(base +'student/setReview',{
                            'content':dp,
                            'g_id':g_id
                        },function(data){
                            layer.msg(data.msg);
                        },'json')
                    }
                });
            }else{
                layer.msg(data.msg);
            }
        },'json')
    })
    
    $(document).on('click','.showGroupDp li',function(){
        $('.showGroupDp li').removeClass('cur');
        $(this).addClass('cur');
    })
    
   
})

