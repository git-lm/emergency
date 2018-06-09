$(function () {
    function getTrain(data,readOnly){
        var html = '';
        html = '<div class="col-md-12">'
        + '<div class="form-group">'
        + '<label class="col-sm-2 control-label" style="padding-right:0px;"><span style="color:#f00;">*</span>名  称：</label>'
        + '<div class="col-sm-10">'
        + '<input type="text" name="name" value="'+data.name+'" '+readOnly+' class="form-control" placeholder="请输入名称" style="margin-bottom:10px;">'
        + '<span class="name-help-block m-b-none"></span>'
        + '</div>'
        + '</div>'
        + '<div class="form-group">'
        + '<label class="col-sm-2 control-label" style="padding-right:0px;"><span style="color:#f00;">*</span>简 写：</label>'
        + '<div class="col-sm-10">'
        + '<input type="text" name="shorthand" class="form-control" value="'+data.shorthand+'" '+readOnly+' placeholder="请输入简写" style="margin-bottom:10px;">'
        + '<span class="shorthand-help-block m-b-none"></span>'
        + '</div>'
        + '</div>'
        + '<div class="form-group">'
        + '<label class="col-sm-2 control-label" style="padding-right:0px;"><span style="color:#f00;">*</span>简 介：</label>'
        + '<div class="col-sm-10">'
        + '<textarea name="brief" class="form-control" placeholder="请输入简介" style="height: 100px;" '+readOnly+'>'+data.brief+'</textarea>'
        + '<span class="brief-help-block m-b-none"></span>'
        + '</div>'
        + '</div>'
        + '</div>';
        return html;
    }
    //新增训练数据
    $('.add_train').click(function () {
        var data = {
            name: '',
            shorthand: '',
            brief: ''
        },
        html = getTrain(data,'');
        parent.layer.open({
            area: '550px',
            title: '新增训练数据',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes: function (index, layero) {
                var $$ = parent.$;
                var name = $$('input[name="name"]').val(),
                shorthand = $$('input[name="shorthand"]').val(),
                brief = $$('textarea[name="brief"]').val();
                if ($.trim(name) == '') {
                    $$('.name-help-block').text('请填写名称');
                    return false;
                }
                if ($.trim(shorthand) == '') {
                    $$('.shorthand-help-block').text('请填写简写');
                    return false;
                }
                if ($.trim(brief) == '') {
                    $$('.brief-help-block').text('请填写简介');
                    return false;
                }
                $.post(base + 'train/add_train', {
                    name: name,
                    shorthand: shorthand,
                    brief: brief
                }, function (data) {
                    console.log(data);
                    var result = $.parseJSON(data);
                    if (result.success) {
                        parent.layer.open({
                            content: result.msg, 
                            yes: function () {
                                parent.layer.closeAll();
                                location.reload();
                            }
                        })
                } else {
                    parent.layer.open({
                        content: result.msg
                        })
                }
                });
                    

        },
				btn2:function(){
					parent.layer.closeAll();
				}
        });
    });
//编辑训练数据
$('.edit_train').click(function () {
    var train_id = $(this).attr('itemid');

    $.post(base + 'train/get_train', {
        train_id: train_id
    }, function (data) {
        var result = $.parseJSON(data);
        if (!result.success) {
            parent.layer.open({
                content: '训练数据不存在'
            });
            return;
        }
        var html = getTrain(result.data,'');
        parent.layer.open({
            area: '550px',
            title: '编辑训练数据',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes: function (index, layero) {
                var $$ = parent.$;
                var name = $$('input[name="name"]').val(),
                shorthand = $$('input[name="shorthand"]').val(),
                brief = $$('textarea[name="brief"]').val();
                if ($.trim(name) == '') {
                    $$('.name-help-block').text('请填写名称');
                    return false;
                }
                if ($.trim(shorthand) == '') {
                    $$('.shorthand-help-block').text('请填写简写');
                    return false;
                }
                if ($.trim(brief) == '') {
                    $$('.brief-help-block').text('请填写简介');
                    return false;
                }
                $.post(base + 'train/edit_train', {
                    name: name,
                    shorthand: shorthand,
                    brief: brief,
                    train_id: train_id
                }, function (data) {
                    var result = $.parseJSON(data);
                    if (result.success) {
                        parent.layer.open({
                            content: result.msg, 
                            yes: function () {
                                parent.layer.closeAll();
                                location.reload();
                            }
                        })
                } else {
                    parent.layer.open({
                        content: result.msg
                        })
                }
                });

        },
				btn2:function(){
					parent.layer.closeAll();
				}
        });

    });

})
//查看训练数据
$('.view_train').click(function () {
    var train_id = $(this).attr('itemid');

    $.post(base + 'train/get_train', {
        train_id: train_id
    }, function (data) {
        var result = $.parseJSON(data);
        if (!result.success) {
            parent.layer.open({
                content: '训练数据不存在'
            });
            return;
        }
        var html = getTrain(result.data,'readonly="readonly" ');
            
        parent.layer.open({
            area: '550px',
            title: '查看训练数据',
            shadeClose: true, //开启遮罩关闭
            content: html
        });

    });

});
    
//删除训练数据
$('.del_train').click(function () {
    var train_id = $(this).attr('itemid');
    parent.layer.confirm('您确定要删除吗？', {
        btn: ['已经不需要了', '再考虑一下'] //按钮
    }, function () {
        $.post(base + 'train/del_train', {
            train_id:train_id
        }, function (data) {
            var result = $.parseJSON(data);
            if (result.success) {
                parent.layer.open({
                    content: result.msg, 
                    yes: function () {
                        parent.layer.closeAll();
                        location.reload();
                    }
                })
        } else {
            parent.layer.open({
                content: result.msg
                })
        }

        })
    });
});
})


