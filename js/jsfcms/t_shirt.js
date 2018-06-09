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
				'id': $id, 'type': "2", 'number': number
			}, function (data) {
                var result = $.parseJSON(data);
				if (result.success) {
					parent.layer.open({content: result.msg, yes: function () {
							parent.layer.closeAll();
							location.reload();
						}})
				} else {
					parent.layer.open({content: result.msg})
				}

            })
        }, function() {
			$('#number' + $id).val('').hide();
		});
    }


    function addsale($id) {
		parent.layer.confirm("确定销售?", {
            btn: ['确定', '取消'] //按钮
        }, function () {
            $.post(base + 'finance/addsale', {
				'id': $id, 'type': "2"
			}, function (data) {
                var result = $.parseJSON(data);
				if (result.success) {
					parent.layer.open({content: result.msg, yes: function () {
							parent.layer.closeAll();
							location.reload();
						}})
				} else {
					parent.layer.open({content: result.msg})
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
				'id': $id, 'type': "2", 'price': price
			}, function (data) {
                var result = $.parseJSON(data);
				if (result.success) {
					parent.layer.open({content: result.msg, yes: function () {
							parent.layer.closeAll();
							location.reload();
						}})
				} else {
					parent.layer.open({content: result.msg})
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
				'id': $id, 'type': "2", 'name': name
			}, function (data) {
                var result = $.parseJSON(data);
				if (result.success) {
					parent.layer.open({content: result.msg, yes: function () {
							parent.layer.closeAll();
							location.reload();
						}})
				} else {
					parent.layer.open({content: result.msg})
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
            $.get(base + 'finance/delt_shiirt/' + $id, {
			}, function (data) {
                var result = $.parseJSON(data);
				if (result.success) {
					parent.layer.open({content: result.msg, yes: function () {
							parent.layer.closeAll();
							location.reload();
						}})
				} else {
					parent.layer.open({content: result.msg})
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
		
				+ '<div class="form-group">'
				+ '<label class="col-sm-2 control-label" style="padding-right:0px;"><span style="color:#f00;">*</span>性别：</label>'
				+ '<div class="col-sm-10">'
				+ '<div class="col-sm-3">'
				+ '<label><input type="radio" name="sex" value="男" '+readOnly+' checked> &nbsp;&nbsp;男</label>'
				+ '</div>'
				+ '<div class="col-sm-3">'
				+ '<label><input type="radio" name="sex" value="女" '+readOnly+' > &nbsp;&nbsp;女</label>'
				+ '</div>'
				+ '<span class="sex-help-block m-b-none"></span>'
				+ '</div>'
				+ '</div>'
		
				+ '<div class="form-group">'
				+ '<label class="col-sm-2 control-label" style="padding-right:0px;"><span style="color:#f00;">*</span>尺寸：</label>'
				+ '<div class="col-sm-10">'
				+ '<input type="text" name="size" class="form-control" value="'+data.size+'" '+readOnly+' placeholder="请输入尺寸" style="margin-bottom:10px;">'
				+ '<span class="size-help-block m-b-none"></span>'
				+ '</div>'
				+ '</div>'
		
				+ '<div class="form-group">'
				+ '<label class="col-sm-2 control-label" style="padding-right:0px;"><span style="color:#f00;">*</span>颜色：</label>'
				+ '<div class="col-sm-10">'
				+ '<input type="text" name="color" class="form-control" value="'+data.color+'" '+readOnly+' placeholder="请输入颜色" style="margin-bottom:10px;">'
				+ '<span class="color-help-block m-b-none"></span>'
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
					price: '',
					sex: '',
					color:'',
					size: ''
				},
				html = getBeverage(data,'');
            parent.layer.open({
                area: '550px',
                title: '新增T恤',
                shadeClose: false, //开启遮罩关闭
				btn: ['确认', '取消'],
                content: html,
                yes: function (index, layero) {
					var $$ = parent.$;
                    var name = $$('input[name="name"]').val(),
						number = $$('input[name="number"]').val(),
						price = $$('input[name="price"]').val();
						sex = $$('input[name="sex"]:checked').val();
						color = $$('input[name="color"]').val();
						size = $$('input[name="size"]').val();
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
					if ($.trim(sex) == '') {
                        $$('.sex-help-block').text('请填写性别');
						return false;
                    }
					if ($.trim(size) == '') {
                        $$('.size-help-block').text('请填写尺寸');
						return false;
                    }
					if ($.trim(color) == '') {
                        $$('.color-help-block').text('请填写颜色');
						return false;
                    }
					$.post(base + 'finance/addt_shirt', {
						name: name,
						number: number,
						price: price,
						sex: sex,
						color: color,
						size: size
					}, function (data) {
						var result = $.parseJSON(data);
						if (result.success) {
							parent.layer.open({content: result.msg, yes: function () {
									parent.layer.closeAll();
									location.reload();
								}})
						} else {
							parent.layer.open({content: result.msg})
						}
					});
                    

                },
				btn2:function(){
					parent.layer.closeAll();
				}
            });
    });
    
})



