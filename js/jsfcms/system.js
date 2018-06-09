/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
    
    //系统配置修改提交
    $(".systemconfig").click(function(){
        var token=$.trim($("input[name='token']").val());
        var url=$.trim($("input[name='url']").val());
        var appID=$.trim($("input[name='appID']").val());
        var appSecret=$.trim($("input[name='appSecret']").val());
        var template1=$.trim($("input[name='template1']").val());
        var template2=$.trim($("input[name='template2']").val());
        var reminder=$.trim($("input[name='reminder']").val());
        var photo=$("input[name='photo']").val();
        if(token==""){
            layer.open({
                content:"令牌不能为空!"
            });
            return;
        }
        if(url==""){
            layer.open({
                content:"域名不能为空!"
            });
            return;
        }
        if(appID==""){
            layer.open({
                content:"AppId不能为空！"
            });
            return;
        }
        if(appSecret==""){
            layer.open({
                content:"appSecret不能为空！"
            });
            return;
        }
        if(template1==""){
            layer.open({
                content:"学员预约模版ID不能为空"
            });
            return;
        }
        if(template2==""){
            layer.open({
                content:"预约上课模版ID不能为空"
            });
            return;
        }
        if(reminder==""){
            layer.open({
                content:"取消提醒时间不能为空"
            });
            return;
        }
        $("#systemconfig").ajaxSubmit({
            type:"post",
            success:function(data){
                if(data=="ok"){
                    layer.open({
                        content:"保存成功",
                        yes:function(data){
                            parent.layer.closeAll();
                            window.location.reload();
                        }
                    })
                   
                }else{
                    layer.open({
                        content:"保存失败"
                    })
                }
            }
        })
    })
    
    //更新自动回复
    $(".upautoreply").click(function(){
        var content=$('#content').val();
        var attention=$("#attention").val();
        var birthday=$("#birthday").val();
        if(content==""){
            layer.open({
                content:"请填写自动回复内容！"
            })
            return;
        }
        if(attention==""){
            layer.open({
                content:"请填写关注内容！"
            })
            return;
        }
        if(birthday==""){
            layer.open({
                content:"请填写生日祝福内容！"
            })
            return;
        }
        $.post(base+"systemconfig/autoreply",$("#upautoreply").serialize(),function(data){
            if(data=="ok"){
                layer.open({
                    content:"保存成功",
                    yes:function(data){
                        parent.layer.closeAll();
                        window.location.reload();
                    }
                })
            }else{
                layer.open({
                    content:"保存失败"
                })
            }
            
        })
        
    })
    
    //新增权限
    $(".add_role").click(function(){
        var html='<div class="col-md-12">'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">'+'名称：</label>'+
        '<div class="col-sm-9">'+
        '<input name="name" class="form-control" placeholder="请输入名称" type="text">'+ 
        '</div>'+
        '</div>'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">备注：</label>'+
        '<div class="col-sm-9">'+
        '<input name="remark" class="form-control" placeholder="请输入备注" type="text">'+
        '</div></div></div>';       
        parent.layer.open({
            area: '550px',
            title: '新增权限',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes:function(data){
                var name=$$("input[name='name']").val();
                var remark=$$("input[name='remark']").val();
                if(name==""){
                    parent.layer.open({
                        content:"请输入名称"
                    })
                    return;
                }
                if(remark==""){
                    parent.layer.open({
                        content:"请输入备注"
                    })
                    return;
                }
                $.post(base+"systemconfig/add_role",{
                    "name":name,
                    "remark":remark
                },function(data){
                    if(data=="ok"){
                        parent.layer.open({
                            content:"新增成功",
                            yes:function(data){
                                parent.layer.closeAll();
                                window.location.reload();
                            }
                        })
                        
                    }else{
                        parent.layer.open({
                            content:"新增失败"
                        })
                        return;
                    }    
                    
                })
                
            },
				btn2:function(){
					parent.layer.closeAll();
				}
            
        })
    })
    
    //删除权限
    $('.del_role').click(function(){
        var id =$(this).attr("itemid");
        parent.layer.confirm("确定删除该权限吗？",{
            btn:["确定删除","考虑考虑"]
        },function(){
            $.post(base+"systemconfig/del_role",{
                "id":id
            },function(data){
                if(data=="ok"){
                    parent.layer.open({
                        content:"删除成功",
                        yes:function(data){
                            parent.layer.closeAll();
                            location.reload();
                        }
                    })
                }else{
                    parent.layer.open({
                        content:"删除失败"
                    })
                }
            })
        })
    })
    //编辑权限菜单
    $('.edit_menu').click(function(){
        var r_id=$(this).attr("itemid");
        parent.layer.open({
            type: 2,
            title: '编辑权限',
            shadeClose: true,
            shade: 0.8,
            area: ['600px', '600px'],
            content: 'systemconfig/edit_menu/'+r_id //iframe的url
        });
        
    })
    //编辑菜单操作
    $('.uprole').click(function(){
        var r_id=$(this).attr("itemid");
        $.post(base+"systemconfig/add_menu/"+r_id,$("#menu_role").serialize(),function(data){
            if(data=="ok"){
                layer.open({
                    content:"保存成功",
                    yes:function(data){
                        parent.layer.closeAll();
                        parent.location.reload();
                    }
                })
            }else{
                layer.open({
                    content:"保存失败"
                })
            }
        })
    })
    //新增合同模版
    $(".add_moban").click(function(){
        var html='<form id="addmoban" method="post" action="systemconfig/addmoban" enctype="multipart-formdatas">'+
        '<div class="col-md-12">'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">合同名称：</label>'+
        '<div class="col-sm-9">'+
        '<input name="mbname" class="form-control" placeholder="请输入名称" type="text"> '+
        '</div>'+
        '</div>'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">文件：</label>'+
        '<div class="col-sm-9">'+
        '<input name="moban_file" class="form-control" type="file">'+
        '</div>'+
        '</div>'+
        '</div></form>'
        parent.layer.open({
            area: '550px',
            title: '新增合同模版',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes:function(data){
                var mbname=$$("input[name='mbname']").val();
                var moban_file=$$("input[name='moban_file']").val();
                if(mbname==""){
                    parent.layer.open({
                        content:"请输入模版名称"
                    })
                    return;
                }
                if(moban_file==""){
                    parent.layer.open({
                        content:"请上传合同文件"
                    })
                    return;
                }
                //                console.log($('#addmoban'))
                $(parent.$('#addmoban')).ajaxSubmit({
                    type:"post",
                    success:function(data){
                        if(data=="ok"){
                            parent.layer.open({
                                content:"新增成功",
                                yes:function(){
                                    parent.layer.closeAll();
                                    window.location.reload();
                                }
                            })
                        }else{
                            parent.layer.open({
                                content:"新增失败"
                            }) 
                        }
                    }
                })
                
            },
				btn2:function(){
					parent.layer.closeAll();
				}
            
        })
    })
    
    //编辑模版
    $(".edit_moban").click(function(){
        var arr="";
        var m_id=$(this).attr('itemid');
        $.post(base+"systemconfig/search_moban",{
            "m_id":m_id
        },function(data){
            arr=$.parseJSON(data);
            var html='<form id="upmoban" method="post" action="systemconfig/upmoban/'+m_id+'" enctype="multipart-formdatas">'+
            '<div class="col-md-12">'+
            '<div class="form-group">'+
            '<label class="col-sm-3 control-label">合同名称：</label>'+
            '<div class="col-sm-9">'+
            '<input name="mbname" class="form-control" placeholder="请输入名称" type="text" value = "'+arr['mbname']+'"> '+
            '</div>'+
            '</div>'+
            '<div class="form-group">'+
            '<label class="col-sm-3 control-label">文件：</label>'+
            '<div class="col-sm-9">'+
            '<input name="moban_file" class="form-control" type="file" value= "">'+
            '</div>'+
            '</div>'+
            '</div></form>'
            parent.layer.open({
                area: '550px',
                title: '编辑合同模版',
                shadeClose: false, //开启遮罩关闭
				btn: ['确认', '取消'],
                content: html,
                yes:function(data){
                    var mbname=$$("input[name='mbname']").val();
                    var moban_file=$$("input[name='moban_file']").val();
                    if(mbname==""){
                        parent.layer.open({
                            content:"请输入模版名称"
                        })
                        return;
                    }
                    //                    if(moban_file==""){
                    //                        parent.layer.open({
                    //                            content:"请上传合同文件"
                    //                        })
                    //                        return;
                    //                    }
                
                    $(parent.$('#upmoban')).ajaxSubmit({
                        type:"post",
                        success:function(data){
                            if(data=="ok"){
                                parent.layer.open({
                                    content:"编辑成功",
                                    yes:function(){
                                        parent.layer.closeAll();
                                        window.location.reload();
                                    }
                                })
                            }else{
                                parent.layer.open({
                                    content:"编辑失败"
                                }) 
                            }
                        }
                    
                    })
                
                },
				btn2:function(){
					parent.layer.closeAll();
				}
            
            })
        })
        
    })
    
    //删除模版
    $('.del_moban').click(function(){
        var id =$(this).attr("itemid");
        parent.layer.confirm("确定删除该模版吗？",{
            btn:["确定删除","考虑考虑"]
        },function(){
            $.post(base+"systemconfig/del_moban",{
                "id":id
            },function(data){
                if(data=="ok"){
                    parent.layer.open({
                        content:"删除成功",
                        yes:function(data){
                            parent.layer.closeAll();
                            window.location.reload();
                        }
                    })
                }else{
                    parent.layer.open({
                        content:"删除失败"
                    })
                }
            })
        })
       
    })
    //下载合同
    $('.down_moban').click(function(){
        var m_id=$(this).attr('itemid');
        $.post(base+"systemconfig/search_moban",{
            "m_id":m_id
        },function(data){
            var arr=$.parseJSON(data);
            window.open(base+arr['mbaddress']);
        })
    })
    $('#username').change(function(){
        check_username()
            
    })
    //用户注册
    $(".register_one").click(function(){
        var username=$.trim($('input[name="username"]').val());
        var password=$.trim($('input[name="password"]').val());
        var againpassword=$.trim($('input[name="againpassword"]').val());
        var select_yg=$('select[name="select_yg"]').val();
        var select_role=$('select[name="select_role"]').val();
        if(username==""){
            parent.layer.open({
                content:"请输入用户名"
            })
            return;
        }
        if(check_username()==false){
            return;
        }
        if(password==""){
            parent.layer.open({
                content:"请输入密码"
            })
            return;
        }
        if(againpassword==""){
            parent.layer.open({
                content:"请输入确认密码"
            })
            return;
        }
        if(againpassword!=password){
            parent.layer.open({
                content:"密码输入不一致，请重新输入"
            })
            return;
        }
        if(select_yg==0){
            parent.layer.open({
                content:"请选择员工"
            })
            return;
        }
        if(select_role==0){
            parent.layer.open({
                content:"请选择权限"
            })
            return;
        }
        $.post(base+"systemconfig/register",$('#register_yh').serialize(),function(data){
            if(data=="ok"){
                parent.layer.open({
                    content:"创建用户成功",
                    yes:function(){
                        parent.layer.closeAll();
                        window.location.href=base+"systemconfig/cms_users";
                    }
                })
            }else{
                parent.layer.open({
                    content:"创建用户失败"
                })
            }
        })
        
    })
    
    //删除模版
    $('.del_user').click(function(){
        var id =$(this).attr("itemid");
        parent.layer.confirm("确定删除该用户吗？",{
            btn:["确定删除","考虑考虑"]
        },function(){
            $.post(base+"systemconfig/del_user",{
                "id":id
            },function(data){
                if(data=="ok"){
                    parent.layer.open({
                        content:"删除成功",
                        yes:function(data){
                            parent.layer.closeAll();
                            window.location.reload();
                        }
                    })
                }else{
                    parent.layer.open({
                        content:"删除失败"
                    })
                }
            })
        })
       
    })
    
    //新增用户
    $('.add_user').click(function(){
        window.location.href=base+"systemconfig/register";
        
    })
    //编辑角色
    $(".edit_user").click(function(){
        var yglist="";
        var qxlist="";
        var option_yg="";
        var option_qx="";
        var username=$(this).parent().parent().find("td").eq(1).text();
        var password=$(this).parent().parent().find("td").eq(2).text();
        var ygid=$(this).parent().parent().find("td").eq(3).attr('itemid');
        var qxid=$(this).parent().parent().find("td").eq(4).attr('itemid');
        var uid=$(this).parent().parent().find("td").eq(1).attr('itemid');
      
        //获取员工列表
        $.post(base+"systemconfig/check_yg",{},function(data){
            if(data=="no"){
                parent.layer.open({
                    content:"获取员工失败"
                });
            }else{
                yglist=$.parseJSON(data);
                for(var i = 0;i<yglist.length;i++){
                    var selected=""
                    if(ygid==yglist[i].id){
                        selected="selected"
                    }
                    option_yg+='<option '+selected+' value="'+yglist[i].id+'">'+yglist[i].yname+'</option>'
                }
                //获取权限列表
                $.post(base+"systemconfig/check_role",{},function(data){
                    if(data=="no"){
                        parent.layer.open({
                            content:"获取权限失败"
                        });
                    }else{
                        qxlist=$.parseJSON(data);
                    }
            
                    for(var i = 0;i<qxlist.length;i++){
                        var selected1=""
                        if(qxid==qxlist[i].id){
                            selected1="selected"
                        }
                        option_qx+='<option '+selected1+' value="'+qxlist[i].id+'">'+qxlist[i].name+'</option>'
                    }
                    var html='<div class="col-md-12">'+
                    '<div class="form-group">'+
                    '<label class="col-sm-3 control-label">用户名：</label>'+
                    '<div class="col-sm-9">'+
                    '<input name="dusername" id="dusername" class="form-control" placeholder="请输入用户名" type="text" value="'+username+'">'+
                    ' <span class="help-block m-b-none uname" ></span>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group">'+
                    '<label class="col-sm-3 control-label">密码：</label>'+
                    '<div class="col-sm-9">'+
                    '<input name="dpassword" id="dpassword" class="form-control" value="'+password+'" placeholder="请输入密码" type="text">'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group">'+
                    '<label class="col-sm-3 control-label">员工：</label>'+
                    '<div class="col-sm-9">'+
                    '<select class="form-control" name="dselectyg" id="dselectyg">'+
                    option_yg+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group">'+
                    '<label class="col-sm-3 control-label">权限：</label>'+
                    '<div class="col-sm-9">'+
                    '<select class="form-control" name="dselectqx" id="dselectqx">'+
                    option_qx+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                    parent.layer.open({
                        area: '550px',
                        title: '编辑用户',
                        shadeClose: false, //开启遮罩关闭
						btn: ['确认', '取消'],
                        content: html,
                        yes:function(data){
                            var username=$$("input[name='dusername']").val();
                            var password=$$("input[name='dpassword']").val();
                            var nickname=$$("select[name='dselectyg']").val();
                            var role=$$("select[name='dselectqx']").val();
                            $.post(base+"systemconfig/edit_user",{
                                "username":username,
                                "password":password,
                                "nickname":nickname,
                                "role":role,
                                "id":uid
                            },function(data){
                                if(data=="ok"){
                                    parent.layer.open({
                                        content:"编辑成功",
                                        yes:function(){
                                            parent.layer.closeAll();
                                            window.location.reload();
                                        }
                                    })
                                }else if(data=="hasu"){
                                    $$('.uname').text("用户名已重复");
                                }else{
                                    parent.layer.open({
                                        content:"编辑失败"
                                    }) 
                                }
                            })                
                        }
                    })
                })
            }
            
        })
    })
    
    $(".add_baoxiao").click(function(){
        var title=$('input[name="title"]').val();
        var price=$('input[name="price"]').val();
        var photo=$('input[name="photo"]').val();
        if(title==""){
            $('#titles').text("请输入报销名称");
            return
        }
        if(price==""){
            $('#prices').text("请输入报销价格");
            return
        }
        if(photo==""){
            $('#photos').text("请上传报销图片");
            return
        }
        $('#baoxiao_form').ajaxSubmit({
            type:"post",
            success:function(data){
                if(data=="ok"){
                    parent.layer.open({
                        content:"提交成功",
                        yes:function(data){
                            parent.layer.closeAll();
                            $('input[name="title"]').val("");
                            $('input[name="price"]').val("");
                            $('input[name="photo"]').val("");
                            window.location.reload();
                        }
                    })
                }else{
                    parent.layer.open({
                        content:"提交失败",
                        yes:function(data){
                            
                        }
                    })
                }
            }
        })
        
    })
    //审核报销
    $('.wait_del').click(function(){
        var id =$(this).attr("itemid");
        parent.layer.confirm("确定处理该条报销信息吗？",{
            btn:["通过处理","考虑考虑"]
        },function(){
            $.post(base+"systemconfig/end_baoxiao",{
                "id":id
            },function(data){
                if(data=="ok"){
                    parent.layer.open({
                        content:"处理成功",
                        yes:function(data){
                            parent.layer.closeAll();
                            window.location.reload();
                        }
                    })
                }else{
                    parent.layer.open({
                        content:"处理成功"
                    })
                }
            })
        })
        
    })
    
    $(".add_salary").click(function(){
        var r_id=$(this).attr("itemid");
        parent.layer.open({
            type: 2,
            title: '新增工资',
            shadeClose: false,
            shade: 0.8,
            area: ['600px', '800px'],
            content: 'systemconfig/add_salary' //iframe的url
        });
        
        
    })
    
    $(".ensure_salary").click(function(){
        var yg=$('select[name="selectyg"]').val();
        //        var tc=$('input[name="tc"]').val();
        //        var sj=$('input[name="sj"]').val();
        //        var kg=$('input[name="kg"]').val();
        var s_year=$('input[name="s_year"]').val();
        var s_month=$('select[name="s_month"]').val();
        var salary=$('input[name="salary"]').val();
        if(yg=="0"){
            parent.layer.open({
                content:"请选择员工"
            });
            return;
        }
        if(s_year==""){
            parent.layer.open({
                content:"请选择工资年份"
            });
            return;
        }
        if(s_month=="0"){
            parent.layer.open({
                content:"请选择工资月份"
            });
            return;
        }
        if(salary==""){
            parent.layer.open({
                content:"请输入实发金额"
            });
            return;
        }
        
        
        
        $.post(base+"systemconfig/add_salary",$("#add_salary").serialize(),function(data){
            if(data=="ok"){
                layer.open({
                    content:"保存成功",
                    yes:function(data){
                        $('select[name="selectyg"]').val("");
                        $('input[name="tc"]').val("");
                        $('input[name="sj"]').val("");
                        $('input[name="kg"]').val("");
                        $('input[name="salary"]').val("");
                        window.location.reload();
                    }
                })
            }else{
                layer.open({
                    content:"保存失败"
                })
            }
            
        })
        
    })
    //新增充值设置
    $(".add_recharge").click(function(){
        var html='<form id="recharge_add" method="post" action="systemconfig/add_recharge" enctype="multipart-formdatas">'+
        '<div class="col-md-12">'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">充值名称：</label>'+
        '<div class="col-sm-9">'+
        '<input name="name" class="form-control" placeholder="请输入充值名称" type="text"> '+
        '</div>'+
        '</div>'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">充值金额：</label>'+
        '<div class="col-sm-9">'+
        '<input name="money" class="form-control" placeholder="请输入充值金额" type="text"> '+
        '</div>'+
        '</div>'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">到账金额：</label>'+
        '<div class="col-sm-9">'+
        '<input name="all_money" class="form-control" placeholder="请输入到账金额" type="text"> '+
        '</div>'+
        '</div>'+
        '</div></form>'
        parent.layer.open({
            area: '550px',
            title: '新增充值设置',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes:function(data){
                var name=$$("input[name='name']").val();
                var money=$$("input[name='money']").val();
                var all_money=$$("input[name='all_money']").val();
                if(name==""){
                    parent.layer.open({
                        content:"请输入充值名称"
                    })
                    return;
                }
                if(money==""){
                    parent.layer.open({
                        content:"请上传充值金额"
                    })
                    return;
                }
                if(all_money==""){
                    parent.layer.open({
                        content:"请输入到账金额"
                    })
                    return;
                }
                //                console.log($('#addmoban'))
                $(parent.$('#recharge_add')).ajaxSubmit({
                    type:"post",
                    success:function(data){
                        if(data=="ok"){
                            parent.layer.open({
                                content:"新增成功",
                                yes:function(){
                                    parent.layer.closeAll();
                                    window.location.reload();
                                }
                            })
                        }else{
                            parent.layer.open({
                                content:"新增失败"
                            }) 
                        }
                    }
                })
                
            },
				btn2:function(){
					parent.layer.closeAll();
				}
            
        })
        
    })
    //编辑充值设置
    $('.edit_rechargeset').click(function(){
        
        var arr="";
        var id=$(this).attr('itemid');
        var name=$(this).parent().parent().find('td').eq(1).text();
        var money=$(this).parent().parent().find('td').eq(2).text();
        var all_money=$(this).parent().parent().find('td').eq(3).text();
        var html='<form id="rechargeset_edit" method="post" action="systemconfig/edit_rechargeset/'+id+'" enctype="multipart-formdatas">'+
        '<div class="col-md-12">'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">充值名称：</label>'+
        '<div class="col-sm-9">'+
        '<input name="name" class="form-control" placeholder="请输入充值名称" value="'+name+'" type="text"> '+
        '</div>'+
        '</div>'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">充值金额：</label>'+
        '<div class="col-sm-9">'+
        '<input name="money" class="form-control" placeholder="请输入充值金额" value="'+money+'" type="text"> '+
        '</div>'+
        '</div>'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">到账金额：</label>'+
        '<div class="col-sm-9">'+
        '<input name="all_money" class="form-control" placeholder="请输入到账金额" value="'+all_money+'" type="text"> '+
        '</div>'+
        '</div>'+
        '</div></form>'
        parent.layer.open({
            area: '550px',
            title: '编辑充值设置',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes:function(data){
                var name=$$("input[name='name']").val();
                var money=$$("input[name='money']").val();
                var all_money=$$("input[name='all_money']").val();
                if(name==""){
                    parent.layer.open({
                        content:"请输入充值名称"
                    })
                    return;
                }
                if(money==""){
                    parent.layer.open({
                        content:"请输入充值金额"
                    })
                    return;
                }
                if(all_money==""){
                    parent.layer.open({
                        content:"请输入到账金额"
                    })
                    return;
                }
                
                $(parent.$('#rechargeset_edit')).ajaxSubmit({
                    type:"post",
                    success:function(data){
                        if(data=="ok"){
                            parent.layer.open({
                                content:"编辑成功",
                                yes:function(){
                                    parent.layer.closeAll();
                                    window.location.reload();
                                }
                            })
                        }else{
                            parent.layer.open({
                                content:"编辑失败"
                            }) 
                        }
                    }
                    
                })
                
            },
				btn2:function(){
					parent.layer.closeAll();
				}
            
        })
        
    })
    //删除充值设置
    $('.del_rechargeset').click(function(){
        var id =$(this).attr("itemid");
        parent.layer.confirm("确定删除该条充值设置吗？",{
            btn:["我要删除","考虑考虑"]
        },function(){
            $.post(base+"systemconfig/del_rechargeset",{
                "id":id
            },function(data){
                if(data=="ok"){
                    parent.layer.open({
                        content:"删除成功",
                        yes:function(data){
                            parent.layer.closeAll();
                            window.location.reload();
                        }
                    })
                }else{
                    parent.layer.open({
                        content:"删除失败"
                    })
                }
            })
        })
        
    })

    //更新 图文素材
    $('.update_material').click(function(){
        var type = $(this).attr('itemtype');
		 var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
        $.post(base+'systemconfig/update_material',{
            'type':type
        },function(data){
            if(data =='ok'){
                parent.layer.open({
                    content:"更新成功",
                    yes:function(data){
                        parent.layer.closeAll();
                        window.location.reload();
                    }
                })
            }else{
                parent.layer.open({
                    content:"更新失败"
                })	
            }
        })
    })
    //新增活动菜单
    $('.add_activity_menu').click(function(){
		
        $.post(base+"systemconfig/get_material",function(data){
            var obj = eval('('+data+')');
            var materials_html = '';
            for(var i = 0;i<obj.length;i++){
                materials_html +='<option value='+obj[i].media_id+'>'+obj[i].title+'</option>'
            }
            var html = '<div class="col-md-12">'
            +'<label class="col-sm-3 control-label">菜单名称：</label>'
            +'<div class="col-sm-9">'
            +'<input name="title" class="form-control" placeholder="请输入菜单名称" type="text"> '
            +'</div>'
            +'<div class="form-group">'
            +'<label class="col-sm-3 control-label">菜单素材：</label>'
            +'<div class="col-sm-9">'
            +'<select class="form-control" name="media_id">'
            + materials_html
            +'</select>'
            +'</div>'
            +'</div>'
            +'<div class="form-group">'
            +'<label class="col-sm-3 control-label">菜单位置：</label>'
            +'<div class="col-sm-9">'
            +'<select class="form-control" name="type">'
            +'<option value="1">第一菜单</option>'
            +'<option value="2">第二菜单</option>'
            +'<option value="3">第三菜单</option>'
            +'</select>'
            +'</div>'
            +'</div>'
            +'</div>';
            parent.layer.open({
                area: '550px',
                title: '活动菜单设置',
                shadeClose: false, //开启遮罩关闭
				btn: ['确认', '取消'],
                content: html,
                yes:function(data){
                    var title=parent.$("input[name='title']").val();
                    var media_id=parent.$("select[name='media_id']").val();
                    var type=parent.$("select[name='type']").val();
					 var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
                    $.post(base+'systemconfig/add_activity_menu',{
                        'media_id':media_id,
                        'type':type,
                        'title':title
                    },function(data){
                        if(data =='ok'){
                            parent.layer.open({
                                content:"添加成功",
                                yes:function(data){
                                    parent.layer.closeAll();
                                    window.location.reload();
                                }
                            })
						
                        }else{
                            parent.layer.open({
                                content:"添加失败"
                            })	
							
                        }
						
                    })
                
                },
				btn2:function(){
					parent.layer.closeAll();
				}
            
            })
        })
		
    })


    //删除菜单
    $('.del_activity_menu').click(function(){
        var id =$(this).attr("itemid");
        parent.layer.confirm("确定删除该条活动？",{
            btn:["我要删除","考虑考虑"]
        },function(){
				 var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $.post(base+"systemconfig/del_activity_menu",{
                "id":id
            },function(data){
                if(data=="ok"){
                    parent.layer.open({
                        content:"删除成功",
                        yes:function(data){
                            parent.layer.closeAll();
                            window.location.reload();
                        }
                    })
                }else{
                    parent.layer.open({
                        content:"删除失败"
                    })
                }
            })
        })
			
    })



	//跟新菜单
	$('.update_activity_menu').click(function(){
		parent.layer.confirm("确定要更新菜单，微信可能会延迟",{
            btn:["我要更新","考虑考虑"]
        },function(){
				
            $.post(base+"systemconfig/update_activity_menu",function(data){
				
                if(data=="ok"){
                    parent.layer.open({
                        content:"更新成功",
                        yes:function(data){
                            parent.layer.closeAll();
                            window.location.reload();
                        }
                    })
                }else if(data=='pz'){
					parent.layer.open({
                        content:"请先填写基础配置"
                    })
					
				}else{
                    parent.layer.open({
                        content:"更新失败"
                    })
                }
            })
        })
	
	})

})
function check_username(){
    var username=$.trim($('input[name="username"]').val());
    $.post(base+"systemconfig/check_username",{
        "username":username
    },function(data){
        if(data=="no"){
            parent.layer.open({
                content:"用户名重复"
            })
            return false; 
        }
    });
}
//选部门事件
function selectbm(){
    var bm=$('select[name="bm"]').val();
    $.post(base+"systemconfig/check_zw",{
        "bm_id":bm
    },function(data){
        if(data=="no"){
            parent.layer.open({
                content:"获取职务失败"
            });
        }else{
            var html = '<option value="">请选择职位</option>';
            var zw=$.parseJSON(data);
            for(var i=0;i<zw.length;i++){
                html+='<option value="'+zw[i].id+'">'+zw[i].name+'</option>';
              
            }
            $('select[name="zw"]').html(html)
        }
        
    });

}

/*
 *查找底薪
 */
function check_yg(){
    var y_id=$('select[name="selectyg"]').val();
    $.post(base+"systemconfig/check_ygone",{
        "id":y_id
    },function(data){
        if(data=="no"){
            parent.layer.open({
                content:"获取员工信息失败"
            });
        }else{
            var yginfo=$.parseJSON(data);
            $('#dixin').html((yginfo.salary)*1);
        }
        
    })

}

/*
 *实发工资核算
 */
function set_salary(){
    var kq=$.trim($('input[name="kq"]').val())*1;
    var tc=$.trim($('input[name="tc"]').val())*1;
    var sj=$.trim($('input[name="sj"]').val())*1;
    var kg=$.trim($('input[name="kg"]').val())*1;
    var dx=$.trim($('#dixin').html())*1;
    if(kq==""){
        kq=0;
    }
    if(tc==""){
        tc=0;
    }
    if(sj==""){
        sj=0;
    }
    if(kg==""){
        kg=0;
    }
    if(dx==""){
        dx=0;
    }
    var salary=kq+tc-sj-kg+dx;
    $('input[name="salary"]').val(salary);

}


