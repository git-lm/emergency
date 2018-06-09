$(function () {
    /*
     *检测该手机是否已经是会员
     **/
    $('.check_mtel').click(function () {
        var mtel = $('input[name="mtel"]').val().trim();
        var re = /^1[3|4|5|8][0-9]\d{8}$/;
        if (mtel == "") {
            parent.layer.open({
                content: "请输入手机号码"
            })
            return;
        } else {
            if (!re.test(mtel)) {
                parent.layer.open({
                    content: "手机格式不正确"
                })
                return;
            }
        }
        $.post(base+"member/check_mtel",{
            'mtel':mtel
        },function(data){
            if(data!="ok"){
                
                //                var html='<div class="col-md-12">'+
                //                '<div class="form-group">'+
                //                '<div class="col-sm-9">'+
                //                '<p class="form-control-static">该手机号码已注册</p>'+
                //                '<a onclick="tz_minfo('+data+')"  href="javascript:void(0)">点击查看</a>'+
                //                '</div>'+
                //                '</div>'+
                //                '</div>';
                parent.layer.confirm('该手机号码已注册', {
                    btn: ['我知道了', '查看信息'] //按钮
                }, function () {
                    parent.layer.closeAll();
                },
                function(){
                    window.location.href=base+"member/member_info/"+data;
                });
                return;
            }else{
                parent.layer.open({
                    content:"该手机号码可以使用"
                })
           
            }

        })
    })

    
    $('.add_member').click(function () {

        var mname = $('input[name="mname"]').val();
        if ($.trim(mname) == '') {
            parent.layer.open({
                content: '请填写名称'
            })
            return;
        }
        //        var index = layer.load(0, {
        //            shade: [0.5, '#000'] //0.1透明度的白色背景
        //        });
        $.post(base + 'member/member_add', $('#member_add').serialize(), function (data) {

            if (data == 'ok') {
                parent.layer.open({
                    content: '添加成功',
                    yes: function () {
                        parent.layer.closeAll();
                        location.href = base + 'member/member_lists';
                    }
                })
            } else {
                parent.layer.closeAll();
                parent.layer.open({
                    content: '添加失败'
                })

                return;
            }
        })
    })
    $('.member_buy_hjk').click(function () {
        var h_id = $('select[name="h_id"]').val();
        var discount_checkbox = $('input[name="discount_checkbox"]:checked').val();
        var discount = $('input[name="discount"]').val();
        var isgive_checkbox = $('input[name="isgive_checkbox"]:checked').val();
        var isgvie_val = $('input[name="isgvie_val"]').val();
        var contract_num = $('input[name="contract_num"]').val();
        var contract_url = $('input[name="contract_url"]').val();
        var contract_select = $('select[name="contract_select"]').val();
        if ($.trim(h_id) == '0') {
            parent.layer.open({
                content: '请选择会籍卡'
            })
            return;
        }
        if (discount_checkbox == 1) {
            if ($.trim(discount) == '') {
                parent.layer.open({
                    content: '请填写打折额度'
                })
                return;
            }
        }
        if (isgive_checkbox == 1) {
            if ($.trim(isgvie_val) == '') {
                parent.layer.open({
                    content: '请输入赠送时间或次数'
                })
                return;
            }
        }
        if (contract_select == 0) {
            parent.layer.open({
                content: '请选择合同模版'
            })
            return;
        }
        if ($.trim(contract_num) == '') {
            parent.layer.open({
                content: '请填写合同编号'
            })
            return;
        }
        if ($.trim(contract_url) == '') {
            parent.layer.open({
                content: '请上传合同'
            })
            return;
        }
        var index = layer.load(0, {
            shade: [0.5, '#000'] //0.1透明度的白色背景
        });

        $("#member_buy_hjk").ajaxSubmit({
            type: "post",
            success: function (data) {
                if (data == "ok") {
                    parent.layer.open({
                        content: '提交成功，请耐心等待审核',
                        yes: function () {
                            parent.layer.closeAll();
                            window.location.reload();
                        }
                    })
                }else{
                    alert(data);
                }

            }

        })
    })
    /*
 * 会籍卡选择事件
 **/
    $('select[name="h_id"]').change(function(){
        //        var htype=$('select[name="h_id"] option:selected').attr('itemtype');
        var htype=$('select[name="h_id"]').val();
        if(htype=='0'){
            $('#httype').text("");   
            return;
        }
        $.post(base+"member/check_hjktype",{
            "htype":htype
        },function(data){
            var info=$.parseJSON(data);
            var httype=info.httype;
            var hprice=info.hprice;
            var privilege=info.privilege;
            if(privilege==0){
                privilege="无优惠折扣";
            }else{
                privilege=privilege*1/10+"折";
            }
            if(httype=="1"){
                $('#httype').text("次");   
            }else{
                $('#httype').text("天");   
            }
            $('input[name="httype"]').val(httype);
            $("#privilege").html(privilege);
            $("#hprice").html(hprice+"元");
                
        })
    
    })

    /*
     *checkbox点击事件
     **/
    $('#discount_checkbox').change(function () {
        var dc = $(this).is(':checked')
        if (dc) {
            $('input[name="discount"]').attr("disabled", false);
        } else {
            $('input[name="discount"]').attr("disabled", true);
            $('input[name="discount"]').val("");
        }
    })
    $('#isgive_checkbox').change(function () {
        var dc = $(this).is(':checked')
        if (dc) {
            $('input[name="isgvie_val"]').attr("disabled", false);
        } else {
            $('input[name="isgvie_val"]').attr("disabled", true);
            $('input[name="isgvie_val"]').val("");
        }
    })


    $('.update_member').click(function () {

        var mname = $('input[name="mname"]').val();
        var ffqk = $('input[name="ffqk"]').val();
        if ($.trim(mname) == '') {
            parent.layer.open({
                content: '请填写名称'
            })
            return;
        }
        var index = layer.load(0, {
            shade: [0.5, '#000'] //0.1透明度的白色背景
        });
        $.post(base + 'member/member_info', $('#member_update').serialize(), function (data) {
            if (data == 'ok') {
                parent.layer.open({
                    content: '修改成功',
                    yes: function () {
                        parent.layer.closeAll();
                        if (ffqk == 1) {
                            window.location.href = base + 'member/member_lists';
                        } else {
                            window.location.href = base + 'member/member_unpaid_lists';
                        }


                    }
                })
            } else {
                parent.layer.open({
                    content: '添加失败'
                })
                parent.layer.closeAll();
                return;
            }
        })
    })
    $('.member_sign_coach').click(function () {
        var logintype='{logintype}';
        var j_id ="";
        if(logintype==1){//管理员登陆
            j_id = $('select[name="j_id"]').val();
        }else{//私教登陆
            j_id='{u_id}';
        }
        var sign_begin_time = $('input[name="sign_begin_time"]').val();
        var sign_end_time = $('input[name="sign_end_time"]').val();
        var contract_select=$('select[name="contract_select"]').val();
        var isgive_checkbox = $('input[name="isgive_checkbox"]:checked').val();
        var give_end_time = $('input[name="isgvie_val"]').val();
        var contract_num = $('input[name="contract_num"]').val();
        var contract_url = $('input[name="contract_url"]').val();
        var discount_checkbox = $('input[name="discount_checkbox"]:checked').val();
        var discount = $('input[name="discount"]').val();
        var price = $('input[name="price"]').val();
        var class_hour = $('input[name="class_hour"]').val();

        if ($.trim(j_id) == '') {
            parent.layer.open({
                content: '请选择教练'
            })
            return;
        }
        if ($.trim(sign_begin_time) == '') {
            parent.layer.open({
                content: '请输入私教开始时间'
            })
            return;
        }
        if ($.trim(sign_end_time) == '') {
            parent.layer.open({
                content: '请输入私教结束时间'
            })
            return;
        }
        if ($.trim(price) == '') {
            parent.layer.open({
                content: '请输入私教总价'
            })
            return;
        }
        if ($.trim(class_hour) == '') {
            parent.layer.open({
                content: '请输入课时'
            })
            return;
        }
        if (isgive_checkbox == 1) {
            if ($.trim(give_end_time) == '') {
                parent.layer.open({
                    content: '请输入赠送'
                })
                return;
            }
        }
        if (discount_checkbox == 1) {
            if ($.trim(discount) == '') {
                parent.layer.open({
                    content: '请填写打折额度'
                })
                return;
            }
        }

        if (contract_select == 0) {
            parent.layer.open({
                content: '请选择合同模版'
            })
            return;
        }
        if ($.trim(contract_num) == '') {
            parent.layer.open({
                content: '请填写合同编号'
            })
            return;
        }
        if ($.trim(contract_url) == '') {
            parent.layer.open({
                content: '请上传合同'
            })
            return;
        }

        parent.layer.confirm('确认添加私教？', {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $("#member_sign_coach").ajaxSubmit({
                type: "post",
                success: function (data) {
                    if (data == "ok") {
                        parent.layer.open({
                            content: '提交成功，请耐心等待审核',
                            yes: function () {
                                parent.layer.closeAll();
                                window.location.reload();
                            }
                        })
                    }

                }

            })

        });

    })
    //新增会员动态
    $('.dynamics_add').click(function () {
        var html = '<label class="col-sm-4 control-label">会员动态类型：</label>'
        + '<div class="col-sm-8">'
        + '<input  class="form-control" name="dname" placeholder="请输入会员动态" type="text">'
        + '<span class="help-block m-b-none"></span>'
        + '</div>';
        parent.layer.open({
            area: '450px',
            title: '新增会员动态',
            shadeClose: false, //开启遮罩关闭
            btn: ['确认', '取消'],
            content: html,
            yes: function (index, layero) {
                var name = parent.$('input[name="dname"]').val();
                if ($.trim(name) == '') {
                    parent.$('.help-block').text('请填写会员动态');
                } else {
                    $.post(base + 'member/dynamics_add', {
                        'name': name
                    }, function (data) {
                        if (data == 'ok') {
                            parent.layer.open({
                                content: '保存成功',
                                yes: function () {
                                    parent.layer.closeAll();
                                    location.reload();
                                }
                            })
                        } else if (data == 'cz') {
                            parent.layer.open({
                                content: '该类型已存在'
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
    $('.update_dynamics').click(function () {
        var name = $(this).parent().parent().find('td:first').text();
        var id = $(this).attr('itemid');
        var html = '<label class="col-sm-4 control-label">会员动态类型：</label>'
        + '<div class="col-sm-8">'
        + '<input  class="form-control" value="' + name + '" name="dname" placeholder="请输入会员动态" type="text">'
        + '<span class="help-block m-b-none"></span>'
        + '</div>';
        parent.layer.open({
            area: '450px',
            title: '修改会员动态',
            shadeClose: false, //开启遮罩关闭
            content: html,
            btn: ['确认', '取消'],
            yes: function (index, layero) {
                var name = $$('input[name="dname"]').val();
                if ($.trim(name) == '') {
                    parent.$('.help-block').text('请填写会员动态');
                } else {
                    $.post(base + 'member/dynamics_update', {
                        'name': name,
                        'id': id
                    }, function (data) {
                        if (data == 'ok') {
                            parent.layer.open({
                                content: '更新成功',
                                yes: function () {
                                    parent.layer.closeAll();
                                    location.reload();
                                }
                            })
                        } else if (data == 'cz') {
                            parent.layer.open({
                                content: '该类型已存在'
                            })
                        } else {
                            parent.layer.open({
                                content: '更新失败'
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
    //删除会员动态
    $('.del_dynamics').click(function () {
        var id = $(this).attr('itemid');
        parent.layer.confirm('您确定要删除？', {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $.post(base + 'member/del_dynamics', {
                'id': id
            }, function (data) {
                if (data == 'ok') {
                    parent.layer.closeAll();
                    parent.layer.open({
                        content: '删除成功'
                    })
                    location.reload();
                } else {
                    parent.layer.closeAll();
                    parent.layer.open({
                        content: '删除失败'
                    })
                    location.reload();
                }
            })
        });
    })
    //会籍卡暂停审核
    $('.edit_card_suspend').click(function () {
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
                var select_sh = parent.$("select[name='select_sh']").val();
                var reason = parent.$("input[name='reason']").val();

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
                $.post(base + "member/card_suspend_edit", {
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

    /*
     *  合同模版选择
     **/
    $('select[name="contract_select"]').change(function () {
        var id = $('select[name="contract_select"]').val();
        if (id != 0) {
            $.post(base + 'member/check_moban_href', {
                "id": id
            }, function (data) {
                $("#moban_download").attr("href", base + data);
            })

        } else {
            $("#moban_download").attr("href", "javascript:void(0)");

        }

    })



    //会员私教记录
    $('.privatelessons_record').click(function () {
        alert();
    })


    //会员所购会籍审核
    $('.up_buy_record').click(function(){
        var type = $(this).attr('itemtype');
        var id = $(this).attr('itemid');
        if(type =='tg'){
            var ts = '确认通过审核';
        }else{
            var ts = '确认不通过审核';
        }
        parent.layer.confirm(ts, {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $.post(base + 'member/up_buy_record', {
                'id': id, 
                'type':type
            }, function (data) {
                if (data == 'ok') {
                    parent.layer.closeAll();
                    parent.layer.open({
                        content: '审核成功'
                    })
                    location.reload();
                } else {
                    parent.layer.closeAll();
                    parent.layer.open({
                        content: '审核失败'
                    })
                    location.reload();
                }
            })
        });
	
	
    })
    //会员签约私教
    $('.up_sign_record').click(function(){
        var type = $(this).attr('itemtype');
        var id = $(this).attr('itemid');
        if(type =='tg'){
            var ts = '确认通过审核';
        }else{
            var ts = '确认不通过审核';
        }
        parent.layer.confirm(ts, {
            btn: ['确定', '后悔了'] //按钮
        }, function () {
            var index = layer.load(0, {
                shade: [0.5, '#000'] //0.1透明度的白色背景
            });
            $.post(base + 'member/up_sign_record', {
                'id': id, 
                'type':type
            }, function (data) {
                if (data == 'ok') {
                    parent.layer.closeAll();
                    parent.layer.open({
                        content: '审核成功'
                    })
                    location.reload();
                } else {
                    parent.layer.closeAll();
                    parent.layer.open({
                        content: '审核失败'
                    })
                    location.reload();
                }
            })
        });
	
	
    })
        
    //删除会员会籍
    $('.del_buy_record').click(function(){
        var id = $(this).attr('itemId');
        parent.layer.confirm('确定要删除该会员该会籍？', {
            btn: ['确定', '暂不删除'] //按钮
        }, function () {
            $.post(base+'member/del_buy_record',{
                'id':id
            },function(data){
                
                
                
                })
        })
            
    })


})


function tz_minfo(data){
    parent.location.href=base+"member/member_info/"+data;
}
    

