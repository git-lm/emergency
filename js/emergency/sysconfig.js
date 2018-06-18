$(function(){
    $('.logoedit').click(function(){
        var url = $('input[name="url"]').val();
        if($.trim(url) ==''){
            parent.layer.open({
                content: '请选择LOGO',
                yes: function () {
                    parent.layer.closeAll();
                }
            })   
            return;
        }
        var index = layer.load(1,{
            shade: [0.5,'#000']
        })
        $('#logoedit').ajaxSubmit({
            success: function (data) {
                $.showMsg(data);
                $('#logoedit').resetForm(); // 提交后重置表单
            },
            type: "post"
        });
    })
    
    //新增账号
    $('.user-add').click(function(){
        var html = '<form action="'+base+'sysconfig/userAdd" method="post" id="user-add" enctype="multipart/form-data">'
        +'<div class="col-md-12">'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">姓名：</label>'
        +'<div class="col-sm-8">'
        +'<input name="nickname" class="form-control" placeholder="请输入姓名" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">账号：</label>'
        +'<div class="col-sm-8">'
        +'<input name="username" class="form-control" placeholder="请输入账号" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">密码：</label>'
        +'<div class="col-sm-8">'
        +'<input name="password" class="form-control" placeholder="请输入密码" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">账号类型：</label>'
        +'<div class="col-sm-8">'
        +' <select class="form-control" name="type">'
        +'<option value="0">请选择账号类型</option>'
        +'<option value="1">管理员</option>'
        +'<option value="2">教师</option>'
        +'<option value="3">领导</option>'
        +'</select>'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">头像：</label>'
        +'<div class="col-sm-8">'
        +'<input name="photo" class="form-control" type="file">'
        +'</div>'
        +'</div>'
        +'</div>'
        +' <span class="help-block m-b-none" style="color:red"></span>'
        +'<form>';
        parent.layer.open({
            area: '450px',
            title: '修改流程事件索引',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var name = $$('input[name="nickname"]').val()
                var username = $$('input[name="username"]').val()
                var password = $$('input[name="password"]').val()
                var photo = $$('input[name="photo"]').val()
                var type = $$('select[name="type"]').val()
                if($.trim(name) =='' || $.trim(username) =='' || $.trim(password) =='' ||$.trim(photo) ==''||$.trim(type) ==''||$.trim(type) =='0'){
                    $$('.help-block').html('不能为空');
                    return;
                }
                var index = layer.load(1,{
                    shade: [0.5,'#000']
                })
                $$('#user-add').ajaxSubmit({
                    success: function (data) {
                        $.showMsg(data);
                    },
                    type: "post"
                });
            },
            btn2:function(){
                parent.layer.closeAll();
            }
        });
    })
    //编辑账号
    $('.user-edit').click(function(){
        var uid = $(this).attr('itemid');
        $.post(base+'sysconfig/getUser',{
            'uid':uid
        },function(data){
            var obj = eval('('+data+')');
            if(obj.state =='ok'){
               
                var html = '<form action="'+base+'sysconfig/userEdit" method="post" id="user-edit" enctype="multipart/form-data">'
                +'<div class="col-md-12">'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">姓名：</label>'
                +'<div class="col-sm-8">'
                +'<input name="nickname" value="'+obj.msg['name']+'" class="form-control" placeholder="请输入姓名" type="text">'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">更换头像：</label>'
                +'<div class="col-sm-8">'
                +'<input name="photo" class="form-control" type="file">'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">头像展示：</label>'
                +'<div class="col-sm-8">'
                +'<p class="form-control-static"><a target="_blank" href="'+base+obj.msg['photo']+'">点击查看</a></p>'
                +'</div>'
                +'</div>'
                +'</div>'
                +' <span class="help-block m-b-none" style="color:red"></span>'
                +'<input name="uid" value="'+uid+'" type="hidden">'
                +'<form>';
                parent.layer.open({
                    area: '450px',
                    title: '修改流程事件索引',
                    shadeClose: false, //开启遮罩关闭
                    content: html,
                    btn: ['确认', '取消'],
                    yes: function (index, layero) {
                        var name = $$('input[name="nickname"]').val()
                        if($.trim(name) =='' ){
                            $$('.help-block').html('姓名不能为空');
                            return;
                        }
                        var index = layer.load(1,{
                            shade: [0.5,'#000']
                        })
                        $$('#user-edit').ajaxSubmit({
                            success: function (data) {
                                $.showMsg(data);
                            },
                            type: "post"
                        });
                    },
                    btn2:function(){
                        parent.layer.closeAll();
                    }
                });
            }else{
                $.showMsg(data);
            }
        })
        
    })
    //删除账号
    $('.user-del').click(function(){
        var uid = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除？', {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $.post(base + 'sysconfig/userDel', {
                'uid': uid
            }, function (data) {
                $.showMsg(data);
            })
        });
    })
    
    //账号  重置密码
    $('.user-reset').click(function(){
        var uid = $(this).attr('itemid');
        parent.layer.confirm('您确定要重置密码？', {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            var index = layer.load(1,{
                shade: [0.5,'#000']
            })
            $.post(base + 'sysconfig/userReset', {
                'uid': uid
            }, function (data) {
                $.showMsg(data);
            })
        });
    })
})