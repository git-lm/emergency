$(function () {
    $('.del_todaycourse').click(function () {
        var arrange_id = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['已经不需要了', '再考虑一下'] //按钮
        }, function () {
            $.post(base + 'todaysummary/del_todaycourse', {
                'id': arrange_id
            }, function (data) {
                if (data == 'ok') {
                    parent.layer.open({
                        content: '删除成功', 
                        yes: function () {
                            parent.layer.closeAll();
                            location.reload();
                        }
                    })
                } else if (data == 'yy') {
                    parent.layer.open({
                        content: '该课程已被预约不能删除', 
                        yes: function () {
                            parent.layer.closeAll();
                            location.reload();
                        }
                    })
                } else if (data == 'gq') {
                    parent.layer.open({
                        content: '该课程已过期不能删除', 
                        yes: function () {
                            parent.layer.closeAll();
                            location.reload();
                        }
                    })
                } else {
                    parent.layer.open({
                        content: '删除失败', 
                        yes: function () {
                            parent.layer.closeAll();
                            location.reload();
                        }
                    })
                }

            })
        });
    })
    $('.edit_todaycourse').click(function () {
        var arrange_id = $(this).attr('itemid');
        var jid = $(this).attr('jid');
        var kcname = $(this).parent().parent().find('td:first').text();
        var cbegin_time=$(this).parent().parent().find('td').eq(1).text();
        $.post(base + 'todaysummary/todaycourse_overdue', {
            'id': arrange_id
        }, function (data) {
            if (data == 'ok') {
                $.post(base + 'todaysummary/get_coach', function (data) {
                    var obj = eval('(' + data + ')');
                    var option_coach = '';
                    var selected="";
                    for (var i = 0; i < obj.length; i++) {
                        if(obj[i].id==jid){
                            selected="selected";
                        }
                        option_coach += '<option '+selected+' value="' + obj[i].id + '">' + obj[i].jname + '</option>'
                    }
                    var html = '<div class="col-md-12">'
                    + '<div class="form-group">'
                    + '<label class="col-sm-3 control-label">课程名称：</label>'
                    + '<div class="col-sm-9">'
                    + '<p class="form-control-static">' + kcname + '</p>'
                    + '</div>'
                    + '</div>'
                    + '<div class="form-group">'
                    + '<label class="col-sm-3 control-label">上课时间：</label>'
                    + '<div class="col-sm-9">'
                    + '<input name="begin_time" class="form-control" value="'+cbegin_time+'" style="height:30px" onfocus="WdatePicker({skin: \'whyGreen\', dateFmt: \'yyyy-MM-dd HH:mm:ss\'})" placeholder="请选择上课时间" type="text"> <span class="help-block m-b-none"></span>'
                    + '</div>'
                    + '</div>'
                    + '<div class="form-group">'
                    + '<label class="col-sm-3 control-label">请选择教练：</label>'
                    + '<div class="col-sm-9">'
                    + '<select class="form-control" name="j_id">'
                    + option_coach
                    + '</select>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                    parent.layer.open({
                        area: '550px',
                        title: '修改今日课程',
                        shadeClose: false, //开启遮罩关闭
						btn: ['确认', '取消'],
                        content: html,
                        yes: function (index, layero) {
                            var begin_time = parent.$('input[name="begin_time"]').val();
                            var j_id = parent.$('select[name="j_id"]').val();

                            if ($.trim(begin_time) == '') {
                                parent.$('.help-block').text('请填写开课时间');
                            } else {
                                $.post(base + 'todaysummary/edit_todaycourse', {
                                    'begin_time': begin_time, 
                                    'j_id': j_id, 
                                    'id': arrange_id
                                }, function (data) {
                                    if (data == 'ok') {
                                        parent.layer.open({
                                            content: '保存成功', 
                                            yes: function () {
                                                parent.layer.closeAll();
                                                location.reload();
                                            }
                                        })
                                    } else {
                                        parent.layer.closeAll();
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

            } else {
                parent.layer.closeAll();
                parent.layer.open({
                    content: '已过期，不能修改'
                })
            }
        })

    })

    //新增私教
    $('.coach_add').click(function () {
        $.post(base + 'todaysummary/get_coach', function (data) {
            var obj = eval('(' + data + ')');
            var option_coach = '';

            for (var i = 0; i < obj.length; i++) {
                option_coach += '<option value="' + obj[i].id + '">' + obj[i].jname + '</option>'
            }
            var html = '<div class="col-md-12">'
            + '<div class="form-group">'
            + '<label class="col-sm-4 control-label">空闲开始时间:</label>'
            + '<div class="col-sm-8">'
            + '<input name="begin_time" class="form-control" style="height:30px" onfocus="WdatePicker({dateFmt: \'yyyy-MM-dd HH:mm\', isShowClear: true, readOnly: true, minDate: \'%H:%m\'})" placeholder="请选择空闲开始时间" type="text">'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-sm-4 control-label">空闲结束时间:</label>'
            + '<div class="col-sm-8">'
            + '<input name="end_time" class="form-control" style="height:30px" onfocus="WdatePicker({dateFmt: \'yyyy-MM-dd HH:mm\', isShowClear: true, readOnly: true, minDate: \'#F{$dp.$D(\\\'begin_time\\\')}\'})" placeholder="请选择空闲结束时间" type="text">'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-sm-4 control-label">请选择教练：</label>'
            + '<div class="col-sm-8">'
            + '<select class="form-control" name="j_id">'
            + option_coach
            + '</select>'
            + '<span class="help-block m-b-none addjl_tips"></span>'
            + '</div>'
            + '</div>'
            + '</div>';
            parent.layer.open({
                area: '550px',
                title: '新增私教',
                shadeClose: false, //开启遮罩关闭
				btn: ['确认', '取消'],
                content: html,
                yes: function (index, layero) {
                    var begin_time = parent.$('input[name="begin_time"]').val();
                    var end_time = parent.$('input[name="end_time"]').val();
                    var j_id = parent.$('select[name="j_id"]').val();

                    if ($.trim(begin_time) == '') {
                        parent.$('.addjl_tips').text('请填写空闲开始时间');
                        return;
                    }
                    if ($.trim(end_time) == '') {
                        parent.$('.addjl_tips').text('请填写空闲结束时间');
                        return;
                    }
                    if($.trim(end_time)<=$.trim(begin_time)){
                        parent.$('.addjl_tips').text('结束时间必须大于开始时间');
                        return;
                        
                    }
                    $.post(base + 'todaysummary/coach_add', {
                        'begin_time': begin_time, 
                        'j_id': j_id, 
                        'end_time': end_time
                    }, function (data) {
                        if (data == 'ok') {
                            parent.layer.open({
                                content: '保存成功', 
                                yes: function () {
                                    parent.layer.closeAll();
                                    location.reload();
                                }
                            })
                        } else {
                            parent.layer.closeAll();
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
    })
})
