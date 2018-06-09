/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
    //会籍顾问购买会籍卡
    $(".buy_hyk").click(function(){
        var m_id =$(this).attr("itemid");
        window.location.href=base+"member/member_buy_hjk/"+m_id;
        
    })
    //更新会籍购买进度
    $(".check_dy").click(function(){
        var m_id =$(this).attr("itemid");
        //        var mcid=$(this).parent().parent().find(".mname").attr('itemid');
        //        var mid=$(this).parent().parent().find(".mtel").attr('itemid');
        var mname=$(this).parent().parent().find(".mname").text();
        var msex=$(this).parent().parent().find(".msex").text();
        var mphone=$(this).parent().parent().find(".mphone").text();
        var premark=$(this).parent().parent().find(".dremark").text();
        var option_value=$(this).parent().parent().find(".jindu").attr('itemid');
        var options=""
        var option_html=""
        $.post(base+"privateed/get_dynamics",{},function(data){
            options=$.parseJSON(data);
            for(var i = 0;i<options.length;i++){
                var selected="";
                if(options[i].id==option_value){
                    selected="selected";
                }
                option_html+='<option '+selected+' value='+options[i].id+'>'+options[i].name+'</option>'
            }
               
            var html='<div class="col-md-12">'+
            '<div class="form-group">'+
            '<label class="col-sm-3 control-label">会员姓名：</label>'+
            '<div class="col-sm-9">'+
            '<p class="form-control-static" id="mname2">'+mname+'</p>'+
            '</div>'+
            '</div>'+
            '<div class="form-group">'+
            '<label class="col-sm-3 control-label" id="msex2">性别：</label>'+
            '<div class="col-sm-9">'+
            '<p class="form-control-static">'+msex+'</p>'+
            '</div>'+
            ' </div>'+
            '<div class="form-group">'+
            '<label class="col-sm-3 control-label" id="mphone2">联系方式：</label>'+
            '<div class="col-sm-9">'+
            '<p class="form-control-static">'+mphone+'</p>'+
            '</div>'+
            ' </div>'+
            '<div class="form-group">'+
            '<label class="col-sm-3 control-label">会员进度：</label>'+
            '<div class="col-sm-9">'+
            '<select class="form-control" name="m_progress" id="m_progress">'+
            option_html+
            '</select>'+
            '</div>'+
            '</div>'+
            '<div class="form-group">'+
            '<label class="col-sm-3 control-label">进度备注：</label>'+
            '<div class="col-sm-9">'+
            '<input name="m_premark" id="m_premark" class="form-control" value="'+premark+'" placeholder="请输入备注" type="text"><span class="help-block m-b-none">请言简意赅描述</span>'+
            '</div>'+
            '</div>'+
            '</div>';
            parent.layer.open({
                area: '550px',
                title: '更新进度',
                shadeClose: false, //开启遮罩关闭
                content: html,
				btn: ['确认', '取消'],
                yes:function(data){
                    var progress=$$("#m_progress").val();
                    var mremark=$$("#m_premark").val();
                    $.post(base+"adviser/change_dys",{
                        "dynamic":progress,
                        "dremark":mremark,
                        "id":m_id
                    },function(data){
                        if(data=="ok"){
                            parent.layer.open({
                                content:"更新成功",
                                yes:function(data){
                                    parent.layer.closeAll();
                                    window.location.reload();
                                }
                            })
                        }else{
                            parent.layer.open({
                                content:"更新失败",
                                yes:function(data){
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
    })
    //查看个人信息
    $(".check_memberinfo").click(function(){
        var mid=$(this).attr('itemid');
        $.post(base+"adviser/check_memberinfo",{
            "id":mid
        },function(data){
            if(data=="no"){
                parent.layer.open({
                    content:"查询失败"
                })
            }else{
                var member_info=$.parseJSON(data);
                var html='<div class="col-md-12">'+
                '<div class="form-group">'+
                '<label class="col-sm-3 control-label">姓名：</label>'+
                '<div class="col-sm-9">'+
                '<p class="form-control-static">'+member_info.mname+'</p>'+
                '</div>'+
                '</div>'+
                '<div class="form-group">'+
                '<label class="col-sm-3 control-label">性别：</label>'+
                '<div class="col-sm-9">'+
                '<p class="form-control-static">'+member_info.msex+'</p>'+
                '</div>'+
                '</div>'+
                '<div class="form-group">'+
                '<label class="col-sm-3 control-label">联系方式：</label>'+
                '<div class="col-sm-9">'+
                '<p class="form-control-static">'+member_info.mtel+'</p>'+
                '</div>'+
                '</div>'+
                '</div>';
                parent.layer.open({
                    area: '550px',
                    title: '会员信息',
                    shadeClose: true, //开启遮罩关闭
                    content: html
                   
                })
                
            }
            
        })
    })
    //查看更新记录
    $('.check_dylist').click(function(){
        var m_id=$(this).attr('itemid');
        window.location.href=base+"adviser/check_dylist/"+m_id;
    })
    //修改会籍顾问
    $('.change_adviser').click(function(){
        var now_adviser=$(this).parent().parent().find('td').eq(4).attr('itemid');
        var m_id=$(this).attr('itemid');
        var option="";
        $.post(base+"sell/all_adviser",{},function(data){
            var all_advister=$.parseJSON(data);
            
            for(var i =0;i<all_advister.length;i++){
                var selected="";
                if(all_advister[i].id==now_adviser){
                    selected="selected";
                }
                option+='<option '+selected+' value='+all_advister[i].id+'>'+all_advister[i].yname+'</option>'
            }
            var html='<div class="col-md-12">'+
            '<div class="form-group">'+
            '<label class="col-sm-3 control-label">会籍顾问：</label>'+
            '<div class="col-sm-9">'+
            '<select class="form-control" name="select_advister">'+
            option+
            '</select>'+
            '</div>'+
            '</div>'+
            '</div>';
            parent.layer.open({
                area: '550px',
                title: '更新进度',
                shadeClose: true, //开启遮罩关闭
                content: html,
                yes:function(data){
                    var adviser_select=$$('select[name="select_advister"]').val();
                $.post(base+"sell/change_adviser",{
                    "m_id":m_id,
                    'adviser':adviser_select
                },function(data){
                    if(data=="ok"){
                        parent.layer.open({
                            content:"修改成功",
                            yes:function(){
                                parent.layer.closeAll();
                                window.location.reload();
                            }
                        })
                    }else{
                        parent.layer.open({
                            content:"修改失败"
                        })
                    }
                       
                })
            }
            })
        })
      
    })
})

