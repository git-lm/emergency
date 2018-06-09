function sy($id) {
    $('.tab').find('input').css('display', 'none');
    $('#number' + $id).css('display', 'inline');
}
function mc($id) {
    $('.tab').find('input').css('display', 'none');
    $('#name' + $id).css('display', 'inline');
}
function price($id) {
    $('.tab').find('input').css('display', 'none');
    $('#price' + $id).css('display', 'inline');
}


function addnumber($id) {
    var number = $('#number' + $id).val();
		
    parent.layer.confirm('确定进' + number + '？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        $.post(base + 'finance/addnumber', {
            'id': $id, 
            'type': "1", 
            'number': number
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
    }, function() {
        $('#number' + $id).val('').hide();
    });
}


function addsale($id,type) {
    parent.layer.confirm("确定销售?", {
        btn: ['确定', '取消'] //按钮
    }, function () {
        $.post(base + 'finance/addsale', {
            'id': $id, 
            'type': type
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

}

function setprice($id) {
    var price = $('#price' + $id).val();
		
    parent.layer.confirm('确定修改价格为' + price + '？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        $.post(base + 'finance/setprice', {
            'id': $id, 
            'type': "1", 
            'price': price
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
    }, function() {
        $('#price' + $id).val('').hide();
    });
}

function upname($id) {
    var name = $('#name' + $id).val();
		
    parent.layer.confirm('确定修改名称为' + name + '？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        $.post(base + 'finance/upname', {
            'id': $id, 
            'type': "1", 
            'name': name
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
    }, function() {
        $('#name' + $id).val('').hide();
    });
		
}
function del($id) {
		
    parent.layer.confirm('确定删除该记录？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        $.get(base + 'finance/delbeverage/' + $id, {
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
		
}




$(function () {
    function getBeverage(data,readOnly){
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
        + '<label class="col-sm-2 control-label" style="padding-right:0px;"><span style="color:#f00;">*</span>数 量：</label>'
        + '<div class="col-sm-10">'
        + '<input type="text" name="number" class="form-control" value="'+data.number+'" '+readOnly+' placeholder="请输入数量" style="margin-bottom:10px;" onkeyup="value = value.match(/\\d+/, \'\')">'
        + '<span class="number-help-block m-b-none"></span>'
        + '</div>'
        + '</div>'
		
        + '<div class="form-group">'
        + '<label class="col-sm-2 control-label" style="padding-right:0px;"><span style="color:#f00;">*</span>价 格：</label>'
        + '<div class="col-sm-10">'
        + '<input type="text" name="price" class="form-control" value="'+data.price+'" '+readOnly+' placeholder="请输入价格" style="margin-bottom:10px;" onkeyup="value = value.match(/\\d+\\.?\\d{0,2}/, \'\')">'
        + '<span class="price-help-block m-b-none"></span>'
        + '</div>'
        + '</div>'
		
        + '</div>'
        ;
        return html;
    }
    //新增训练数据
    $('.add_beverage').click(function () {
        var data = {
            name: '',
            number: '',
            price: ''
        },
        html = getBeverage(data,'');
        parent.layer.open({
            area: '550px',
            title: '新增饮料',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes: function (index, layero) {
                var $$ = parent.$;
                var name = $$('input[name="name"]').val(),
                number = $$('input[name="number"]').val(),
                price = $$('input[name="price"]').val();
                if ($.trim(name) == '') {
                    $$('.name-help-block').text('请填写名称');
                    return false;
                }
                if ($.trim(number) == '') {
                    $$('.number-help-block').text('请填写数量');
                    return false;
                }
                if ($.trim(price) == '') {
                    $$('.price-help-block').text('请填写价格');
                    return false;
                }
                $.post(base + 'finance/addbeverage', {
                    name: name,
                    number: number,
                    price: price
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
    //增加T-shirt
    $('.add_shirt').click(function(){
        var html='<form id="shirt_add" method="post" action="finance/addshirt">'+
        '<div class="col-md-12">'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">T-shirt名称：</label>'+
        '<div class="col-sm-9">'+
        '<input name="name" class="form-control" placeholder="请输入T-shirt名称" type="text">'+
        '</div>'+
        '</div>'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">颜色：</label>'+
        '<div class="col-sm-9">'+
        '<input name="color" class="form-control" placeholder="请输入颜色" type="text">'+
        '</div>'+
        '</div>'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">尺寸：</label>'+
        '<div class="col-sm-9">'+
        '<input name="size" class="form-control" placeholder="请输入尺寸/S、M、XL、XXL等" type="text">'+
        '</div>'+
        '</div>'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">价格(元)：</label>'+
        '<div class="col-sm-9">'+
        '<input name="price" class="form-control" placeholder="请输入价格" type="text">'+
        '</div>'+
        '</div>'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">库存总量：</label>'+
        '<div class="col-sm-9">'+
        '<input name="number" class="form-control" placeholder="请输入库存总量" type="text"> <span class="help-block m-b-none" id="shirt_tips" ></span>'+
        '</div>'+
        '</div>'+
        '<div class="form-group">'+
        '<label class="col-sm-3 control-label">性别：</label>'+
        '<div class="col-sm-9">'+
        '<label class="radio-inline">'+
        '<input checked="true" value="男"  name="sex" type="radio">男</label>'+
        '<label class="radio-inline">'+
        '<input value="女" name="sex" type="radio">女</label>'+
        '</div>'+
        '</div>'+
        '</div></form>';
        parent.layer.open({
            area: '600px',
            title: '新增T-Shirt',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes: function () {
                var $$ = parent.$;
                var name = $$('input[name="name"]').val();
                var number = $$('input[name="number"]').val();
                var price = $$('input[name="price"]').val();
                var size=$$('input[name="size"]').val();
                var color=$$('input[name="color"]').val();
                if ($.trim(name) == '') {
                    $$('#shirt_tips').text('请填写名称');
                    return false;
                }
                if ($.trim(color) == '') {
                    $$('#shirt_tips').text('请填写颜色');
                    return false;
                }
                if ($.trim(size) == '') {
                    $$('#shirt_tips').text('请填写尺寸');
                    return false;
                }
                if ($.trim(price) == '') {
                    $$('#shirt_tips').text('请填写价格');
                    return false;
                }
                if ($.trim(number) == '') {
                    $$('#shirt_tips').text('请填写数量');
                    return false;
                }
                $(parent.$("#shirt_add")).ajaxSubmit(function(data){
                    if(data=="ok"){
                        parent.layer.open({
                            content: "添加成功",
                            yes:function(){
                                parent.layer.closeAll();
                                window.location.href=base+"finance/t_shirt";
                            }
                        })
                    }else{
                        parent.layer.open({
                            content: "添加失败"
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
//删除T-shirt
function del_shirt(id){
    
    parent.layer.confirm('确定删除T-shirt？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        $.post(base+"finance/del_shirt",{
            "id":id
        },function(data){
            if(data=='ok'){
                parent.layer.open({
                    content:"删除成功",
                    yes:function(data){
                        parent.layer.closeAll();
                        window.location.href=base+"finance/t_shirt";
                    }
                })
            }else{
                parent.layer.open({
                    content:"删除失败"
                })
            }
            
        })
    })
    
}



