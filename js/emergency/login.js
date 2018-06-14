$(function () {
    $(".login").click(function () {
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
               
        if (username == "") {
            parent.layer.open({
                content: "请输入用户名"
            });
            return false;
        }
        if (password == "") {
            parent.layer.open({
                content: "请输入密码"
            });
            return false;
        }
        $.post(base + "login/userLogin", {
            "username": username, 
            "password": password
          
        }, function (data) {
            if (data.state == "ok") {
                window.location.href = base + 'metal.html';
              
            } else if(data.state == "no"){
                parent.layer.open({
                    content: data.msg
                })
                return false; 
            }else{
                layer.open({
                    content: '登录失败'
                })
                return false; 
            }
        },'json')

    })

})