$(function () {
    //添加/编辑 活动
    $('.add_activity').click(function () {
        var aname = $("input[name='aname']").val();
        var activity_id = $("input[name='activity_id']").val();
        var aphoto = $("input[name='aphoto']").val();
        var j_id = $("select[name='j_id']").val();
		
        if ($.trim(aname) == "") {
            parent.layer.open({
                content: '请填写活动名称'
            })
            return false;
        }
        if ($.trim(j_id) == "") {
            parent.layer.open({
                content: '请填写活动教练'
            })
            return false;
        }
        if ($.trim(activity_id) == 0) {
            if ($.trim(aphoto) == "") {
                parent.layer.open({
                    content: '请选择活动图片'
                })
                return false;
            }
        }
        //        var index = layer.load(0, {
        //            shade: [0.5, '#000'] //0.1透明度的白色背景
        //        });
       
        $('#activity_add').ajaxSubmit({
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
                    window.location.href = base + 'activity/activity_lists';
                } else {
                    parent.layer.open({
                        content: '操作失败',
                        yes: function () {
                            parent.layer.closeAll();
                        }
                    })

                }

            }
        })
    })
    
    //删除课程
    $('.del_activity').click(function () {
        var activity_id = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['已经不需要了', '再考虑一下'] //按钮
        }, function () {
            $.post(base + 'activity/del_activity', {
                'activity_id': activity_id
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