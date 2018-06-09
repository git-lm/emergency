$(function () {
    //新增日常支出
    $('.add_expenditure').click(function () {
        html = '<form class="add_expenditure">'
        +'<div class="col-md-12">'
        +'<div class="form-group">'
        +'<label class="col-sm-3 control-label">类型：</label>'
        +'<div class="col-sm-7">'
        +'<select class="form-control" name="type">'
        +'<option value="4">房屋租赁支出</option>'
        +'<option value="5">水电支出</option>'
        +'<option value="6">物业支出</option>'
        +'<option value="10">广告支出</option>'
        +'</select>'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-3 control-label">费用：</label>'
        +'<div class="col-sm-7">'
        +'<input class="form-control" name="cost" onkeyup="value=value.match(/\\d+\\.?\\d{0,2}/,\'\')" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-3 control-label">用途：</label>'
        +'<div class="col-sm-7">'
        +'<input class="form-control" name="purpose" type="text">'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</form>';
        parent.layer.open({
            area: '550px',
            title: '新增日常支出',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes: function (index, layero) {
                var cost = $$('input[name="cost"]').val();
                var purpose = $$('input[name="purpose"]').val();
                if(cost.trim() == ''){
                    parent.layer.open({
                        content: '请输入费用'
                    });
                    return;
                }
                if(purpose.trim() == ''){
                    parent.layer.open({
                        content: '请输入用途'
                    });
                    return;
                }
                var data = $$(".add_expenditure").serialize();
                $.ajax({
                    type: "post",
                    url: base + 'expenditure/DoAddExpenditure',
                    data:data,
                    cache: false,
                    async: false,
                    success: function (data)
                    {
                        if(data == 'ok'){
                            parent.layer.open({
                                content: '添加成功'
                            });
                            window.location.href=base+'expenditure/ListExpenditure';
                        }else{
                            parent.layer.open({
                                content: data
                            });
                            return;
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("请求失败！");
                    }
                });
            },
				btn2:function(){
					parent.layer.closeAll();
				}
        });
    })
    
    //删除日常支出
    $('.deleteExpenditure').click(function () {
        var id = $(this).attr('id');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['确认', '取消'] //按钮
        }, function () {
            $.ajax({
                type: "post",
                url: base + 'expenditure/DoDeleteExpenditure/'+id,
                data:'',
                cache: false,
                async: false,
                success: function (data)
                {
                    if(data == 'ok'){
                        parent.layer.open({
                            content: '删除成功'
                        });
                        window.location.href=base+'expenditure/ListExpenditure';
                    }else{
                        parent.layer.open({
                            content: data
                        });
                        return;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("请求失败！");
                }
            });
        });
    });
    
    
    //新增后勤支出
    $('.add_logistics').click(function () {
        html = '<form class="add_logistics">'
        +'<div class="col-md-12">'
        +'<div class="form-group">'
        +'<label class="col-sm-3 control-label">名称：</label>'
        +'<div class="col-sm-7">'
        +'<input class="form-control" name="name" type="text">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label class="col-sm-3 control-label">费用：</label>'
        +'<div class="col-sm-7">'
        +'<input class="form-control" name="price" onkeyup="value=value.match(/\\d+\\.?\\d{0,2}/,\'\')" type="text">'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</form>';
        parent.layer.open({
            area: '550px',
            title: '新增后勤支出',
            shadeClose: false, //开启遮罩关闭
            content: html,
				btn: ['确认', '取消'],
            yes: function (index, layero) {
                var name = $$('input[name="name"]').val();
                var price = $$('input[name="price"]').val();
                if(name.trim() == ''){
                    parent.layer.open({
                        content: '请输入名称'
                    });
                    return;
                }
                if(price.trim() == ''){
                    parent.layer.open({
                        content: '请输入费用'
                    });
                    return;
                }
                var data = $$(".add_logistics").serialize();
                $.ajax({
                    type: "post",
                    url: base + 'expenditure/DoAddLogistics',
                    data:data,
                    cache: false,
                    async: false,
                    success: function (data)
                    {
                        if(data == 'ok'){
                            parent.layer.open({
                                content: '添加成功'
                            });
                            window.location.href=base+'expenditure/ListLogistics';
                        }else{
                            parent.layer.open({
                                content: data
                            });
                            return;
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("请求失败！");
                    }
                });
            },
				btn2:function(){
					parent.layer.closeAll();
				}
        });
    })
    
    //删除后勤支出
    $('.deleteLogistics').click(function () {
        var id = $(this).attr('id');
        parent.layer.confirm('您确定要删除吗？', {
            btn: ['确认', '取消'] //按钮
        }, function () {
            $.ajax({
                type: "post",
                url: base + 'expenditure/DoDeleteLogistics/'+id,
                data:'',
                cache: false,
                async: false,
                success: function (data)
                {
                    if(data == 'ok'){
                        parent.layer.open({
                            content: '删除成功'
                        });
                        window.location.href=base+'expenditure/ListLogistics';
                    }else{
                        parent.layer.open({
                            content: data
                        });
                        return;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("请求失败！");
                }
            });
        });
    });
    
    
    
});