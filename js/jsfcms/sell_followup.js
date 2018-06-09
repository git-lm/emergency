$(function () {
    function getFollowup(data,readOnly){
        var html = '';
        html = '<div class="col-md-12">'
		
        + '<div class="form-group">'
        + '<label class="col-sm-2 control-label" style="padding-right:0px;"><span style="color:#f00;">*</span>内 容：</label>'
        + '<div class="col-sm-10">'
        + '<textarea name="content" class="form-control" placeholder="请输入内容" style="height: 100px;" >'+data.content+'</textarea>'
        + '<span class="content-help-block m-b-none"></span>'
        + '</div>'
        + '</div>'
        + '</div>';
        return html;
    }
    //新增训练数据
    $('.add_followup').click(function () {
        var m_id = parseInt($(this).data('m_id'));
        if (!m_id) {
            alert('参数错误！');
        }
        var data = {
            content: ''
        },
        html = getFollowup(data,'');
        parent.layer.open({
            area: '550px',
            title: '新增跟踪记录',
            shadeClose: false, //开启遮罩关闭
			btn: ['确认', '取消'],
            content: html,
            yes: function (index, layero) {
                var $$ = parent.$;
                var content = $$('textarea[name="content"]').val();
                if ($.trim(content) == '') {
                    $$('.content-help-block').text('请填内容');
                    return false;
                }
                $.post(base + 'sell/add_followup', {
                    m_id: m_id,
                    content: content
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
    
  
})


