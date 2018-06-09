$(function () {
    //新增排课
    $('.add_arrange').click(function () {
        $.post(base + 'course/add_arrange', function (data) {
			
            var obj = eval('(' + data + ')');
            var html = '';

            var coach_html = '';
            var course_html = '';
			
            for (var i = 0; i < obj.coachs.length; i++) {
                coach_html += '<option value="' + obj.coachs[i].id + '">' + obj.coachs[i].jname + '</option>'
            }
            for (var i = 0; i < obj.course.length; i++) {
                course_html += '<option value="' + obj.course[i].id + '">' + obj.course[i].cname + '</option>'
            }

            html = '<div class="col-md-12">'
            + '<div class="form-group">'
            + '<label class="col-sm-3 control-label">课程名称：</label>'
            + '<div class="col-sm-9">'
            + '<select class="form-control" name="c_id">'
            + '<option value="0">请选择课程</option>'
            + course_html
            + '</select>'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-sm-3 control-label">上课时间：</label>'
            + '<div class="col-sm-9">'
            + ' <input name="form_begin_time"  class="form-control Wdate" onfocus="WdatePicker({skin: \'whyGreen\', minDate: \'%y-%M-%d %H:%m:%s\', dateFmt: \'yyyy-MM-dd HH:mm:ss\'})" placeholder="请选择时间" type="text" style="height:35px"> <span class="help-block m-b-none check_time">必须大于当前时间</span>'
            + '</div>'
            + ' </div>'
            + '<div class="form-group">'
            + '<label class="col-sm-3 control-label">教练姓名：</label>'
            + '<div class="col-sm-9">'
            + '<select class="form-control" name="j_id">'
            + '<option value="0">请选择教练</option>'
            + coach_html
            + '</select>'
            + '<span class="help-block m-b-none jk_tips"></span>'
            + '</div>'
            + '</div>'
            + '</div>';
            parent.layer.open({
                area: '550px',
                title: '编辑排课课程',
                shadeClose: false, //开启遮罩关闭
                btn: ['确认', '取消'],
                content: html,
                yes: function (index, layero) {
                    var form_begin_time = parent.$('input[name="form_begin_time"]').val();
                    var j_id = parent.$('select[name="j_id"]').val();
                    var c_id = parent.$('select[name="c_id"]').val();
                    if (c_id == "0") {
                        parent.$(".jk_tips").text("请选择课程");
                        return;
                    }
                    if ($.trim(form_begin_time) == '') {
                        parent.$('.jk_tips').text('请选择上课时间');
                        return;
                    }
                    if (j_id == "0") {
                        parent.$(".jk_tips").text("请选择教练");
                        return;
                    }
                    $.post(base + 'course/add_arrange', {
                        'begin_time': form_begin_time,
                        'j_id': j_id,
                        'cr_id': c_id
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

                },
                btn2:function(){
                    parent.layer.closeAll();
                }
            });

        })
    })
    //编辑排课
    $('.edit_arrange').click(function () {
        var arrange_id = $(this).attr('itemid');
        var course_name = $(this).parent().parent().find('td:first').text();
        var arrange_time = $(this).parent().parent().find('td:eq(1)').text();

        $.post(base + 'course/get_arrange_coach', {
            'arrange_id': arrange_id
        }, function (data) {
            if (data == 'no') {
                parent.layer.open({
                    content: '该课程已结束不能修改'
                })
                return;
            }
            var obj_coach = eval('(' + data + ')');
            var html = '';
            var option_html = '';
            for (var i = 0; i < obj_coach.length; i++) {
                option_html += '<option value="' + obj_coach[i].id + '">' + obj_coach[i].jname + '</option>'
            }
            html = '<div class="col-md-12">'
            + '<div class="form-group">'
            + '<label class="col-sm-3 control-label">课程名称：</label>'
            + '<div class="col-sm-9">'
            + ' <p class="form-control-static">' + course_name + '</p>'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-sm-3 control-label">上课时间：</label>'
            + '<div class="col-sm-9">'
            + ' <input name="form_begin_time" value="' + arrange_time + '" class="form-control" onfocus="WdatePicker({skin: \'whyGreen\', minDate: \'%y-%M-%d %H:%m:%s\', dateFmt: \'yyyy-MM-dd HH:mm:ss\'})" placeholder="请输入文本" type="text" style="height:30px"> <span class="help-block m-b-none">必须大于当前时间</span>'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-sm-3 control-label">教练姓名：</label>'
            + '<div class="col-sm-9">'
            + '<select class="form-control" name="j_id">'
            + option_html
            + '</select>'
            + '</div>'
            + '</div>'
            + '</div>';
            parent.layer.open({
                area: '550px',
                title: '编辑排课课程',
                shadeClose: true, //开启遮罩关闭
                btn: ['确认', '取消'],
                content: html,
                yes: function (index, layero) {
                    var form_begin_time = parent.$('input[name="form_begin_time"]').val();
                    var j_id = parent.$('select[name="j_id"]').val();
                    if ($.trim(form_begin_time) == '') {
                        parent.$('.help-block').text('请填写开课时间');
                    } else {
                        $.post(base + 'course/edit_arrange', {
                            'form_begin_time': form_begin_time,
                            'j_id': j_id,
                            'arrange_id': arrange_id
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
    //删除排课课程
    $('.del_arrange').click(function () {
        var arrange_id = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['已经不需要了', '再考虑一下'] //按钮
        }, function () {
            $.post(base + 'course/del_arrange', {
                'arrange_id': arrange_id
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
    //添加/编辑 课程
    $('.add_course').click(function () {
        var cname = $("input[name='cname']").val();
        var course_id = $("input[name='course_id']").val();
        var cphoto = $("input[name='cphoto']").val();
		
        if ($.trim(cname) == "") {
            parent.layer.open({
                content: '请填写课程名称'
            })
            return false;
        }
        if ($.trim(course_id) == '') {
            if ($.trim(cphoto) == "") {
                parent.layer.open({
                    content: '请选择课程图片'
                })
                return false;
            }
        }
        //        var index = layer.load(0, {
        //            shade: [0.5, '#000'] //0.1透明度的白色背景
        //        });
        $.post(base + "course/verify", {
            'cname': cname,
            'course_id': course_id
        }, function (data) {

            if (data == 'no') {
                parent.layer.open({
                    content: '课程已存在',
                    yes: function () {
                        parent.layer.closeAll();
                    }
                });
            } else {
                $('#course_add').ajaxSubmit({
                    type: "POST",
                    error: function (request) {
                        parent.layer.open({
                            content: '请正确填写',
                            yes: function () {
                                parent.layer.closeAll();
                            }
                        })
                    },
                    success: function (data) {
					
                        if (data == "ok") {
                            parent.layer.open({
                                content: '操作成功'
                            })
                            window.location.href = base + 'course/course_lists';
                        } else {
                            parent.layer.open({
                                content: '操作失败',
                                yes: function () {
                                    parent.layer.closeAll();
                                }
                            })

                        }

                    }
                });
            }
        });
    })

    //删除课程
    $('.del_course').click(function () {
        var course_id = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['已经不需要了', '再考虑一下'] //按钮
        }, function () {
            $.post(base + 'course/del_course', {
                'course_id': course_id
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
    //添加分类
    $('.add_course_type').click(function () {
        var itemtype = $(this).attr('itemtype');
        var title = '添加大分类';
        var html = '<label class="col-sm-4 control-label"> 名称：</label><div class="col-sm-8"><input name="form_course_name"  class="form-control"  placeholder="请输入文本" type="text" required="true"><span class="help-block m-b-none "></span> </div>';
        if (itemtype == 'small_type') {
            var title = '添加小分类';
            $.ajax({
                type: "post",
                url: base + 'course/get_big_type',
                cache: false,
                async: false,
                success: function (data)
                {
                    var big_type_obj = eval('(' + data + ')');
                    var big_type_option = '';

                    for (var i = 0; i < big_type_obj.course_types.length; i++) {
                        big_type_option += '<option value=' + big_type_obj.course_types[i].id + '>' + big_type_obj.course_types[i].name + '</option>';
                    }
                    html += '<label class="col-sm-4 control-label">选择大类：</label>'
                    + '<div class="col-sm-8">'
                    + '<select class="form-control" name="course_type_id">'

                    + big_type_option
                    + '</select>'
                    + '</div>';
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("请求失败！");
                }
            });
        }

        parent.layer.open({
            area: '350px',
            title: title,
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var form_course_name = parent.$('input[name="form_course_name"]').val();
                var course_type_parent_id = 0
                if (itemtype == 'small_type') {
                    course_type_parent_id = parent.$('select[name="course_type_id"]').val();
                }

                if ($.trim(form_course_name) == '') {
                    parent.$('.help-block').text('请填写名称');
                } else {
                    $.post(base + 'course/check_course_name', {
                        'form_course_name': form_course_name,
                        'type': 'add',
                        'course_type_parent_id': course_type_parent_id,
                        'itemtype':itemtype
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
    //编辑分类
    $('.edit_course_type').click(function () {

        var course_type_name = $(this).parent().parent().find('td:first').text();
        var course_type_id = $(this).attr('itemid');
        var itemtype = $(this).attr('itemtype');
        var title = '编辑大分类';
        var html = '<label class="col-sm-4 control-label"> 名称：</label><div class="col-sm-8"><input name="form_course_name"  value="' + course_type_name + '" class="form-control"  placeholder="请输入文本" type="text" required="true"><span class="help-block m-b-none "></span> </div>';

        if (itemtype == 'small_type') {
            var title = '编辑小分类';
            $.ajax({
                type: "post",
                url: base + 'course/get_big_type',
                data: {
                    'id': course_type_id
                },
                cache: false,
                async: false,
                success: function (data)
                {
                    var big_type_obj = eval('(' + data + ')');
                    var big_type_option = '';

                    for (var i = 0; i < big_type_obj.course_types.length; i++) {
                        var big_type_selected = '';
                        if (big_type_obj.course_types[i].id == big_type_obj.parent_id) {
                            big_type_selected = 'selected="selected"';
                        }
                        big_type_option += '<option ' + big_type_selected + ' value=' + big_type_obj.course_types[i].id + '>' + big_type_obj.course_types[i].name + '</option>';
                    }
                    html += '<label class="col-sm-4 control-label">选择大类：</label>'
                    + '<div class="col-sm-8">'
                    + '<select class="form-control" name="course_type_id">'

                    + big_type_option
                    + '</select>'
                    + '</div>';
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("请求失败！");
                }
            });
        }
        parent.layer.open({
            area: '350px',
            title: title,
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {

                var form_course_name = parent.$('input[name="form_course_name"]').val();
                var course_type_parent_id = 0
                if (itemtype == 'small_type') {
                    course_type_parent_id = $$('select[name="course_type_id"]').val();
                }

                if ($.trim(form_course_name) == '') {
                    parent.$('.help-block').text('请填写名称');
                } else {
                    $.post(base + 'course/check_course_name', {
                        'form_course_name': form_course_name,
                        'type': 'edit',
                        'course_type_id': course_type_id,
                        'course_type_parent_id': course_type_parent_id,
                        'itemtype':itemtype
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

    //删除分类
    $('.del_course_type').click(function () {
        var course_type_id = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['已经不需要了', '再考虑一下'] //按钮
        }, function () {
            $.post(base + 'course/del_course_type', {
                'course_type_id': course_type_id
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
    //新增属性
    $('.add_course_attribute').click(function () {
        var itemtype = $(this).attr('itemtype');
        var title = '添加属性';
        var html = '<label class="col-sm-3 control-label"> 名称：</label><div class="col-sm-8"><input name="form_attribute_name"  class="form-control"  placeholder="请输入文本" type="text" required="true"><span class="help-block m-b-none "></span> </div>';
        parent.layer.open({
            area: '350px',
            title: title,
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var form_attribute_name = parent.$('input[name="form_attribute_name"]').val();
                if ($.trim(form_attribute_name) == '') {
                    parent.$('.help-block').text('请填写名称');
                } else {
                    $.post(base + 'course/check_attribute_name', {
                        'form_attribute_name': form_attribute_name,
                        'type': 'add'
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
    /*
     * 编辑属性
     */
    $('.edit_course_attribute').click(function () {
        var attribute_id = $(this).attr('itemid');
        var attribute_name = $(this).parent().parent().find('td:first').text();
        parent.layer.open({
            area: '350px',
            title: '编辑属性',
            shadeClose: false, //开启遮罩关闭
            btn: ['确认', '取消'],
            content: '<label class="col-sm-3 control-label"> 名称：</label><div class="col-sm-8"><input name="form_attribute_name"  value="' + attribute_name + '" class="form-control"  placeholder="请输入文本" type="text" required="true"><span class="help-block m-b-none "></span> </div> ',
            yes: function (index, layero) {

                var form_attribute_name = parent.$('input[name="form_attribute_name"]').val();

                if ($.trim(form_attribute_name) == '') {
                    parent.$('.help-block').text('请填写名称');
                } else {

                    $.post(base + 'course/check_attribute_name', {
                        'form_attribute_name': form_attribute_name,
                        'type': 'edit',
                        'attribute_id': attribute_id
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
    /*
     * 删除属性
     */
    $('.del_course_attribute').click(function () {
        var attribute_id = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['已经不需要了', '再考虑一下'] //按钮
        }, function () {
            $.post(base + 'course/del_course_attribute', {
                'attribute_id': attribute_id
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

    //新增适用人群
    $('.add_course_apply').click(function () {
        var itemtype = $(this).attr('itemtype');
        var title = '添加适用人群';
        var html = '<label class="col-sm-3 control-label"> 名称：</label><div class="col-sm-8"><input name="form_apply_name"  class="form-control"  placeholder="请输入文本" type="text" required="true"><span class="help-block m-b-none "></span> </div>';
        parent.layer.open({
            area: '350px',
            title: title,
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var form_apply_name = parent.$('input[name="form_apply_name"]').val();
                if ($.trim(form_apply_name) == '') {
                    parent.$('.help-block').text('请填写名称');
                } else {
                    $.post(base + 'course/check_apply_name', {
                        'form_apply_name': form_apply_name,
                        'type': 'add'
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
    /*
     * 编辑属性
     */
    $('.edit_course_apply').click(function () {
        var apply_id = $(this).attr('itemid');
        var apply_name = $(this).parent().parent().find('td:first').text();
        parent.layer.open({
            area: '350px',
            title: '编辑适用人群',
            shadeClose: false, //开启遮罩关闭
            btn: ['确认', '取消'],
            content: '<label class="col-sm-3 control-label"> 名称：</label><div class="col-sm-8"><input name="form_apply_name"  value="' + apply_name + '" class="form-control"  placeholder="请输入文本" type="text" required="true"><span class="help-block m-b-none "></span> </div> ',
            yes: function (index, layero) {

                var form_apply_name = parent.$('input[name="form_apply_name"]').val();

                if ($.trim(form_apply_name) == '') {
                    parent.$('.help-block').text('请填写名称');
                } else {

                    $.post(base + 'course/check_apply_name', {
                        'form_apply_name': form_apply_name,
                        'type': 'edit',
                        'apply_id': apply_id
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
    /*
     * 删除属性
     */
    $('.del_course_apply').click(function () {
        var apply_id = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['已经不需要了', '再考虑一下'] //按钮
        }, function () {
            $.post(base + 'course/del_course_apply', {
                'apply_id': apply_id
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
    //体验课程
    $('.course_taste').click(function () {
        var content = Base64.encode($('.summernote').code());

        var c_id = $("select[name='c_id'] option:selected").val();
        var ct_id = $("select[name='ct_id'] option:selected").val();
        var number = $("input[name='number']").val();

        if (c_id != '0' && ct_id != '0') {
            alert('请单选类型或者课程');
            return;
        }
        if (c_id == '0' && ct_id == '0') {
            alert('请单选类型或者课程');
            return;
        }

        $.post(base + 'course/course_taste', {
            'content': content,
            'c_id': c_id,
            'ct_id': ct_id,
            'number': number
        }, function (data) {

            parent.layer.open({
                content: '操作成功',
                yes: function () {
                    parent.layer.closeAll()
                    window.location.reload();
                }
            })

        });
    })
    //周课程
    $('.course_week').click(function () {
        var content = Base64.encode($('.summernote').code());
        //var content = $('.summernote').code();
        $.post(base + 'course/course_week', {
            'photo': content
        }, function (data) {
            parent.layer.open({
                content: '操作成功',
                yes: function () {
                    parent.layer.closeAll()
                    window.location.reload();
                }
            })

        });
    })
    //模板添加
    $('.add_course_template').click(function () {
        var html = '<div class="form-group">'
        + '<label class="col-sm-3 control-label">模板开始时间:</label>'
        + '<div class="col-sm-9">'
        + '<input name="mb_begin_time" id="mb_begin_time" onfocus="WdatePicker({dateFmt: \'yyyy-MM-dd\', isShowClear: true, readOnly: true, maxDate: \'#F{$dp.$D(\\\'mb_end_time\\\')||\\\'%y-%M-%d \\\'}\'})" class="form-control" placeholder="请选择模板开始时间" type="text"> '
        + '</div>'
        + '</div>'
        + '<div class="form-group">'
        + '<label class="col-sm-3 control-label">模板结束时间:</label>'
        + '<div class="col-sm-9">'
        + '<input name="mb_end_time" id="mb_end_time" onfocus="WdatePicker({dateFmt: \'yyyy-MM-dd\', isShowClear: true, readOnly: true, minDate: \'#F{$dp.$D(\\\'mb_begin_time\\\')}\', maxDate: \'%y-%M-%d\'})" class="form-control" placeholder="请选择模板结束时间" type="text"> '
        + '</div>'
        + '</div>'
        + '<div class="form-group">'
        + '<label class="col-sm-3 control-label">课程开始时间:</label>'
        + '<div class="col-sm-9">'
        + '<input name="begin_time" onfocus="WdatePicker({dateFmt: \'yyyy-MM-dd\', isShowClear: true, readOnly: true})" class="form-control" placeholder="课程开始时间" type="text"> <span class="help-block m-b-none"></span>'
        + '</div>'
        + '</div>'
        parent.layer.open({
            area: '550px',
            title: '编辑排课课程',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var mb_begin_time = parent.$('input[name="mb_begin_time"]').val();
                var mb_end_time = parent.$('input[name="mb_end_time"]').val();
                var begin_time = parent.$('input[name="begin_time"]').val();

                if ($.trim(mb_begin_time) == '') {
                    parent.$('.help-block').text('请填写模板开始时间');
                    return;
                }
                if ($.trim(mb_end_time) == '') {
                    parent.$('.help-block').text('请填写模板结束时间');
                    return;
                }
                if ($.trim(begin_time) == '') {
                    parent.$('.help-block').text('请填写开课时间');
                    return;
                }

                $.post(base + 'course/course_template_add', {
                    'mb_begin_time': mb_begin_time,
                    'mb_end_time': mb_end_time,
                    'begin_time': begin_time
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
            },
            btn2:function(){
                parent.layer.closeAll();
            }
        });
    })


})


