/*
 * 前端 公共类
 */
$(function () {
    $('.loginTeacherSubmit').click(function () {
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        if (username == '' || password == '') {
            $('.check').html('请完整填写信息');
            return;
        }
        var index = layer.load(1,{
            shade: [0.5,'#000']
        })
        $.post(base + 'frontPublic/loginCheckTeacher', {
            'username': username,
            'password': password
        }, function (data) {
            layer.close(index); 
            $.showMsg(data, base + 'teacher.html');
        }, 'json');
    })
    $('.loginGroupSubmit').click(function () {
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        if (username == '' || password == '') {
            $('.check').html('请完整填写信息');
            return;
        }
        var index = layer.load(1,{
            shade: [0.5,'#000']
        })
        $.post(base + 'frontPublic/loginCheckGroup', {
            'username': username,
            'password': password
        }, function (data) {
            layer.close(index);
            if(data.state = 'ok'){
                $.showMsg(data, base + 'student.html');
            }else{
                layer.msg(data.msg);
            }
            
        }, 'json');
    })
    
    $(document).on('click','.showGroupChat li',function(){
        $('.showGroupChat li').removeClass('cur');
        $(this).addClass('cur');
        var g_id = $(this).attr('itemid');
        var index = layer.load(1,{
            shade: [0.5,'#000']
        })
        $.post(base + 'frontPublic/getGroupChats',{
            'g_id':g_id
        },function(data){
            layer.close(index); 
            if(data.state == 'ok'){
                var chats = data.msg;
                var chatHtml = '';
                for (var i = 0; i < chats.length; i++) {
                    chatHtml +=   chats[i].content +chats[i].add_time+'\r\n';
                }
                $('textarea[name="groupChat"]').html(chatHtml);
            }else{
                layer.msg(data.msg);
            }
           
            
        },'json')
    })
    //输入框输入@时的事件
    $('textarea[name="chatCon"]').on('input propertychange', function(e){

        var content = $('textarea[name="chatCon"]').val();
        console.log(content);
        console.log(content.indexOf('@') );
        var last = content.substr(content.length-1,1)
        if(content.indexOf('@') >= 0 && last == '@'){
            $('.man_list').show();
        }else{
            $('.man_list').hide();
        }
    });
    //选择学员或者教师
    $(document).on('click','.man_list ul li',function(){
        var content = $('textarea[name="chatCon"]').val();
        var gName = $(this).text();
        var g_id = $(this).attr('itemid');
        $('textarea[name="chatCon"]').val(content+gName);
        $('input[name="to_u_id"]').val(g_id);
    })
    
    //发送信息
    $('.chatSend').click(function(){
       
        var content = $('textarea[name="chatCon"]').val();
        var source = $('input[name="source"]').val();
        if(content.indexOf('@') >= 0 ){
            var to_u_id =  $('input[name="to_u_id"]').val();
        }else{
            var to_u_id =  0;
        }
        if(content !='' || content !=undefined){
            var index = layer.load(1,{
                shade: [0.5,'#000']
            })
            $.post(base +'metal/setMessages',{
                'content':content,
                'to_u_id':to_u_id,
                'source':source
            },function(data){
                layer.close(index); 
                if(data.state == 'ok'){
                    layer.msg(data.msg);
                    $('textarea[name="chatCon"]').val('');
                    $('input[name="to_g_id"]').val(0);
                }else{
                    layer.msg(data.msg);
                }
            },'json')
        }
        
    })
    
    connect();
})

function connect() {
    // 创建websocket
    ws = new WebSocket("ws://"+document.domain+":8282");
   
    ws.onmessage = onmessage; 
    ws.onclose = function() {
        console.log("连接关闭，定时重连");
        connect();
    };
    ws.onerror = function() {
        console.log("出现错误");
    };
}
function onmessage(e)
{
  
    var json = eval('('+e.data+')');
    if(json.type == 'login'){
        //如果是登录则绑定uid
        
        $.post(base +'metal/bindUid',{
            client_id:json.client_id
        });
        //赋值给
        $('input[name="client_id"]').val(json.client_id);
    }else if(json.type == 'gLogin'){
        $('.lesson[itemid="'+json.g_id+'"]').css('color','red');
        layer.open({
            type:1,
            title: '登录信息',
            area: ['200px', '200px'],
            time:15000,
            shade:0,
            anim: 2,
            content :json.g_name,
            offset: 'rb'
        });
    }else if(json.type == 'end'){
      
        $('.student .dp').show();
        layer.alert('课程已结束，请各小组点评')
    }else if(json.type =='message'){
        say(json.name , json.content);
    }else if(json.type =='oneMessage'){
        layer.open({
            type:1,
            title: '您有新的消息',
            area: ['200px', '200px'],
            time:15000,
            shade:0,
            anim: 2,
            content :json.content,
            offset: 'rb'
        });
    }else if(json.type =='resource'){
        var visesHeight = $('.vises').height();
        var visesWidth = $('.vises').width();
        $('.vises').html('<iframe height="' + visesHeight + '" width="' + visesWidth + '"  src="' + base + json.url + '"></iframe> ');
    }else if(json.type =='event'){
        var eventsHtml = '<div class="sj" itemid="' + json.e_id + '">' + json.title + '</div>';
        $('.events .showEvent').prepend(eventsHtml);
        $('.events .noEvent').remove();
        layer.open({
            type:1,
            title: '事件案例',
            area: ['200px', '200px'],
            time:15000,
            shade:0,
            anim: 2,
            content :json.title,
            offset: 'rb'
        });
    }else if(json.type =='problem'){
        var problemHtml = '<li  style="display: list-item;" itemid="'+json.p_id+'">'+json.title+'</li>';
        $('.questions').prepend(problemHtml);
        $('.questions .noProblem').remove();
        layer.open({
            type:1,
            title: '相关问题',
            area: ['200px', '200px'],
            time:15000,
            shade:0,
            anim: 2,
            content :json.title,
            offset: 'rb'
        });
    }else if(json.type =='material'){
        var eventsHtml = '<div class="sc" itemid="' + json.m_id + '">' + json.title + '</div>';
        $('.materials .showMaterials').prepend(eventsHtml);
        $('.materials .noMaterial').remove();
        layer.open({
            type:1,
            title: '相关素材',
            area: ['200px', '200px'],
            time:15000,
            shade:0,
            anim: 2,
            content :json.title,
            offset: 'rb'
        });
    }
   
}


// 发言  展示到推演框中
function say(name,content){
    
    
    $('.show_chat').prepend('<div class="L_chat chat">'
        +'<span class="mc">'+name+':</span><br />'+content+''
        +'</div>');
}

