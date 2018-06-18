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
        var index = layer.load(1,{
            shade: [0.5,'#000']
        })
        $.post(base + "login/userLogin", {
            "username": username, 
            "password": password
          
        }, function (data) {
            if (data.state == "ok") {
                window.location.href = base + 'welcome.html';
              
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
    
    $('.logout').click(function(){
        window.location.href = base + 'login/loginout.html';
        
    })
    
    

})