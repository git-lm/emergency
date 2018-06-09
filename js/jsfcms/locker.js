$(function () {
    //新增长期柜类型
    $('.add_lockerType').click(function () {
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
                    url: base + 'lockers/DolongLockerTypeAdd',
                    data: data,
                    cache: false,
                    async: false,
                    success: function (data)
                    {
                        if (data == 'ok') {
                            parent.layer.open({
                                content: '添加成功'
                            });
                            window.location.href = base + 'lockers/longLockerTypeLists';
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
    $('.update_lockerType').click(function () {
        var id = $(this).attr('id');
        $.ajax({
            type: "post",
            url: base + 'lockers/GetLockerTypeInfo/' + id,
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
                            url: base + 'lockers/DolongLockerTypeUpdate/' + id,
                            data: data,
                            cache: false,
                            async: false,
                            success: function (data)
                            {
                                if (data == 'ok') {
                                    parent.layer.open({
                                        content: '编辑成功'
                                    });
                                    window.location.href = base + 'lockers/longLockerTypeLists';
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
    $('.longLockerOpen').click(function () {
        var Id = $(this).attr('title');
        //通过长期柜 Id 获取长期柜信息
        $.ajax({
            type: "post",
            url: base + 'lockers/GetlongLockerInfo/' + Id,
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
                        + '<input class="form-control" oninput="GetMemberInfo();" id="OpenPhone" name="Phone" type="text"><span class="help-block m-b-none Phone"></span>'
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
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">租柜时间：</label>'
                        + '<div class="col-sm-7">'
                        + '<input class="form-control" id="StartDate" name="StartDate" onFocus="WdatePicker({dateFmt: \'yyyy-MM-dd\', isShowClear: true, readOnly: true, minDate: \'%y-%M-%d\', maxDate: \'#F{$dp.$D(\\\'EndDate\\\')}\'})" type="text"><span class="help-block m-b-none StartDate"></span>'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">到期时间：</label>'
                        + '<div class="col-sm-7">'
                        + '<input class="form-control" id="EndDate" name="EndDate" onfocus="WdatePicker({dateFmt: \'yyyy-MM-dd\', isShowClear: true, readOnly: true, minDate: \'#F{$dp.$D(\\\'StartDate\\\')}\'})" type="text"><span class="help-block m-b-none EndDate"></span>'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">租柜押金：</label>'
                        + '<div class="col-sm-7">'
                        + '<input class="form-control" name="Deposit" value="' + JsonData['Deposit'] + '" onkeyup="value=value.match(/\\d+\\.?\\d{0,2}/,\'\')" type="text"><span class="help-block m-b-none Deposit"></span>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-3 control-label">租柜价格：</label>'
                        + '<div class="col-sm-7">'
                        + '<p class="form-control-static Price">' + JsonData['Price'] + '</p>'
                        + '<input class="form-control" name="Price" value="' + JsonData['Price'] + '" type="hidden">'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</form>';
                parent.layer.open({
                    area: '550px',
                    title: '长期柜开柜',
                    shadeClose: false, //开启遮罩关闭
					btn: ['确认', '取消'],
                    content: html,
                    yes: function (index, layero) {
                        var Phone = parent.$('input[name="Phone"]').val();
                        var Deposit = parent.$('input[name="Deposit"]').val();
                        var StartDate = parent.$('input[name="StartDate"]').val();
                        var EndDate = parent.$('input[name="EndDate"]').val();
                        if (Phone.trim() == "") {
                            parent.$(".Phone").html("请填写手机");
                            return;
                        } else {
                            parent.$(".Phone").html('');
                            if ($('input[name="MemberName"]').val() == '') {
                                parent.$(".Phone").html("该手机不存在");
                                return;
                            } else {
                                parent.$(".Phone").html('');
                            }
                        }
                        if (StartDate.trim() == "") {
                            parent.$(".StartDate").html("请选择租柜时间");
                            return;
                        } else {
                            parent.$(".StartDate").html("");
                        }
                        if (EndDate.trim() == "") {
                            parent.$(".EndDate").html("请选择到期时间");
                            return;
                        } else {
                            parent.$(".EndDate").html("");
                        }
                        if (Deposit.trim() == "" || Deposit.trim() == 0) {
                            $(".Deposit").html("请填写租柜押金");
                            return;
                        }

                        var data = parent.$(".longLockerOpen").serialize();
                        $.ajax({
                            type: "post",
                            url: base + 'lockers/DolongLockerOpen/' + Id,
                            data: data,
                            cache: false,
                            async: false,
                            success: function (data)
                            {
                                if (data == 'ok') {
                                    parent.layer.open({
                                        content: '开柜成功'
                                    });
                                    window.location.href = base + 'lockers/longLockerLists';
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
    $('.longLockerDown').click(function () {
        var Id = $(this).attr('title');
        //通过长期柜 Id 获取长期柜信息
        $.ajax({
            type: "post",
            url: base + 'lockers/GetlongLockerInfo/' + Id,
            data: '',
            cache: false,
            async: false,
            success: function (data)
            {
                //                alert(data);return;
                var JsonData = eval("(" + data + ")");
                html = '<form class="longLockerDown">'
                        + '<input class="form-control" name="Id" value="' + JsonData['Id'] + '" type="hidden">'
                        + '<div class="col-md-10">'
                        + '<div class="form-group">'
                        + '<label class="col-sm-4 control-label">会员名称：</label>'
                        + '<div class="col-sm-8">'
                        + '<p class="form-control-static">' + JsonData['MemberName'] + '</p>'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-4 control-label">联系方式：</label>'
                        + '<div class="col-sm-8">'
                        + '<p class="form-control-static">' + JsonData['Phone'] + '</p>'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-4 control-label">开始日期：</label>'
                        + '<div class="col-sm-8">'
                        + '<p class="form-control-static">' + JsonData['StartDate'] + '</p>'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-4 control-label">截止日期：</label>'
                        + '<div class="col-sm-8">'
                        + '<p class="form-control-static">' + JsonData['EndDate'] + '</p>'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-4 control-label">租柜金额：</label>'
                        + '<div class="col-sm-8">'
                        + '<p class="form-control-static">' + JsonData['Price'] + '</p>'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-4 control-label">已付押金：</label>'
                        + '<div class="col-sm-8">'
                        + '<p class="form-control-static">' + JsonData['Deposit'] + '</p>'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-4 control-label">逾期时间：</label>'
                        + '<div class="col-sm-8">'
                        + '<p class="form-control-static">' + JsonData['Days'] + '</p>'
                        + '<input class="form-control" name="Days" value="' + JsonData['Days'] + '" type="hidden">'
                        + '</div>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label class="col-sm-4 control-label">滞纳金：</label>'
                        + '<div class="col-sm-8">'
                        + '<p class="form-control-static">' + JsonData['LateFees'] + '</p>'
                        + '<input class="form-control" name="LateFees" value="' + JsonData['LateFees'] + '" type="hidden">'
                        + '</div>'
                        + '</div>'
                        + '<div class="col-sm-10 col-sm-offset-3">'
                        + '<button class="btn btn-primary" onclick="DolongLockerDown(' + JsonData['Id'] + ')" type="button">还柜</button>'
                        + '</div>'
                        + '</div>'
                        + '</form>';
                parent.layer.open({
                    area: '550px',
                    title: '还柜',
                    shadeClose: false, //开启遮罩关闭
                    content: html,
						btn: ['确认', '取消'],
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
    $('.longLockerMaintain').click(function () {
        var Id = $(this).attr('title');
        parent.layer.confirm('您确定要维护吗？', {
            btn: ['确认', '取消'] //按钮
        }, function () {
            $.post(base + 'lockers/DolongLockerMaintain/' + Id, '', function (data) {
                if (data == 'ok') {
                    parent.layer.open({
                        content: '维护成功'
                    });
                    window.location.href = base + 'lockers/longLockerLists';
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
    $('.longLockerMaintaincomplete').click(function () {
        var Id = $(this).attr('title');
        parent.layer.confirm('您确定要取消维护吗？', {
            btn: ['确认', '取消'] //按钮
        }, function () {
            $.post(base + 'lockers/DolongLockerMaintaincomplete/' + Id, '', function (data) {
                if (data == 'ok') {
                    parent.layer.open({
                        content: '取消维护成功'
                    });
                    window.location.href = base + 'lockers/longLockerLists';
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
//获取会员信息
function GetMemberInfo() {
    var Phone = $('input[name="Phone"]').val();
    $.ajax({
        type: "post",
        url: base + 'lockers/GetMemberInfo/' + Phone,
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
function DolongLockerDown(Id) {
    var Days = $('input[name="Days"]').val();
    var LateFees = $('input[name="LateFees"]').val();
    parent.layer.confirm('您确定要还柜吗？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        $.post(base + 'lockers/DolongLockerDown/' + Id, {'Days': Days, 'LateFees': LateFees}, function (data) {
            if (data == 'ok') {
                parent.layer.open({
                    content: '还柜成功'
                });
                window.location.href = base + 'lockers/longLockerLists';
            } else {
                parent.layer.open({
                    content: data
                });
                return;
            }
        })
    });
}