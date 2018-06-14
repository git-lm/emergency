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
        $.post(base + 'frontPublic/loginCheckTeacher', {
            'username': username,
            'password': password
        }, function (data) {
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
        $.post(base + 'frontPublic/loginCheckGroup', {
            'username': username,
            'password': password
        }, function (data) {
            $.showMsg(data, base + 'student.html');
        }, 'json');
    })

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
    console.log(e.data);
   
}
// 提交对话
function onSubmit(g_id, content) {
    ws.send(content);
}
// 发言  展示到推演框中
function say(groupName,content){
    alert()
}