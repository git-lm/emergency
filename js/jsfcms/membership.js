$(function () {
    $('.operation_membership').click(function () {
        var id = $(this).attr('itemid');
        var type = $(this).attr('itemtype');
        var confirm_name;
        if (type == 'pause') {
            confirm_name = '您确定要暂停吗？';
        } else if (type == 'use') {
            confirm_name = '您确定要使用吗？';
        } else if (type == 'del') {
            confirm_name = '您确定要删除吗？';
        }
        parent.layer.confirm(confirm_name, {
            btn: ['确定', '取消'] //按钮
        }, function () {
            $.post(base + 'membership/membership_operation', {
                'id': id, 
                'type': type
            }, function (data) {
                if (data == 'ok') {
                    parent.layer.open({
                        content: '操作成功', 
                        yes: function () {
                            parent.layer.closeAll();
                            location.reload();
                        }
                    })
                } else {
                    parent.layer.open({
                        content: '操作失败', 
                        yes: function () {
                            parent.layer.closeAll();
                            location.reload();
                        }
                    })
                }

            })
        });
    })
    //新增会籍配置
    $('.membership_allocation_add').click(function () {
        var html = '<label class="col-sm-3 control-label">会籍名称：</label>'
        + '<div class="col-sm-9">'
        + '<input name="name"  class="form-control" placeholder="请输入文本" type="text"><span class="help-block help-name m-b-none"></span> '
        + '</div>'
        + '<label class="col-sm-3 control-label">会籍类型：</label>'
        + '<div class="col-sm-9">'
        + '<select class="form-control" name="httype">'
        + '<option value="1">次卡</option>'
        + '<option  value="2">时长卡</option>'
        + '<option  value="3">基础卡</option>'
        + '</select> <span class="help-block help-httype m-b-none"></span>'
        + '</div>'
        + '<label class="col-sm-3 control-label">时长：</label>'
        + '<div class="col-sm-9">'
        + '<input name="card_long"  onkeyup="value=value.match(/\\d+\\.?\d{0,2}/,\'\')" class="form-control" placeholder="请输入时长（天）" type="text"> <span class="help-block help-card-long m-b-none"></span>'
        + '</div>'
        + '<div class="card_num"><label class="col-sm-3 control-label">次数：</label>'
        + '<div class="col-sm-9">'
        + '<input name="card_num" class="form-control" placeholder="请输入次数" type="text"> <span class="help-block help-card-num m-b-none"> </span>'
        + '</div></div>';
        parent.layer.open({
            area: '550px',
            title: '编辑会籍类型',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes: function (index, layero) {
                var name = parent.$('input[name="name"]').val();
                var httype = parent.$('select[name="httype"]').val();
                var card_long = parent.$('input[name="card_long"]').val();
                var card_num = parent.$('input[name="card_num"]').val();
                if ($.trim(name) == '') {
                    $('.help-name').text('请填写名称');
                } else if ($.trim(card_long) == '') {

                    $('.help-card-long').text('请填写时长');
                } else {

                    if (httype == 1 && $.trim(card_num) == '') {
                        $('.help-card-num').text('请填写次数');
                    } else {

                        $.post(base + 'membership/membership_allocation_add', {
                            'name': name, 
                            'httype': httype, 
                            'card_long': card_long, 
                            'card_num': card_num
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
                                parent.layer.closeAll();
                            }
                        })
                    }
                }

            },
				btn2:function(){
					parent.layer.closeAll();
				}
        });
    })
    
    //选择会籍类型时的操作
    $('select[name="htype"]').change(function(){
        var httype=$('select[name="htype"] option:selected' ).attr('itemtype');
        if(httype==1){//次卡
            $('.iscishu').css("display",'block');
            $('.timelong').css("display",'none');
            $('input[name="length"]').val('');
        }else if(httype==2){//时长卡
            $('.iscishu').css("display",'none');
            $('.timelong').css("display",'none');
            $('input[name="length"]').val('');
            $('input[name="number"]').val('');
        }else if(httype==3){//基础卡
            $('input[name="number"]').val('');
            $('.iscishu').css("display",'none');
            $('.timelong').css("display",'block');
            
        }
        
    })
    //修改会籍配置
    $('.edit_membership_allocation').click(function () {
        var id = $(this).attr('itemid');
        $.post(base + 'membership/membership_allocation_id', {
            'id': id
        }, function (data) {
            if (data == 'no') {

            } else {
                var dataobj = eval('(' + data + ')');
                if (dataobj.card_long == null) {
                    dataobj.card_long = '';
                }
                if (dataobj.num == null) {
                    dataobj.num = '';
                }
                var httype_2 = '', httype_1 = '';
                if (dataobj.httype == 2) {
                    httype_2 = 'selected';
                } else {
                    httype_1 = 'selected';
                }
                var html = '<label class="col-sm-3 control-label">会籍名称：</label>'
                + '<div class="col-sm-9">'
                + '<input name="name" value="' + dataobj.name + '" class="form-control" placeholder="请输入文本" type="text"><span class="help-block help-name m-b-none"></span> '
                + '</div>'
                + '<label class="col-sm-3 control-label">会籍类型：</label>'
                + '<div class="col-sm-9">'
                + '<select class="form-control" name="httype">'
                + '<option ' + httype_1 + ' value="1">次卡</option>'
                + '<option ' + httype_2 + ' value="2">时长卡</option>'
                + '</select> <span class="help-block help-httype m-b-none"></span>'
                + '</div>'
                + '<label class="col-sm-3 control-label">时长：</label>'
                + '<div class="col-sm-9">'
                + '<input name="card_long" value="' + dataobj.card_long + '" onkeyup="value=value.match(/\\d+\\.?\d{0,2}/,\'\')" class="form-control" placeholder="请输入时长（天）" type="text"> <span class="help-block help-card-long m-b-none"></span>'
                + '</div>'
                + '<div class="card_num"><label class="col-sm-3 control-label">次数：</label>'
                + '<div class="col-sm-9">'
                + '<input name="card_num" value="' + dataobj.num + '" class="form-control" placeholder="请输入次数" type="text"> <span class="help-block help-card-num m-b-none"> </span>'
                + '</div></div>';


                parent.layer.open({
                    area: '550px',
                    title: '编辑会籍类型',
                    shadeClose: false, //开启遮罩关闭
					btn: ['确认', '取消'],
                    content: html,
                    yes: function (index, layero) {
                        var name = parent.$('input[name="name"]').val();
                        var httype = parent.$('select[name="httype"]').val();
                        var card_long = parent.$('input[name="card_long"]').val();
                        var card_num = parent.$('input[name="card_num"]').val();
                        if ($.trim(name) == '') {
                            $('.help-name').text('请填写名称');
                        } else if ($.trim(card_long) == '') {
                            $('.help-card-long').text('请填写时长');
                        } else {
                            if (httype == 1 && $.trim(card_num) == '') {
                                $('.help-card-num').text('请填写次数');
                            } else {
                                $.post(base + 'membership/membership_allocation_edit', {
                                    'id': id, 
                                    'name': name, 
                                    'httype': httype, 
                                    'card_long': card_long, 
                                    'card_num': card_num
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
                                        parent.layer.closeAll();
                                    }
                                })
                            }
                        }

                    }
					,
				btn2:function(){
					parent.layer.closeAll();
				}
                });
            }
        })
    })
    //删除会籍卡
    $('.del_membership_allocation').click(function () {
        var id = $(this).attr('itemid');
        parent.layer.confirm('请确认要删除吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            $.post(base + 'membership/membership_allocation_del', {
                'id': id
            }, function (data) {
                if (data == 'ok') {
                    parent.layer.open({
                        content: '操作成功', 
                        yes: function () {
                            parent.layer.closeAll();
                            location.reload();
                        }
                    })
                } else {
                    parent.layer.open({
                        content: '操作失败', 
                        yes: function () {
                            parent.layer.closeAll();
                            location.reload();
                        }
                    })
                }

            })
        });
    })

    //    $('.membership_htype').change(function () {
    //        var httype = $('select[name="htype"]').find('option:selected').attr('itemtype');
    //        if (httype == 1) {
    //            $('.iscishu').css('display', 'block');
    //        } else {
    //            $('.iscishu').css('display', 'none');
    //        }
    //    })

    $('.add_membership').click(function () {
        var hname = $('input[name="hname"]').val();
        var hprice = $('input[name="hprice"]').val();
        var privilege = $('input[name="privilege"]').val();
        var htype = $('select[name="htype"]').val();
        var length = $('input[name="length"]').val();
        var number = $('input[name="number"]').val();
        var stop_not_less = $('input[name="stop_not_less"]').val();
        var expire_remind = $('input[name="expire_remind"]').val();
        var allow_stop = $('input[name="allow_stop"]').val();
        var attribute = $('select[name="attribute"]').val();
        if ($.trim(hname) == '') {
            parent.layer.open({
                content: '请填写会籍名称'
            })
            return;
        }
        if ($.trim(hprice) == '') {
            parent.layer.open({
                content: '请填写会籍价格'
            })
            return;
        }
        if ($.trim(privilege) == '' || htype == 0) {
            parent.layer.open({
                content: '请填写会籍优惠'
            });
            return;
        }
        if ($.trim(htype) == '') {
            parent.layer.open({
                content: '请选择会籍类型'
            })
            return;
        }
       
        var httype = $('select[name="htype"]').find('option:selected').attr('itemtype');
        if (httype == 1) {
            if ($.trim(number) == '') {
                parent.layer.open({
                    content: '请填写次卡类型次数'
                })
                return;
            }
        }
        if (httype == 3) {
            if ($.trim(length) == '') {
                parent.layer.open({
                    content: '请填写会籍时长'
                })
                return;
            }
        }
        if ($.trim(stop_not_less) == '') {
            parent.layer.open({
                content: '请填写停卡不低于天数'
            })
            return;
        }
        if ($.trim(expire_remind) == '') {
            parent.layer.open({
                content: '请填写到期时间提醒天数'
            })
            return;
        }
        if ($.trim(allow_stop) == '') {
            parent.layer.open({
                content: '请填写允许停卡时间天数'
            })
            return;
        }
        if ($.trim(attribute) == '' || attribute == 0) {
            parent.layer.open({
                content: '请选择课程属性'
            })
            return;
        }
        var index = layer.load(0, {
            shade: [0.5, '#000'] //0.1透明度的白色背景
        });
        $.post(base + 'membership/membership_add', $('#membership_add').serialize(), function (data) {
            if (data == 'ok') {
                parent.layer.open({
                    content: '新增成功', 
                    yes: function () {
                        parent.layer.closeAll();
                        window.location.href = base + 'membership/membership_lists';
                    }
                })

            } else {
                parent.layer.open({
                    content: '新增失败', 
                    yes: function () {
                        parent.layer.closeAll();
                        location.reload();
                    }
                })
            }
        })
    })
    $('.edit_membership').click(function () {
        var hname = $('input[name="hname"]').val();
        var hprice = $('input[name="hprice"]').val();
        var privilege = $('input[name="privilege"]').val();
        var htype = $('select[name="htype"]').val();
        var length = $('input[name="length"]').val();
        var number = $('input[name="number"]').val();
        var stop_not_less = $('input[name="stop_not_less"]').val();
        var expire_remind = $('input[name="expire_remind"]').val();
        var allow_stop = $('input[name="allow_stop"]').val();
        var attribute = $('select[name="attribute"]').val();
        if ($.trim(hname) == '') {
            parent.layer.open({
                content: '请填写会籍名称'
            })
            return;
        }
        if ($.trim(hprice) == '') {
            parent.layer.open({
                content: '请填写会籍价格'
            })
            return;
        }
        if ($.trim(privilege) == '' || htype == 0) {
            parent.layer.open({
                content: '请填写会籍优惠'
            });
            return;
        }
        if ($.trim(htype) == '') {
            parent.layer.open({
                content: '请选择会籍类型'
            })
            return;
        }
       
        var httype = $('select[name="htype"]').find('option:selected').attr('itemtype');
        if (httype == 1) {
            if ($.trim(number) == '') {
                parent.layer.open({
                    content: '请填写次卡类型次数'
                })
                return;
            }
        }else if(httype==3){
            if ($.trim(length) == '') {
                parent.layer.open({
                    content: '请填写会籍时长'
                })
                return;
            }
        }
        if ($.trim(stop_not_less) == '') {
            parent.layer.open({
                content: '请填写停卡不低于天数'
            })
            return;
        }
        if ($.trim(expire_remind) == '') {
            parent.layer.open({
                content: '请填写到期时间提醒天数'
            })
            return;
        }
        if ($.trim(allow_stop) == '') {
            parent.layer.open({
                content: '请填写允许停卡时间天数'
            })
            return;
        }
        if ($.trim(attribute) == '' || attribute == 0) {
            parent.layer.open({
                content: '请选择课程属性'
            })
            return;
        }
        var index = layer.load(0, {
            shade: [0.5, '#000'] //0.1透明度的白色背景
        });
        $.post(base + 'membership/membership_edit', $('#membership_edit').serialize(), function (data) {

            if (data == 'ok') {
                parent.layer.open({
                    content: '修改成功', 
                    yes: function () {
                        parent.layer.closeAll();
                        window.location.href = base + 'membership/membership_lists';
                    }
                })

            } else {
                parent.layer.open({
                    content: '修改失败', 
                    yes: function () {
                        parent.layer.closeAll();
                        location.reload();
                    }
                })
            }
        })
    })

})

