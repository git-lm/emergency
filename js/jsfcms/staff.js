$(function () {
    $('.add_bm').click(function () {
        var html = '<label class="col-sm-3 control-label">部门名称：</label>'
                + '<div class="col-sm-9">'
                + '<input name="name" class="form-control" placeholder="请输入部门名称" type="text"> <span class="help-block m-b-none"></span>'
                + '</div>';
        parent.layer.open({
            area: '550px',
            title: '新增部门',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes: function (index, layero) {
                var name = parent.$('input[name="name"]').val();
                if ($.trim(name) == '') {
                    parent.$('.help-block').text('请填写部门名称');
                } else {
                    $.post(base + 'staff/bm_add', {
                        'name': name
                    }, function (data) {
                        if (data == 'ok') {
                            parent.layer.open({
                                content: '保存成功',
                                yes: function () {
                                    parent.layer.closeAll()
                                    location.reload();
                                }
                            })
                        } else {
                            parent.layer.closeAll()
                            parent.layer.open({
                                content: '保存失败'
                            })
                        }
                    })
                }

            },
				btn2:function(){
					parent.layer.closeAll();
				}
        });
    })
    $('.edit_bm').click(function () {
        var name = $(this).parent().parent().find('td').eq(1).text();
        var id = $(this).attr('itemid');
        var html = '<label class="col-sm-3 control-label">部门名称：</label>'
                + '<div class="col-sm-9">'
                + '<input name="name" value="' + name + '" class="form-control" placeholder="请输入部门名称" type="text"> <span class="help-block m-b-none"></span>'
                + '</div>';
        parent.layer.open({
            area: '550px',
            title: '修改部门',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes: function (index, layero) {
                var name = parent.$('input[name="name"]').val();
                if ($.trim(name) == '') {
                    parent.$('.help-block').text('请填写部门名称');
                } else {
                    $.post(base + 'staff/bm_edit', {
                        'name': name,
                        'id': id
                    }, function (data) {
                        if (data == 'ok') {
                            parent.layer.open({
                                content: '保存成功',
                                yes: function () {
                                    parent.layer.closeAll()
                                    location.reload();
                                }
                            })
                        } else {
                            parent.layer.closeAll()
                            parent.layer.open({
                                content: '保存失败'
                            })
                        }
                    })
                }

            },
				btn2:function(){
					parent.layer.closeAll();
				}
        });
    })
    //删除部门
    $('.del_bm').click(function () {
        var bm_id = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['已经不需要了', '再考虑一下'] //按钮
        }, function () {
            $.post(base + 'staff/bm_del', {
                'bm_id': bm_id
            }, function (data) {
                if (data == 'ok') {
                    parent.layer.open({
                        content: '删除成功',
                        yes: function () {
                            parent.layer.closeAll()
                            location.reload();
                        }
                    })
                } else {
                    parent.layer.open({
                        content: '删除失败',
                        yes: function () {
                            parent.layer.closeAll()
                            location.reload();
                        }
                    })
                }

            })
        });
    })

    //新增职位
    $('.add_zw').click(function () {

        $.post(base + 'staff/get_bm', function (data) {
           
            var obj = eval('(' + data + ')');
            var bm_option = '';

            for (var i = 0; i < obj.bms.length; i++) {
                bm_option += '<option value="' + obj.bms[i].id + '">' + obj.bms[i].name + '</option>';
            }

            var html = '<label class="col-sm-3 control-label">职位名称：</label>'
                    + '<div class="col-sm-9">'
                    + '<input name="name" class="form-control" placeholder="请输入职位名称" type="text"> <span class="help-block m-b-none"></span>'
                    + '</div>'
                    + '<label class="col-sm-3 control-label">部门列表：</label>'
                    + '<div class="col-sm-9">'
                    + '<select class="form-control" name="bm_id">'
                    + bm_option
                    + '</select>'
                    + '</div>';
            parent.layer.open({
                area: '550px',
                title: '新增部门',
                shadeClose: false, //开启遮罩关闭
				btn: ['确认', '取消'],
                content: html,
                yes: function (index, layero) {

                    var name = parent.$('input[name="name"]').val();
                    var bm_id = parent.$('select[name="bm_id"]').val();
                    if ($.trim(name) == '') {
                        parent.$('.help-block').text('请填写部门名称');
                    } else {

                        $.post(base + 'staff/zw_add', {'name': name, 'bm_id': bm_id}, function (data) {

                            if (data == 'ok') {
                                parent.layer.open({
                                    content: '保存成功',
                                    yes: function () {
                                        parent.layer.closeAll()
                                        location.reload();
                                    }
                                })
                            } else {
                                parent.layer.closeAll()
                                parent.layer.open({
                                    content: '保存失败'
                                })
                            }
                        })
                    }

                },
				btn2:function(){
					parent.layer.closeAll();
				}
            });
        })

    })
    //编辑职位
    $('.edit_zw').click(function () {
        var name = $(this).parent().parent().find('td').eq(1).text();
        var id = $(this).attr('itemid');
        $.post(base + 'staff/get_bm', {
            'id': id
        }, function (data) {

            var obj = eval('(' + data + ')');
            var zw_option = '';
            for (var i = 0; i < obj.bms.length; i++) {
                var selected_zw = '';
                if (obj.bms[i].id == obj.bm_id) {
                    selected_zw = 'selected="selected"';
                }
                zw_option += '<option ' + selected_zw + ' value="' + obj.bms[i].id + '">' + obj.bms[i].name + '</option>';
            }

            var html = '<label class="col-sm-3 control-label">职位名称：</label>'
                    + '<div class="col-sm-9">'
                    + '<input name="name" value="' + name + '" class="form-control" placeholder="请输入部门名称" type="text"> <span class="help-block m-b-none"></span>'
                    + '</div>'
                    + '<label class="col-sm-3 control-label">部门列表：</label>'
                    + '<div class="col-sm-9">'
                    + '<select class="form-control" name="bm_id">'
                    + zw_option
                    + '</select>'
                    + '</div>';
            parent.layer.open({
                area: '550px',
                title: '修改职位',
                shadeClose: false, //开启遮罩关闭
				btn: ['确认', '取消'],
                content: html,
                yes: function (index, layero) {
                    var name = parent.$('input[name="name"]').val();
                    var bm_id = parent.$('select[name="bm_id"]').val();
                    if ($.trim(name) == '') {
                        parent.$('.help-block').text('请填写部门名称');
                    } else {
                        $.post(base + 'staff/zw_edit', {
                            'bm_id': bm_id,
                            'name': name,
                            'id': id
                        }, function (data) {
                            if (data == 'ok') {
                                parent.layer.open({
                                    content: '保存成功',
                                    yes: function () {
                                        parent.layer.closeAll()
                                        location.reload();
                                    }
                                })
                            } else {
                                parent.layer.closeAll()
                                parent.layer.open({
                                    content: '保存失败'
                                })
                            }
                        })
                    }

                },
				btn2:function(){
					parent.layer.closeAll();
				}
            });
        })
    })
    //删除部门
    $('.del_zw').click(function () {
        var zw_id = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['已经不需要了', '再考虑一下'] //按钮
        }, function () {
            $.post(base + 'staff/zw_del', {
                'zw_id': zw_id
            }, function (data) {
                if (data == 'ok') {
                    parent.layer.open({
                        content: '删除成功',
                        yes: function () {
                            parent.layer.closeAll()
                            location.reload();
                        }
                    })
                } else {
                    parent.layer.open({
                        content: '删除失败',
                        yes: function () {
                            parent.layer.closeAll()
                            location.reload();
                        }
                    })
                }

            })
        });
    })

    //新增请假
    $('.add_leave').click(function () {

        var html = '<label class="col-sm-3 control-label">请假开始时间:</label>'
                + '<div class="col-sm-9">'
                + '<input name="begintime" id="begintime" onfocus="WdatePicker({dateFmt: \'yyyy-MM-dd HH:mm:ss\', isShowClear: true, readOnly: true, minDate: \'#F{\\\'%y-%M-%d %H:%m:%s\\\'}\'})"  class="form-control" placeholder="请输入请假开始时间" type="text"> '
                + '</div>'
                + '<label class="col-sm-3 control-label">请假结束时间:</label>'
                + '<div class="col-sm-9">'
                + '<input name="endtime" id="endtime" onfocus="WdatePicker({dateFmt: \'yyyy-MM-dd HH:mm:ss\', isShowClear: true, readOnly: true, minDate: \'#F{$dp.$D(\\\'begintime\\\')}\'})"  class="form-control" placeholder="请输入请假结束时间" type="text"> '
                + '</div>'
                + '<label class="col-sm-3 control-label">请假理由：</label>'
                + '<div class="col-sm-9">'
                + '<input name="content"  class="form-control" placeholder="请输入请假理由" type="text"> <span class="help-block m-b-none"></span>'
                + '</div>'
        parent.layer.open({
            area: '550px',
            title: '新增请假',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes: function (index, layero) {
                var begintime = parent.$('input[name="begintime"]').val();
                var endtime = parent.$('input[name="endtime"]').val();
                var content = parent.$('input[name="content"]').val();
                if ($.trim(begintime) == '') {
                    parent.$('.help-block').text('请填写请假开始时间');
                    return;
                }
                if ($.trim(endtime) == '') {
                    parent.$('.help-block').text('请填写请假结束时间');
                    return;
                }
                if ($.trim(content) == '') {
                    parent.$('.help-block').text('请填写请假理由');
                    return;
                }

                $.post(base + 'staff/leave_add', {
                    'begintime': begintime,
                    'endtime': endtime,
                    'content': content
                }, function (data) {
                    if (data == 'ok') {
                        parent.layer.open({
                            content: '保存成功',
                            yes: function () {
                                parent.layer.closeAll()

                            }
                        })
                    } else {
                        parent.layer.closeAll()
                        parent.layer.open({
                            content: '保存失败'
                        })
                    }
                })


            },
				btn2:function(){
					parent.layer.closeAll();
				}
        });
    })

    //新增教练
    $('.add_coach').click(function () {
        var jname = $('input[name="jname"]').val()
        var jusername = $('input[name="jusername"]').val()
        var jpassword = $('input[name="jpassword"]').val()
        var jtel = $('input[name="jtel"]').val()
        var jphoto = $('input[name="jphoto"]').val()
        var jprcture = $('input[name="jprcture"]').val()
        if ($.trim(jname) == '') {
            parent.layer.open({
                content: '请填写教练名称'
            })
            return;
        }
        if ($.trim(jusername) == '') {
            parent.layer.open({
                content: '请填写教练登录账号'
            })
            return;
        }
        if ($.trim(jpassword) == '') {
            parent.layer.open({
                content: '请填写登录密码'
            })
            return;
        }
        if ($.trim(jtel) == '') {
            parent.layer.open({
                content: '请填写手机号码'
            })
            return;
        }
        if ($.trim(jphoto) == '') {
            parent.layer.open({
                content: '请上传头像'
            })
            return;
        }
       // var index = layer.load(0, {
        //    shade: [0.5, '#000'] //0.1透明度的白色背景
       // });
        $("#coach_add").ajaxSubmit({
            type: "post",
            success: function (data) {
                if (data == "ok") {
                    parent.layer.open({
                        content: "保存成功",
                        yes: function (data) {
                            parent.layer.closeAll();
                           window.location.href = base+'staff/coach_lists';
                        }
                    })

                } else if (data =='cz') {
                    parent.layer.open({
                        content: "该手机号码已存在"
                    })
                    parent.layer.closeAll();
                } else {
                    parent.layer.open({
                        content: "保存失败"
                    })
                    parent.layer.closeAll();
                }
            }
        })
    })


    //修改教练
    $('.edit_coach').click(function () {

        var jname = $('input[name="jname"]').val()
        var jusername = $('input[name="jusername"]').val()
        var jpassword = $('input[name="jpassword"]').val()
        var jtel = $('input[name="jtel"]').val()
        if ($.trim(jname) == '') {
            parent.layer.open({
                content: '请填写教练名称'
            })
            return;
        }
        if ($.trim(jusername) == '') {
            parent.layer.open({
                content: '请填写教练登录账号'
            })
            return;
        }
        if ($.trim(jpassword) == '') {
            parent.layer.open({
                content: '请填写登录密码'
            })
            return;
        }
        if ($.trim(jtel) == '') {
            parent.layer.open({
                content: '请填写手机号码'
            })
            return;
        }
        //        var index = parent.layer.load(0, {
        //            shade: [0.5, '#000'] //0.1透明度的白色背景
        //        });
        $("#coach_edit").ajaxSubmit({
            type: "post",
            success: function (data) {
                if (data == "ok") {
                    parent.layer.open({
                        content: "保存成功",
                        yes: function (data) {
                            parent.layer.closeAll();
                            window.location.reload();
                        }
                    })

                } else if (data == 'cz') {
                    parent.layer.open({
                        content: "该手机号码已存在"
                    })
                    parent.layer.closeAll();
                } else {
                    parent.layer.open({
                        content: "保存失败"
                    })
                    parent.layer.closeAll();
                }
            }
        })
    })




    //请假审核
    $('.wait_sh').click(function () {
        var id = $(this).attr('itemid');
        var html = '<div class="col-md-12">' +
                '<div class="form-group">' +
                '<label class="col-sm-3 control-label">审核状态：</label>' +
                '<div class="col-sm-9">' +
                '<select class="form-control" name="select_sh" id="select_sh" onchange="outputSelect()">' +
                '<option value="0">请选择审核状态</option>' +
                '<option value="1">通过</option>' +
                '<option value="2">拒绝</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div class="form-group" id="j_reason" style="display:none">' +
                '<label class="col-sm-3 control-label">拒绝理由：</label>' +
                '<div class="col-sm-9">' +
                '<input class="form-control" placeholder="请输入文本" type="text" name="reason" id="reason"> ' +
                '</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<div class="col-sm-12">' +
                '<span class="help-block m-b-none" id="sh_tips"></span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-6"></div>';
        parent.layer.open({
            area: '550px',
            title: '请假审核',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes: function (data) {
                var select_sh = $$("select[name='select_sh']").val();
                var reason = $$("input[name='reason']").val();

                if (select_sh == "0") {
                    $$('#sh_tips').text("");
                    $$('#sh_tips').text("请选择审核状态");
                    return;
                } else if (select_sh == "2") {
                    if (reason == "") {
                        $$('#sh_tips').text("");
                        $$('#sh_tips').text("请输入拒绝理由");
                        return;
                    }
                }
                //                console.log($('#addmoban'))
                $.post(base + "staff/sh_qj", {
                    "id": id,
                    "state": select_sh,
                    "reason": reason
                }, function (data) {
                    if (data == "ok") {
                        parent.layer.open({
                            content: "审核成功",
                            yes: function (data) {
                                parent.layer.closeAll();
                                window.location.reload();
                            }
                        })
                    } else {
                        parent.layer.open({
                            content: "审核失败",
                            yes: function (data) {
                                parent.layer.closeAll();
                            }
                        })
                    }

                })

            },
				btn2:function(){
					parent.layer.closeAll();
				}

        })
    })
    $('.select_bm').change(function () {
        var bm_id = $(this).val();
        var html = '<option value="">请选择职位</option>';
        if ($.trim(bm_id) == '') {
            $('.select_zw').html(html);
        } else {
            $.post(base + 'staff/get_zw_lists', {
                'bm_id': bm_id
            }, function (data) {
                var obj = eval('(' + data + ')');
                for (var i = 0; i < obj.length; i++) {
                    html += '<option value="' + obj[i].id + '">' + obj[i].name + '</option>';
                }
                $('.select_zw').html(html);
            })
        }
    })


    $('.add_staff').click(function () {
        var yname = $('input[name="yname"]').val();
        var ytel = $('input[name="ytel"]').val();
        if ($.trim(yname) == '') {
            parent.layer.open({
                content: '请填写员工名称'
            })
            return;
        }
        if ($.trim(ytel) == '') {
            parent.layer.open({
                content: '请填写员工电话'
            })
            return;
        }
        $.post(base + 'staff/staff_add', $('#staff_add').serialize(), function (data) {
            if (data == 'ok') {
                parent.layer.open({
                    content: "保存成功",
                    yes: function (data) {
                        parent.layer.closeAll();
                        window.location.reload();
                    }
                })
            } else if (data == 'cz') {
                parent.layer.open({
                    content: "该手机号码已存在",
                    yes: function (data) {
                        parent.layer.closeAll();
                    }
                })
            } else {
                parent.layer.open({
                    content: "保存失败",
                    yes: function (data) {
                        parent.layer.closeAll();
                    }
                })
            }
        })
    })

    $('.edit_staff').click(function () {
        var yname = $('input[name="yname"]').val();
        var ytel = $('input[name="ytel"]').val();
        if ($.trim(yname) == '') {
            parent.layer.open({
                content: '请填写员工名称'
            })
            return;
        }
        if ($.trim(ytel) == '') {
            parent.layer.open({
                content: '请填写员工电话'
            })
            return;
        }
        $.post(base + 'staff/staff_edit', $('#staff_edit').serialize(), function (data) {
            if (data == 'ok') {
                parent.layer.open({
                    content: "保存成功",
                    yes: function (data) {
                        parent.layer.closeAll();
                        window.location.reload();
                    }
                })
            } else if (data == 'cz') {
                parent.layer.open({
                    content: "该手机号码已存在",
                    yes: function (data) {
                        parent.layer.closeAll();
                    }
                })
            } else {
                parent.layer.open({
                    content: "保存失败",
                    yes: function (data) {
                        parent.layer.closeAll();
                    }
                })
            }
        })
    })
    //删除员工
    $('.del_staff').click(function (data) {
        var id = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['已经不需要了', '再考虑一下'] //按钮
        }, function () {
            $.post(base + 'staff/staff_del', {
                'id': id
            }, function (data) {
                if (data == 'ok') {
                    parent.layer.open({
                        content: "删除成功",
                        yes: function (data) {
                            parent.layer.closeAll();
                            window.location.reload();
                        }
                    })
                } else {
                    parent.layer.open({
                        content: "删除失败",
                        yes: function (data) {
                            parent.layer.closeAll();
                            window.location.reload();
                        }
                    })
                }
            })
        })
    })
    //删除教练

    $('.coach_del').click(function () {
        var jl_id = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['已经不需要了', '再考虑一下'] //按钮
        }, function () {
            $.post(base + 'staff/coach_del', {
                'id': jl_id
            }, function (data) {
                if (data == 'ok') {
                    parent.layer.open({
                        content: '删除成功',
                        yes: function () {
                            parent.layer.closeAll()
                            location.reload();
                        }
                    })
                } else {
                    parent.layer.open({
                        content: '删除失败',
                        yes: function () {
                            parent.layer.closeAll()
                            location.reload();
                        }
                    })
                }

            })
        });
    })

})
function outputSelect() {
    if ($("#select_sh").val() == "1") {
        $('#j_reason').css("display", "none");
        $('#sh_tips').text("");
    } else if ($('#select_sh').val() == "2") {
        $('#j_reason').css("display", "block");
        $('#sh_tips').text("");
    } else if ($('#select_sh').val() == "0") {
        $('#j_reason').css("display", "none");
        $('#sh_tips').text("");
    }
}

