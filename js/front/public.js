/*
 * 前端 公共类
 */
$(function(){
    $('.loginSubmit').click(function(){
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        if(username =='' || password ==''){
            $('.check').html('请完整填写信息');
            return;
        }
        $.post(base+'frontPublic/loginCheckTeacher',{
            'username':username,
            'password':password
        },function(data){
            $.showMsg(data,base+'teacher.html');
        });
    })
    
})