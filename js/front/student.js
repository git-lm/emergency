$(function () {
    //获取课程信息
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
        //            $('.vises').html('<iframe height="' + visesHeight + '" width="' + visesWidth + '"  src="' + base + process.material + '"></iframe> ');
        }
        //获取小组所有问题
        var problems = data.problems;
        var questionsHtml = '';
        if (problems != '') {
            for (var i = 0; i < problems.length; i++) {
                questionsHtml += '<li>' + problems[i].title + '</li>';
            }
        } else {
            questionsHtml += '<li>无问题</li>';
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
            relevantsHtml += '<div>无相关案例</div>';
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
            eventsHtml += '<div>无相关事件案例</div>';
        }
        $('.events div').html(eventsHtml);
        //获取小组所有相关素材
        var materials = data.materials;
        var materialsHtml = '';
        if (materials != '') {
            for (var i = 0; i < materials.length; i++) {
                materialsHtml += '<div class="sc" itemid="' + materials[i].id + '">' + materials[i].title + '</div>';
            }
        } else {
            materialsHtml += '<div>无素材</div>';
        }
        $('.materials div').html(materialsHtml);
    }, 'json')
    
    
    $(document).on('click' , 'div .sc' ,function(){
        var m_id = $(this).attr('itemid');
        $.post(base +'student/getStudentMaterial',{
            'm_id':m_id
        },function(data){
            if(data.state == 'ok'){
                layer.open({
                    type: 2,
                    title: false,
                    area: ['630px', '360px'],
                    shade: 0.8,
                    closeBtn: 0,
                    shadeClose: true,
                    content: data.msg.url
                });
            }else{
                layer.msg(data.msg);
            }
        },'json')
    })
    
    //页面加载完成后加载scoket
//    connect();
})

