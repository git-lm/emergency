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
    $('.time').text(result);
   
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
            $.post(base + 'teacher/getProcessProcedures',function(data){
                if(data.state == 'ok'){
                    var prd_id = data.prd_id;
                    var process = data.process;
                    var qusHtml = '';
                    for(var i=0; i<process.length;i++){
                        var qusHtml ='';
                        for(var i=0; i<process.length;i++){
                            qusHtml +='<li><a href="javascript:;">'+process[i].indexes+'</a></li>';
                        }
                        $('.qus').html(qusHtml);
                        var procedureName =  $('.procedure').find('li[itemid="'+prd_id+'"]').text();
                        $('.procedure').find('li[itemid="'+prd_id+'"]').addClass('purple whiteColor');
                        $('.procedureName').text(procedureName);
                    }
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
    
    $('.resource').click(function(){
        var prd_id = $('.purple').attr('itemid');
    })
    
    
})