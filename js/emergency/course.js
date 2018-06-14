$(function(){
    //    $('.course-info').on('click',function(){
    //        $('.btn-primary-info').text($(this).text());
    //        $('.btn-primary-info').parent().attr('class', function (i, cls) {
    //            return cls.replace(/add\w+/g, '');
    //        });
    //        $('.btn-primary-info').parent().addClass('add'+$(this).attr('itemtype'));
    //    })
    //新增课程
    $('.course-add').on('click',function(){
        var html = '<label class="col-sm-4 control-label">课程名称：</label>'
        + '<div class="col-sm-8">'
        + '<input  class="form-control" value="" name="title" placeholder="请输入课程名称" type="text">'
        + '<span class="help-block m-b-none"></span>'
        + '</div>';
        parent.layer.open({
            area: '450px',
            title: '新增课程名称',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var title = $$('input[name="title"]').val()
                $.post(base+'course/courseAdd',{
                    'title':title
                },function(data){
                    $.showMsg(data);
                });
            },
            btn2:function(){
                parent.layer.closeAll();
            }
        });
    })
    
    //修改课程名称
    
    $('.course-edit').on('click',function(){
        var title = $(this).parent().parent().find('.course-title').text().replace(/"/g,'&quot;');
        var cid = $(this).attr('itemid');
        var html = '<label class="col-sm-4 control-label">课程名称：</label>'
        + '<div class="col-sm-8">'
        + '<input  class="form-control" value="'+title+'" name="title" placeholder="请输入课程名称" type="text">'
        + '<span class="help-block m-b-none"></span>'
        + '</div>';
        parent.layer.open({
            area: '450px',
            title: '修改课程名称',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var title = $$('input[name="title"]').val()
                $.post(base+'course/courseEdit',{
                    'title':title,
                    'cid':cid
                },function(data){
                    $.showMsg(data);
                });
            },
            btn2:function(){
                parent.layer.closeAll();
            }
        
        });
    
    })
    
    //精品推荐
    $('.course-elite').click(function(){
        var cid = $(this).attr('itemid');
        var type = $(this).attr('itemtype');
        if(type == 1){
            var con = '您确定要推荐？';
        }else{
            var con = '您确定要取消推荐？';
        }
        layer.confirm(con, {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $.post(base + 'course/course_elite', {
                'cid': cid,
                'type':type
            }, function (data) {
                $.showMsg(data);
            })
        });
    })
    
    //新增教学流程
    $('.addprocedures').on('click',function(){
        var cid = $(this).attr('itemid');
        var html = '<label class="col-sm-4 control-label">教学流程名称：</label>'
        + '<div class="col-sm-8">'
        + '<input  class="form-control" value="" name="title" placeholder="请输入教学流程名称" type="text">'
        + '<span class="help-block m-b-none"></span>'
        + '</div>';
        parent.layer.open({
            area: '450px',
            title: '新增教学流程',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var title = $$('input[name="title"]').val()
                $.post(base+'course/courseInfo_proceduresAdd',{
                    'title':title,
                    'cid':cid
                },function(data){
                    $.showMsg(data);
                });
            },
            btn2:function(){
                parent.layer.closeAll();
            }
        });
    })
    
    //修改课程流程
    $('.procedures-edit').on('click',function(){
        var pid = $(this).attr('itemid');
        var cid = $(this).attr('itemcode');
        var title = $(this).parent().parent().find('.procedures-title').text().replace(/"/g,'&quot;');
        var html = '<label class="col-sm-4 control-label">教学流程名称：</label>'
        + '<div class="col-sm-8">'
        + '<input  class="form-control" value="'+title+'" name="title" placeholder="请输入教学流程名称" type="text">'
        + '<span class="help-block m-b-none"></span>'
        + '</div>';
        parent.layer.open({
            area: '450px',
            title: '修改教学流程',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var title = $$('input[name="title"]').val()
                $.post(base+'course/courseInfo_proceduresEdit',{
                    'title':title,
                    'cid':cid,
                    'pid':pid
                },function(data){
                    $.showMsg(data);
                });
            },
            btn2:function(){
                parent.layer.closeAll();
            }
        });
    })
    
    
    //删除课程流程
    $('.procedures-del').on('click',function(){
        var pid = $(this).attr('itemid');
        var cid = $(this).attr('itemcode');
        parent.layer.confirm('您确定要删除？', {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $.post(base + 'course/courseInfo_proceduresDel', {
                'cid': cid,
                'pid':pid
            }, function (data) {
                $.showMsg(data);
            })
        });
    })
    
    //新增流程事件索引
    $('.process-add').on('click',function(){
        var pid = $(this).attr('itemid');   //流程ID
        var html = '<form action="'+base+'course/processAdd" method="post" id="process-add" enctype="multipart/form-data"><div class="col-md-12">'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">教学索引：</label>'
        +'<div class="col-sm-8">'
        +'<input name="indexes" class="form-control" placeholder="请输入教学索引" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">事件注入：</label>'
        +'<div class="col-sm-8">'
        +'<input name="injection" class="form-control" placeholder="请输入事件注入" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">素材展示：</label>'
        +'<div class="col-sm-8">'
        +'<input name="material" class="form-control" type="file">'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<input name="pid" value="'+pid+'" type="hidden">'
        +'<form>';
        parent.layer.open({
            area: '450px',
            title: '新增流程事件索引',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var indexes = $$('input[name="indexes"]').val()
                var injection = $$('input[name="injection"]').val()
                if($.trim(indexes) =='' || $.trim(indexes) =='injection'){
                    parent.layer.open({
                        content: '不能全为空',
                        yes: function (index1) {
                            parent.layer.close(index1);
                        }
                    })
                    return;
                }
                $$('#process-add').ajaxSubmit({
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
    
    
    //编辑教学索引
    $('.process-edit').click(function(){
        var pid = $(this).attr('itemid'); //索引ID
        $.post(base+'course/getProcess',{
            'pid':pid
        },function(data){
            var obj = eval('('+data+')');
            if(obj.state =='ok'){
                var html = '<form action="'+base+'course/processEdit" method="post" id="process-add" enctype="multipart/form-data"><div class="col-md-12">'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">教学索引：</label>'
                +'<div class="col-sm-8">'
                +'<input name="indexes" value="'+obj.msg['indexes']+'" class="form-control" placeholder="请输入教学索引" type="text">'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">事件注入：</label>'
                +'<div class="col-sm-8">'
                +'<input name="injection" value="'+obj.msg['injection']+'" class="form-control" placeholder="请输入事件注入" type="text">'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">素材上传：</label>'
                +'<div class="col-sm-8">'
                +'<input name="material" class="form-control" type="file">'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">素材展示：</label>'
                +'<div class="col-sm-8">'
                +'<p class="form-control-static"><a target="_blank" href="'+base+obj.msg['material']+'">'+obj.msg['material_name']+'</a></p>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'<input name="pid" value="'+pid+'" type="hidden">'
                +'<form>';
                parent.layer.open({
                    area: '450px',
                    title: '修改流程事件索引',
                    shadeClose: false, //开启遮罩关闭
                    content: html,
                    btn: ['确认', '取消'],
                    yes: function (index, layero) {
                        var indexes = $$('input[name="indexes"]').val()
                        var injection = $$('input[name="injection"]').val()
                        if($.trim(indexes) =='' && $.trim(indexes) =='injection'){
                            parent.layer.open({
                                content: '不能全为空',
                                yes: function (index1) {
                                    parent.layer.close(index1);
                                }
                            })
                            return;
                        }
                        $$('#process-add').ajaxSubmit({
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
    
    //新增小组
    $('.addgroups').click(function(){
        var cid = $(this).attr('itemid');   //课程ID
        var html = '<div class="form-group">'
        +'<label class="col-sm-4 control-label">小组名称：</label>'
        +'<div class="col-sm-8">'
        +'<input name="name" class="form-control" placeholder="请输入小组名称" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">小组账号：</label>'
        +'<div class="col-sm-8">'
        +'<input name="username" class="form-control" placeholder="请输入小组账号" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">小组密码：</label>'
        +'<div class="col-sm-8">'
        +'<input name="password" class="form-control" placeholder="请输入小组密码" type="text">'
        +'</div>'
        +'</div>'
        parent.layer.open({
            area: '450px',
            title: '新增小组',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var name = $$('input[name="name"]').val()
                var username = $$('input[name="username"]').val()
                var password = $$('input[name="password"]').val()
                if($.trim(name) =='' || $.trim(username) =='' || $.trim(password) ==''){
                    parent.layer.open({
                        content: '请完整填写小组信息',
                        yes: function (index1) {
                            parent.layer.close(index1);
                        }
                    })
                    return;
                }
                $.post(base + 'course/groupsAdd', {
                    'name': name,
                    'username':username,
                    'password':password,
                    'cid':cid
                }, function (data) {
                    $.showMsg(data);
                })
                
            },
            btn2:function(){
                parent.layer.closeAll();
            }
        });
    })
    
    //修改小组
    $('.groups-edit').click(function(){
        var gid = $(this).attr('itemid');   //小组ID
        var name = $('.group-name').text();
        var username =$(this).parent().parent().find('.group-username').text().replace(/"/g,'&quot;');
        var password = $(this).parent().parent().find('.group-password').text().replace(/"/g,'&quot;');
        var html = '<div class="form-group">'
        +'<label class="col-sm-4 control-label">小组名称：</label>'
        +'<div class="col-sm-8">'
        +'<input name="name" value="'+name+'" class="form-control" placeholder="请输入小组名称" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">小组账号：</label>'
        +'<div class="col-sm-8">'
        +'<input name="username" value="'+username+'" class="form-control" placeholder="请输入小组账号" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">小组密码：</label>'
        +'<div class="col-sm-8">'
        +'<input name="password" value="'+password+'" class="form-control" placeholder="请输入小组密码" type="text">'
        +'</div>'
        +'</div>'
        parent.layer.open({
            area: '450px',
            title: '新增小组',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var name = $$('input[name="name"]').val()
                var username = $$('input[name="username"]').val()
                var password = $$('input[name="password"]').val()
                if($.trim(name) =='' || $.trim(username) =='' || $.trim(password) ==''){
                    parent.layer.open({
                        content: '请完整填写小组信息',
                        yes: function (index1) {
                            parent.layer.close(index1);
                        }
                    })
                    return;
                }
                $.post(base + 'course/groupsEdit', {
                    'name': name,
                    'username':username,
                    'password':password,
                    'gid':gid
                }, function (data) {
                    $.showMsg(data);
                })
                
            },
            btn2:function(){
                parent.layer.closeAll();
            }
        });
    })
    
    //删除小组
    $('.groups-del').click(function(){
        var gid = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除？', {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $.post(base + 'course/groupsDel', {
                'gid': gid
            }, function (data) {
                $.showMsg(data);
            })
        });
    })
    
    //新增资源素材
    $('.addmaterial').click(function(){
        var cid = $(this).attr('itemid'); //课程ID
        
        var html = '<form action="'+base+'course/materialAdd" method="post" id="materials-add" enctype="multipart/form-data">'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">资源名称：</label>'
        +'<div class="col-sm-8">'
        +'<input name="name" class="form-control" placeholder="请输入资源名称" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">资源类型：</label>'
        +'<div class="col-sm-8">'
        +' <select class="form-control" name="type">'
        +'<option value="0">请选择资源类型</option>'
        +'<option value="1">视频</option>'
        +'<option value="2">图片</option>'
        +'<option value="3">PPT</option>'
        +'<option value="4">文档</option>'
        +'<option value="5">其他</option>'
        +'</select>'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">资源上传：</label>'
        +'<div class="col-sm-8">'
        +'<input name="url" class="form-control" type="file">'
        +'</div>'
        +'</div>'
        +'<input name="c_id" value="'+cid+'" type="hidden">'
        +'<form>';
        parent.layer.open({
            area: '450px',
            title: '修改流程事件索引',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var indexes = $$('input[name="indexes"]').val()
                var injection = $$('input[name="injection"]').val()
                if($.trim(indexes) =='' && $.trim(indexes) =='injection'){
                    parent.layer.open({
                        content: '不能全为空',
                        yes: function (index1) {
                            parent.layer.close(index1);
                        }
                    })
                    return;
                }
                $$('#materials-add').ajaxSubmit({
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
    
    //编辑教学索引
    $('.material-edit').click(function(){
        var mid = $(this).attr('itemid'); //索引ID
        $.post(base+'course/getMaterial',{
            'mid':mid
        },function(data){
            var obj = eval('('+data+')');
            if(obj.state =='ok'){
                var select0 ='';
                var select1 ='';
                var select2 ='';
                var select3 ='';
                var select4 ='';
                var select5 ='';
                if(obj.msg['type'] == 1){
                    select1 ='selected="selected"';
                }else if(obj.msg['type'] == 2){
                    select2 ='selected="selected"';
                }else if(obj.msg['type'] == 3){
                    select3 ='selected="selected"';
                }else if(obj.msg['type'] == 4){
                    select4 ='selected="selected"';
                }else if(obj.msg['type'] == 5){
                    select5 ='selected="selected"';
                }else{
                    select0 ='selected="selected"';
                }
                var html = '<form action="'+base+'course/materialEdit" method="post" id="process-add" enctype="multipart/form-data"><div class="col-md-12">'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">素材名称：</label>'
                +'<div class="col-sm-8">'
                +'<input name="name" value="'+obj.msg['name']+'" class="form-control" placeholder="请输入素材名称" type="text">'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">素材类型：</label>'
                +'<div class="col-sm-8">'
                +' <select class="form-control" name="type">'
                +'<option '+select0+' value="0">请选择资源类型</option>'
                +'<option '+select1+' value="1">视频</option>'
                +'<option '+select2+' value="2">图片</option>'
                +'<option '+select3+' value="3">PPT</option>'
                +'<option '+select4+' value="4">文档</option>'
                +'<option '+select5+' value="5">其他</option>'
                +'</select>'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">素材上传：</label>'
                +'<div class="col-sm-8">'
                +'<input name="url" class="form-control" type="file">'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">素材展示：</label>'
                +'<div class="col-sm-8">'
                +'<p class="form-control-static"><a target="_blank" href="'+base+obj.msg['url']+'">'+obj.msg['title']+'</a></p>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'<input name="mid" value="'+mid+'" type="hidden">'
                +'<form>';
                parent.layer.open({
                    area: '450px',
                    title: '修改流程事件索引',
                    shadeClose: false, //开启遮罩关闭
                    content: html,
                    btn: ['确认', '取消'],
                    yes: function (index, layero) {
                        var indexes = $$('input[name="indexes"]').val()
                        var injection = $$('input[name="injection"]').val()
                        if($.trim(indexes) =='' && $.trim(indexes) =='injection'){
                            parent.layer.open({
                                content: '不能全为空',
                                yes: function (index1) {
                                    parent.layer.close(index1);
                                }
                            })
                            return;
                        }
                        $$('#process-add').ajaxSubmit({
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
    
    //删除小组
    $('.material-del').click(function(){
        var mid = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除？', {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $.post(base + 'course/materialDel', {
                'mid': mid
            }, function (data) {
                $.showMsg(data);
            })
        });
    })
    
    //新增事件叠加
    $('.addevents').on('click',function(){
        var cid = $(this).attr('itemid');
        var html = '<label class="col-sm-4 control-label">事件叠加名称：</label>'
        + '<div class="col-sm-8">'
        + '<input  class="form-control" value="" name="title" placeholder="请输入事件叠加名称" type="text">'
        + '<span class="help-block m-b-none"></span>'
        + '</div>';
        parent.layer.open({
            area: '450px',
            title: '新增教学流程',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var title = $$('input[name="title"]').val()
                $.post(base+'course/courseInfo_eventsAdd',{
                    'title':title,
                    'cid':cid
                },function(data){
                    $.showMsg(data);
                });
            },
            btn2:function(){
                parent.layer.closeAll();
            }
        });
    })
    //修改事件叠加
    $('.events-edit').on('click',function(){
        var eid = $(this).attr('itemid');
        var title = $(this).parent().parent().find('.events-title').text().replace(/"/g,'&quot;');
        var html = '<label class="col-sm-4 control-label">事件叠加名称：</label>'
        + '<div class="col-sm-8">'
        + '<input  class="form-control" value="'+title+'" name="title" placeholder="请输入教学流程名称" type="text">'
        + '<span class="help-block m-b-none"></span>'
        + '</div>';
        parent.layer.open({
            area: '450px',
            title: '修改教学流程',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var title = $$('input[name="title"]').val()
                $.post(base+'course/courseInfo_eventsEdit',{
                    'title':title,
                    'eid':eid
                },function(data){
                    $.showMsg(data);
                });
            },
            btn2:function(){
                parent.layer.closeAll();
            }
        });
    })
    
    //删除课程流程
    $('.events-del').on('click',function(){
        var eid = $(this).attr('itemid');
       
        parent.layer.confirm('您确定要删除？', {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $.post(base + 'course/courseInfo_eventsDel', {
                'eid': eid
            }, function (data) {
                $.showMsg(data);
            })
        });
    })
    
    //新增相关案例
    $('.problems-add').click(function(){
        var eId = $(this).attr('itemid');
        var html = '<form action="'+base+'course/problemsAdd" method="post" id="problems-add" enctype="multipart/form-data">'
        +'<div class="col-md-12">'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">问题名称：</label>'
        +'<div class="col-sm-8">'
        +'<input name="title" value="" class="form-control" placeholder="请输入问题名称" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">相关事件：</label>'
        +'<div class="col-sm-8">'
        +'<input name="relevant_url" class="form-control" type="file">'
        +'</div>'
        +'</div>'
        +'</div>'
        +' <span class="help-block m-b-none" style="color:red"></span>'
        +'<input name="eid" value="'+eId+'" type="hidden">'
        +'<form>';
        parent.layer.open({
            area: '450px',
            title: '新增事件叠加问题',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var title = $$('input[name="title"]').val();
                var relevant_url = $$('input[name="relevant_url"]').val();
                if($.trim(title) =='' || $.trim(relevant_url) ==''){
                    $$('.help-block').html('请完整填写');
                    return;
                }
                $$('#problems-add').ajaxSubmit({
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
    
    //修改事件叠加问题
    $('.problems-edit').click(function(){
        var eId = $(this).attr('itemid');
        $.post(base+'course/getProblems',{
            'eid':eId
        },function(data){
            var obj = eval('('+data+')');
            if(obj.state =='ok'){
                var html = '<form action="'+base+'course/problemsEdit" method="post" id="problems-edit" enctype="multipart/form-data">'
                +'<div class="col-md-12">'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">问题名称：</label>'
                +'<div class="col-sm-8">'
                +'<input name="title" value="'+obj.msg['title']+'" class="form-control" placeholder="请输入问题名称" type="text">'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">相关事件：</label>'
                +'<div class="col-sm-8">'
                +'<input name="relevant_url" class="form-control" type="file">'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">素材展示：</label>'
                +'<div class="col-sm-8">'
                +'<p class="form-control-static"><a target="_blank" href="'+base+obj.msg['relevant_url']+'">'+obj.msg['relevant_title']+'</a></p>'
                +'</div>'
                +'</div>'
                +'</div>'
                +' <span class="help-block m-b-none" style="color:red"></span>'
                +'<input name="eid" value="'+eId+'" type="hidden">'
                +'<form>';
                parent.layer.open({
                    area: '450px',
                    title: '新增事件叠加问题',
                    shadeClose: false, //开启遮罩关闭
                    content: html,
                    btn: ['确认', '取消'],
                    yes: function (index, layero) {
                        var title = $$('input[name="title"]').val();
                        
                        if($.trim(title) ==''){
                            $$('.help-block').html('请完整填写');
                            return;
                        }
                        $$('#problems-edit').ajaxSubmit({
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
    //删除事件叠加问题
    $('.problems-del').click(function(){
        var eid = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除？', {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $.post(base + 'course/problemsDel', {
                'eid': eid
            }, function (data) {
                $.showMsg(data);
            })
        });
    })
    
    //新增相关案例
    $('.addrelevants').click(function(){
        var cid = $(this).attr('itemid');
        var html = '<form action="'+base+'course/relevantsAdd" method="post" id="relevants-add" enctype="multipart/form-data">'
        +'<div class="col-md-12">'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">案例名称：</label>'
        +'<div class="col-sm-8">'
        +'<input name="title" value="" class="form-control" placeholder="请输入案例名称" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">案例简介：</label>'
        +'<div class="col-sm-8">'
        +'<textarea class="form-control" name="summary" style="min-height: 200px;min-width: 100%; margin-bottom: 10px;font-family: Monaco, Fixed"></textarea>'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-4 control-label">相关事件：</label>'
        +'<div class="col-sm-8">'
        +'<input name="event_url" class="form-control" type="file">'
        +'</div>'
        +'</div>'
        +'</div>'
        +' <span class="help-block m-b-none" style="color:red"></span>'
        +'<input name="cid" value="'+cid+'" type="hidden">'
        +'<form>';
        parent.layer.open({
            area: '450px',
            title: '新增事件叠加问题',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var title = $$('input[name="title"]').val();
                var event_url = $$('input[name="event_url"]').val();
                        
                if($.trim(title) =='' || $.trim(event_url) ==''){
                    $$('.help-block').html('请完整填写');
                    return;
                }
                $$('#relevants-add').ajaxSubmit({
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
    
    //编辑相关案例
    $('.relevant-edit').click(function(){
        var rId = $(this).attr('itemid');
        $.post(base+'course/getRelevant',{
            'rid':rId
        },function(data){
            var obj = eval('('+data+')');
            if(obj.state =='ok'){
                var html = '<form action="'+base+'course/relevantEdit" method="post" id="relevant-edit" enctype="multipart/form-data">'
                +'<div class="col-md-12">'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">案例名称：</label>'
                +'<div class="col-sm-8">'
                +'<input name="title" value="'+obj.msg['title']+'" class="form-control" placeholder="请输入案例名称" type="text">'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">案例简介：</label>'
                +'<div class="col-sm-8">'
                +'<textarea class="form-control" name="summary" style="min-height: 200px;min-width: 100%; margin-bottom: 10px;font-family: Monaco, Fixed">'+obj.msg['summary']+'</textarea>'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">相关事件：</label>'
                +'<div class="col-sm-8">'
                +'<input name="relevant_url" class="form-control" type="file">'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-4 control-label">素材展示：</label>'
                +'<div class="col-sm-8">'
                +'<p class="form-control-static"><a target="_blank" href="'+base+obj.msg['event_url']+'">'+obj.msg['event_name']+'</a></p>'
                +'</div>'
                +'</div>'
                +'</div>'
                +' <span class="help-block m-b-none" style="color:red"></span>'
                +'<input name="rId" value="'+rId+'" type="hidden">'
                +'<form>';
                parent.layer.open({
                    area: '450px',
                    title: '新增事件叠加问题',
                    shadeClose: false, //开启遮罩关闭
                    content: html,
                    btn: ['确认', '取消'],
                    yes: function (index, layero) {
                        var title = $$('input[name="title"]').val();
                        
                        if($.trim(title) ==''){
                            $$('.help-block').html('请完整填写');
                            return;
                        }
                        $$('#relevant-edit').ajaxSubmit({
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
    //删除相关案例
    $('.relevant-del').click(function(){
        var rid = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除？', {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $.post(base + 'course/relevantDel', {
                'rid': rid
            }, function (data) {
                $.showMsg(data);
            })
        });
    })
})