function formatSeconds(value){
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }
    var result = ""+parseInt(theTime)+"秒";
    if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+"分"+result;
    }
    if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+"小时"+result;
    }
    $('.timing').text(result);
   
    setTimeout( 'formatSeconds('+value+'+1)', 1000);
   
}

$(function(){
    //获取教师课程
    $.post(base+'teacher/getTeacherPhoto',function(data){
        $('.top_nav img').attr('src',base+data)
    })
    //获取教师正在上课的课程
    $.post(base+'teacher/getProcessCourse',function(data){
     
        if(data !=''){
            $('.dp').text('结束');
            $('.courseName').text(data.title);
            formatSeconds(data.time);
            //获取正在上课的所有流程
            $.post(base + 'teacher/getProcessCourseFlow',function(data){
                var procedure = '';
                for(var i=0; i<data.length;i++){
                    procedure +='<li itemid="'+data[i].id+'">'+data[i].title+'</li>';
                }
                $('.procedure').html(procedure);
            },'json')
            //获取正在上课的小组
            $.post(base + 'teacher/getProcessCourseGroup',function(data){
                var group = '';
                for(var i=0; i<data.length;i++){
                    group +='<span>'+data[i].name+'</span>';
                }
                $('.lesson').html(group);
            },'json')
            
            //获取正在上课的流程
            $.post(base + 'teacher/getProceduresRecord',function(data){
                
                if(data.state == 'ok'){
                    var prd_id = data.prd_id;
                    var process = data.process;
                    var qusHtml = '';
                   
                    for(var i=0; i<process.length;i++){
                        qusHtml +='<li><a href="javascript:;">'+process[i].indexes+'</a></li>';
                    }
                    
                    $('.qus').html(qusHtml);
                    var procedureName =  $('.procedure li[itemid="'+prd_id+'"]').text();
                    $('.procedure li[itemid="'+prd_id+'"]').addClass('purple whiteColor');
                    $('.procedureName').text(procedureName);
                }
               
            },'json')
            
            //获取正在上课流程的事件
            $.post(base+'teacher/getProcessRecord',function(data){
                if(data.state=='ok'){
                    var visesHeight = $('.vises').height();
                    var visesWidth = $('.vises').width();
                    $('.vises').html('<iframe height="'+visesHeight+'" width="'+visesWidth+'"  src="'+base+data.msg.material+'"></iframe> ');
                }
            },'json')
        }else{
            $('.dp').text('开始');
            $('.flow').html('等待选课');
            $('.lesson').html('等待选课');
            $('.courseName').text('等待选课');
        }
    },'json')
    
    
    
    
    
    
    /*************************************分隔符   上部分刷新获取  下部分事件获取**********************************************************/   
    
    
    //开始教学流程
    $('.procedure').on('click','li',function(){
        var _this = $(this);
        var procedureName =  $(this).text();
        var procedureId =  $(this).attr('itemid');
        layer.msg('确定开始该流程结束上个流程', {
            time: 20000, //20s后自动关闭
            btn: ['确定', '再等会'],
            yes:function(index){
                $.post(base+'teacher/setProcedure',{
                    'procedureId':procedureId
                },function(data){
                    if(data.state == 'ok'){
                        var process = data.msg;
                        var qusHtml ='';
                        for(var i=0; i<process.length;i++){
                            qusHtml +='<li><a href="javascript:;">'+process[i].indexes+'</a></li>';
                        }
                        $('.qus').html(qusHtml);
                        $('.procedureName').text(procedureName);
                        $('.procedure li').removeClass();
                        _this.addClass('purple whiteColor');
                    }else{
                        layer.msg(data.msg);
                    }
                },'json')
                
                layer.close(index)
            }
        });
    } )
    //点击资源展示显示内容
    $('.resource').click(function(){
        var prd_id = $('.purple').attr('itemid');
        $.post(base+'teacher/getProceduresProcess',{
            'prd_id':prd_id
        },function(data){
            if(data.state =='ok'){
                var Indexes = data.msg;
                var indexesHtml = '';
                for(var i=0; i<Indexes.length;i++){
                    indexesHtml +='<li itemid="'+Indexes[i].id+'"><span class="time">'+(i* 1 + 1* 1 )+'、</span><p class="xinxi">'+Indexes[i].indexes+'：'+Indexes[i].injection+'</p></li>';
                }
                var html ='<div class="show_Ceng">'
                +'<div class="ceng"></div>'
                +'<div class="show_box show_box_number">'
                +'<div class="right2">'
                +'<div class="show_chats showinjection">'
                +'<ol class="there showIndexes">'
                + indexesHtml
                +'</ol>'
                +'<div class="show_list showContent">'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>';
                layer.open({
                    title:'资源展示',
                    type: 1,
                    area: ['500px','500px'], //宽高
                    closeBtn :1,
                    content: html,
                    btn: ['上屏', '取消'],
                    yes:function(index, layero){
                        if($('.showIndexes .cur').length != 0 ){
                            var p_id = $('.showIndexes .cur').attr('itemid');
                            var p_name = $('.showIndexes .cur p').text();
                            layer.confirm('您确定选择'+p_name+'上屏？', {
                                btn: ['确定', '后悔了'] //按钮
                            }, function () {
                           
                                $.post(base+'teacher/setProcess',{
                                    'p_id':p_id
                                },function(data){
                                    if(data.state =='ok'){
                                        layer.closeAll();
                                        var visesHeight = $('.vises').height();
                                        var visesWidth = $('.vises').width();
                                        $('.vises').html('<iframe height="'+visesHeight+'" width="'+visesWidth+'"  src="'+base+data.msg.material+'"></iframe> ');
                                   
                                    }else{
                                        layer.closeAll();
                                        layer.msg(data.msg);
                                    }
                                },'json')
                           
                            });
                        }else{
                            layer.msg('请选择要上屏的事件');
                        }
                        
                    }
                });
            }else{
                layer.msg(data.msg);
            }
            
        },'json')
        
    })
    
    //点击资源展示中的事件索引显示素材
    $(document).on('click','.showIndexes li',function(){
        $('.showIndexes li').removeClass('cur');
        var _this = $(this);
        _this.addClass('cur');
        var p_id = $(this).attr('itemid');
        $.post(base+'teacher/getProcess',{
            'p_id':p_id
        },function(data){
            if(data.state =='ok'){
                _this.parent().parent().find('.showContent').html('<div class="list">'+data.msg.material_name+'</div>');
            }else{
                layer.msg(data.msg);
            }
        },'json')
    })
    //点击事件叠加事件
    $('.event').click(function(){
        var prd_id = $('.purple').attr('itemid');
        $.post(base+'teacher/getEventGroup',{
            'prd_id':prd_id
        },function(data){
            
            if(data.state == 'ok'){
               
                var group = data.group;
                var groupHtml ='';
                var event = data.event;
                var eventHtml ='';
                for(var i=0; i<group.length;i++){
                    groupHtml +='<li itemid="'+group[i].id+'">'+group[i].name+'</li>';
                }
                
                for(var j=0; j<event.length;j++){
                    eventHtml +='<li itemid="'+event[j].id+'">'+event[j].title+'</li>';
                }
               
                
                var html ='<div class="show_Ceng" >'
                +'<div class="ceng"></div>'
                +'<div class="show_box show_box_number">'
                +'<div class="right2">'
                +'<div class="show_chats show_chats_pl">'
                +'<ol class="ol_one there showEvent">'
                +eventHtml
                +'</ol>'
                +'<p class="choose">选择租</p>'
                +'<ol class="ol_one four showGroup">'
                +groupHtml
                +'</ol>'
                +'<p class="choose">小组情况</p>'
                +'<ol class="ol_one four showEventGroup">'
                +data.eventgroup
                +'</ol>'
                +'</div>'
                +'</div>'
              
                +'</div>'
                +'</div>';
                layer.open({
                    title:'事件注入',
                    type: 1,
                    area: ['500px','500px'], //宽高
                    closeBtn :1,
                    content: html,
                    btn: ['注入事件', '取消'],
                    yes:function(index, layero){
                        var event = new Array();
                        var group = new Array();
                        $('.showEvent .cur').each(function(){
                            event.push($(this).attr('itemid'));
                        })
                        $('.showGroup .cur').each(function(){
                            group.push($(this).attr('itemid'));
                        })
                        
                        if(!$.isArray(event) || event.length == 0){
                            layer.msg('请选择叠加的事件');
                            return;
                        }
                        if(!$.isArray(group) || group.length == 0){
                            layer.msg('请选择注入的小组');
                            return;
                        }
                       
                        $.post(base + 'teacher/setEventGroup',{
                            'event':event,
                            'group':group
                        },function(data){
                            if(data.state =='ok'){
                                layer.closeAll();
                                layer.msg(data.msg);
                            }else{
                                layer.closeAll();
                                layer.msg(data.msg);
                            }
                        },'json')
                        
                    }
                });
            }else{
                layer.msg(data.msg);
            }
        },'json')
        
       
    })
    
    //事件叠加  选择事件
    $(document).on('click','.showEvent li',function(){
        if($(this).hasClass('cur')){
            $(this).removeClass('cur');
        }else{
            $(this).addClass('cur');
        }
       
       
    })
    //事件叠加  选择组
    $(document).on('click','.showGroup li',function(){
        if($(this).hasClass('cur')){
            $(this).removeClass('cur');
        }else{
            $(this).addClass('cur');
        }
    })
    
    
})