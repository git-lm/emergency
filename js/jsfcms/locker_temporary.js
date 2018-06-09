//获取会员信息
function GetMemberInfo_Temporary() {
    var Phone = $('input[name="Phone"]').val();
    $.ajax({
        type: "post",
        url: base + 'lockersTemporary/GetMemberInfo/' + Phone,
        data: '',
        cache: false,
        async: false,
        success: function (data)
        {
            if (data != '') {
                var JsonData = eval("(" + data + ")");
                parent.$(".MemberName").text(JsonData['Name']);
                parent.$('input[name="MemberName"]').val(JsonData['Name']);
                parent.$('input[name="MemberId"]').val(JsonData['Id']);
                parent.$(".Phone").html('');
            } else {
                parent.$(".MemberName").text('');
                parent.$('input[name="MemberName"]').val('');
                parent.$('input[name="MemberId"]').val('');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });

}
//执行还柜操作
function DolongLockerDown_Temporary(Id) {

    parent.layer.confirm('您确定要还柜吗？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        $.post(base + 'lockersTemporary/DolongLockerDown/' + Id, '', function (data) {
            if (data == 'ok') {
                parent.layer.open({
                    content: '还柜成功'
                });
                location.href = base + 'lockersTemporary/longLockerLists';
            } else {
                parent.layer.open({
                    content: data
                });
                return;
            }
        })
    });
}
$(function () {
    //新增长期柜类型
    $('.add_lockerType_Temporary').click(function () {
        html = '<form class="add_lockerType">'
                + '<div class="col-md-12">'
                + '<div class="form-group">'
                + '<label class="col-sm-3 control-label">类型名称：</label>'
                + '<div class="col-sm-7">'
                + '<input class="form-control" title="类型名称" name="Name" type="text">'
                + '</div>'
                + '</div>'
                + '<div class="form-group">'
                + '<label class="col-sm-3 control-label">价格：</label>'
                + '<div class="col-sm-7">'
                + '<input class="form-control" title="价格" name="Price" onkeyup="value=value.match(/\\d+\\.?\\d{0,2}/,\'\')" type="text">'
                + '</div>'
                + '</div>'
                + '<div class="form-group">'
                + '<label class="col-sm-3 control-label">押金：</label>'
                + '<div class="col-sm-7">'
                + '<input class="form-control" title="押金" name="Deposit" onkeyup="value=value.match(/\\d+\\.?\\d{0,2}/,\'\')" type="text">'
                + '</div>'
                + '</div>'
                + '<div class="form-group">'
                + '<label class="col-sm-3 control-label">滞纳金：</label>'
                + '<div class="col-sm-7">'
                + '<input class="form-control" title="滞纳金" name="LateFee" onkeyup="value=value.match(/\\d+\\.?\\d{0,2}/,\'\')" type="text">'
                + '</div>'
                + '</div>'
                + '<div class="form-group">'
                + '<label class="col-sm-3 control-label">租柜编号：</label>'
                + '<div class="col-sm-2">'
                + '<input class="form-control" title="租柜编号" name="Code" type="text">'
                + '</div>'
                + '<div class="col-sm-2">'
                + '<input class="form-control" title="租柜编号" name="StartNum" onkeyup="value=value.match(/\\d/,\'\')" type="text">'
                + '</div>'
                + '<div class="col-sm-2">'
                + '<input class="form-control" title="租柜编号" name="EndNum" onkeyup="value=value.match(/\\d/,\'\')" type="text">'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</form>';
        parent.layer.open({
            area: '550px',
            title: '新增长期柜类型',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes: function (index, layero) {
                var arr = new Array();
                arr['Name'] = parent.$('input[name="Name"]').val();
                arr['Price'] = parent.$('input[name="Price"]').val();
                arr['Deposit'] = parent.$('input[name="Deposit"]').val();
                arr['LateFee'] = parent.$('input[name="LateFee"]').val();
                arr['Code'] = parent.$('input[name="Code"]').val();
                arr['StartNum'] = parent.$('input[name="StartNum"]').val();
                arr['EndNum'] = parent.$('input[name="EndNum"]').val();

                for (var tmp in arr) {
                    if (arr[tmp] == "") {
                        parent.layer.open({
                            content: '请输入' + $('input[name="' + tmp + '"]').attr('title')
                        });
                        return;
                    }
                }

                var data = parent.$(".add_lockerType").serialize();
                $.ajax({
                    type: "post",
                    url: base + 'lockersTemporary/DolongLockerTypeAdd',
                    data: data,
                    cache: false,
                    async: false,
                    success: function (data)
                    {
                        if (data == 'ok') {
                            parent.layer.open({
                                content: '添加成功'
                            });
                            window.location.href = base + 'lockersTemporary/longLockerTypeLists';
                        } else {
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

    //编辑长期柜类型
    $('.update_lockerType_Temporary').click(function () {
        var id = $(this).attr('id');
        $.ajax({
            type: "post",
            url: base + 'lockersTemporary/GetLockerTypeInfo/' + id,
            data: '',
            cache: false,
            async: false,
            success: function (data)
            {
                var data = eval("(" + data + ")");
                html = '<form class="update_lockerType">'
                        + '<div class="col-md-12">'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">类型名称：</label>'
                        + '<div class="col-sm-7">'
                        + '<input class="form-control" title="类型名称" name="Name" type="text" value="' + data['Name'] + '">'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">价格：</label>'
                        + '<div class="col-sm-7">'
                        + '<input class="form-control" title="价格" name="Price" value="' + data['Price'] + '" onkeyup="value=value.match(/\\d+\\.?\\d{0,2}/,\'\')" type="text">'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">押金：</label>'
                        + '<div class="col-sm-7">'
                        + '<input class="form-control" title="押金" name="Deposit" value="' + data['Deposit'] + '" onkeyup="value=value.match(/\\d+\\.?\\d{0,2}/,\'\')" type="text">'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">滞纳金：</label>'
                        + '<div class="col-sm-7">'
                        + '<input class="form-control" title="滞纳金" name="LateFee" value="' + data['LateFee'] + '" onkeyup="value=value.match(/\\d+\\.?\\d{0,2}/,\'\')" type="text">'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">租柜编号：</label>'
                        + '<div class="col-sm-2">'
                        + '<input class="form-control" title="租柜编号" name="Code" value="' + data['Code'] + '" type="text">'
                        + '</div>'
                        + '<div class="col-sm-2">'
                        + '<input class="form-control" title="租柜编号" name="StartNum" value="' + data['StartNum'] + '" onkeyup="value=value.match(/\\d/,\'\')" type="text">'
                        + '</div>'
                        + '<div class="col-sm-2">'
                        + '<input class="form-control" title="租柜编号" name="EndNum" value="' + data['EndNum'] + '" onkeyup="value=value.match(/\\d/,\'\')" type="text">'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</form>';
                parent.layer.open({
                    area: '550px',
                    title: '编辑长期柜类型',
                    shadeClose: false, //开启遮罩关闭
                    content: html,
						btn: ['确认', '取消'],
                    yes: function (index, layero) {
                        var arr = new Array();
                        arr['Name'] = parent.$('input[name="Name"]').val();
                        arr['Price'] = parent.$('input[name="Price"]').val();
                        arr['Deposit'] = parent.$('input[name="Deposit"]').val();
                        arr['LateFee'] = parent.$('input[name="LateFee"]').val();
                        arr['Code'] = parent.$('input[name="Code"]').val();
                        arr['StartNum'] = parent.$('input[name="StartNum"]').val();
                        arr['EndNum'] = parent.$('input[name="EndNum"]').val();

                        for (var tmp in arr) {
                            if (arr[tmp] == "") {
                                parent.layer.open({
                                    content: '请输入' + $('input[name="' + tmp + '"]').attr('title')
                                });
                                return;
                            }
                        }

                        var data = parent.$(".update_lockerType").serialize();
                        $.ajax({
                            type: "post",
                            url: base + 'lockersTemporary/DolongLockerTypeUpdate/' + id,
                            data: data,
                            cache: false,
                            async: false,
                            success: function (data)
                            {
                                if (data == 'ok') {
                                    parent.layer.open({
                                        content: '编辑成功'
                                    });
                                    window.location.href = base + 'lockersTemporary/longLockerTypeLists';
                                } else {
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
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求失败！");
            }
        });
        return;

    });

    //长期柜开柜
    $('.longLockerOpen_Temporary').click(function () {
        var Id = $(this).attr('title');
        //通过长期柜 Id 获取长期柜信息
        $.ajax({
            type: "post",
            url: base + 'lockersTemporary/GetlongLockerInfo/' + Id,
            data: '',
            cache: false,
            async: false,
            success: function (data)
            {
                var JsonData = eval("(" + data + ")");
                html = '<form class="longLockerOpen">'
                        + '<div class="col-md-12">'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">手机号码：</label>'
                        + '<div class="col-sm-7">'
                        + '<input class="form-control" oninput="GetMemberInfo_Temporary();" id="OpenPhone" name="Phone" type="text"><span class="help-block m-b-none Phone"></span>'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">会员名称：</label>'
                        + '<div class="col-sm-7">'
                        + '<p class="form-control-static MemberName"></p>'
                        + '<input class="form-control" name="MemberName" type="hidden">'
                        + '<input class="form-control" name="MemberId" type="hidden">'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</form>';
                parent.layer.open({
                    area: '550px',
                    title: '临时柜开柜',
                    shadeClose: false, //开启遮罩关闭
					btn: ['确认', '取消'],
                    content: html,
                    yes: function (index, layero) {
                        var Phone = parent.$('input[name="Phone"]').val();
                        if (Phone.trim() == "") {
                            parent.$(".Phone").html("请填写手机");
                            return;
                        } else {
                            parent.$(".Phone").html('');
                            if (parent.$('input[name="MemberName"]').val() == '') {
                                parent.$(".Phone").html("该手机不存在");
                                return;
                            } else {
                                parent.$(".Phone").html('');
                            }
                        }

                        var data = parent.$(".longLockerOpen").serialize();
                        $.ajax({
                            type: "post",
                            url: base + 'lockersTemporary/DolongLockerOpen/' + Id,
                            data: data,
                            cache: false,
                            async: false,
                            success: function (data)
                            {
                                if (data == 'ok') {
                                    parent.layer.open({
                                        content: '开柜成功'
                                    });
                                    window.location.href = base + 'lockersTemporary/longLockerLists';
                                } else {
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


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求失败！");
            }
        });
    })

    //查看与还柜
    $('.longLockerDown_Temporary').click(function () {
        var Id = $(this).attr('title');
        //通过长期柜 Id 获取长期柜信息
        $.ajax({
            type: "post",
            url: base + 'lockersTemporary/GetlongLockerInfo/' + Id,
            data: '',
            cache: false,
            async: false,
            success: function (data)
            {
                //                alert(data);return;
                var JsonData = eval("(" + data + ")");
                html = '<form class="longLockerDown">'
                        + '<input class="form-control" name="Id" value="' + JsonData['Id'] + '" type="hidden">'
                        + '<div class="col-md-12">'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">会员名称：</label>'
                        + '<div class="col-sm-7">'
                        + '<p class="form-control-static">' + JsonData['MemberName'] + '</p>'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">联系方式：</label>'
                        + '<div class="col-sm-7">'
                        + '<p class="form-control-static">' + JsonData['Phone'] + '</p>'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">开始时间：</label>'
                        + '<div class="col-sm-7">'
                        + '<p class="form-control-static">' + JsonData['AddTime'] + '</p>'
                        + '</div>'
                        + '</div>'
                        + '<div class="col-sm-9 col-sm-offset-3">'
                        + '<button class="btn btn-primary" onclick="DolongLockerDown_Temporary(' + JsonData['Id'] + ')" type="button">还柜</button>'
                        + '</div>'
                        + '</div>'
                        + '</form>';
                parent.layer.open({
                    area: '550px',
                    title: '还柜',
                    shadeClose: false, //开启遮罩关闭
					btn: ['确认', '取消'],
                    content: html,
                    yes: function (index, layero) {

                    },
				btn2:function(){
					parent.layer.closeAll();
				}
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求失败！");
            }
        });
    })

    //维护
    $('.longLockerMaintain_Temporary').click(function () {
        var Id = $(this).attr('title');
        parent.layer.confirm('您确定要维护吗？', {
            btn: ['确认', '取消'] //按钮
        }, function () {
            $.post(base + 'lockersTemporary/DolongLockerMaintain/' + Id, '', function (data) {
                if (data == 'ok') {
                    parent.layer.open({
                        content: '维护成功'
                    });
                    window.location.href = base + 'lockersTemporary/longLockerLists';
                } else {
                    parent.layer.open({
                        content: data
                    });
                    return;
                }
            })
        });
    })

    //维护完成
    $('.longLockerMaintaincomplete_Temporary').click(function () {
        var Id = $(this).attr('title');
        parent.layer.confirm('您确定要取消维护吗？', {
            btn: ['确认', '取消'] //按钮
        }, function () {
            $.post(base + 'lockersTemporary/DolongLockerMaintaincomplete/' + Id, '', function (data) {
                if (data == 'ok') {
                    parent.layer.open({
                        content: '取消维护成功'
                    });
                    window.location.href = base + 'lockersTemporary/longLockerLists';
                } else {
                    parent.layer.open({
                        content: data
                    });
                    return;
                }
            })
        });
    })

});
