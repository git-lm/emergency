/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //我是私教会员操作
    $(".check_member").click(function(){
        var itemid=$(this).attr("itemid");
        var mcid=$(this).parent().parent().find(".mname").attr('itemid');
        var mid=$(this).parent().parent().find(".mtel").attr('itemid');
        if(itemid==1){
            window.location.href=base+"privateed/privatelessons/"+mid;
        }else{
            var pname=$(this).parent().parent().find(".mname").text();
           
            var pphone=$(this).parent().parent().find(".mtel").text();
            var premark=$(this).parent().parent().find(".mremark").text();
            var option_value=$(this).parent().parent().find(".dys").attr('itemid');
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
                '<p class="form-control-static" id="pname">'+pname+'</p>'+
                '</div>'+
                '</div>'+
                '<div class="form-group">'+
                '<label class="col-sm-3 control-label" id="pphone">联系方式：</label>'+
                '<div class="col-sm-9">'+
                '<p class="form-control-static">'+pphone+'</p>'+
                '</div>'+
                ' </div>'+
                '<div class="form-group">'+
                '<label class="col-sm-3 control-label">会员进度：</label>'+
                '<div class="col-sm-9">'+
                '<select class="form-control" name="d_progress" id="d_progress">'+
                option_html+
                '</select>'+
                '</div>'+
                '</div>'+
                '<div class="form-group">'+
                '<label class="col-sm-3 control-label">进度备注：</label>'+
                '<div class="col-sm-9">'+
                '<input name="d_premark" id="d_premark" class="form-control" value="'+premark+'" placeholder="请输入备注" type="text"><span class="help-block m-b-none">请言简意赅描述</span>'+
                '</div>'+
                '</div>'+
                '</div>';
                parent.layer.open({
                    area: '550px',
                    title: '更新进度',
                    shadeClose: false, //开启遮罩关闭
					btn: ['确认', '取消'],
                    content: html,
                    yes:function(data){
                        var progress=$$("#d_progress").val();
                        var d_premark=$$("#d_premark").val();
                        $.post(base+"privateed/change_dys",{
                            "progress":progress,
                            "premark":d_premark,
                            "id":mcid
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
         
        }
    })
    //点击复核
    $(".ensure_review").click(function(){
        var is_sign_num=$(this).attr('itemid');
        var id=$(this).attr('itemids');
        var review=$(this).text();
        if(review=="已复核"){
            parent.layer.open({
                content:"该私教课程已复核成功,无需再次符合"
            })
            return;
        }
        
        if(is_sign_num==0){
            parent.layer.open({
                content:"该节私教课处于预约中状态，不可复核"
            })
        }else if(is_sign_num==1){
            parent.layer.open({
                content:"该节私教课会员未签到，无需复核"
            })
        }else{
            $.post(base+"privateed/check_ptime",{
                'id':id
            },function(data){
                if(data=="no"){
                    parent.layer.open({
                        content:"该节私教课尚未结束，暂不可复核"
                    })
                }else if(data=="ok"){
                    parent.layer.confirm("确定复核该节私教课吗？",{
                        btn:["确定复核","我再想想"]
                    },function(){
                        $.post(base+"privateed/change_review",{
                            "id":id
                        },function(data){
                            if(data=="ok"){
                                parent.layer.open({
                                    content:"复核成功",
                                    yes:function(){
                                        parent.layer.closeAll();
                                        window.location.reload();
                                    }
                                }) 
                            }else{
                                parent.layer.open({
                                    content:"复核失败"
                                }) 
                            }
                        })
                    })
                }
            })
        }
        
    })
    
})