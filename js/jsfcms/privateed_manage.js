/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    
    //查看预约
    $('.check_yuyue').click(function(){
        var itemid=$(this).attr('itemid');
        var pid=$(this).attr('pid');
        if(itemid==0){
            parent.layer.open({
                content:"该条预约信息开课前无人预约，已失效"
            });
        }else if(itemid==1){
            parent.layer.open({
                content:"该条私教课可预约"
            });
        }else if(itemid==2){
            $.post(base+"privateed_manage/check_yuyueinfo",{
                "plid":pid
            },function(data){
                var minfo=$.parseJSON(data);
                var html='<div class="col-md-12">'+
                '<div class="form-group">'+
                '<label class="col-sm-3 control-label">学员姓名：</label>'+
                '<div class="col-sm-9">'+
                '<p class="form-control-static" id="mname">'+minfo.mname+'</p>'+
                '</div>'+
                '</div>'+
                '<div class="form-group">'+
                '<label class="col-sm-3 control-label">学员性别：</label>'+
                '<div class="col-sm-9">'+
                '<p class="form-control-static" id="msex">'+minfo.msex+'</p>'+
                '</div>'+
                '</div>'+
                '<div class="form-group">'+
                '<label class="col-sm-3 control-label">联系方式：</label>'+
                '<div class="col-sm-9">'+
                '<p class="form-control-static" id="mtel">'+minfo.mtel+'</p>'+
                '</div>'+
                '</div>'+
                '<div class="form-group">'+
                '<label class="col-sm-3 control-label">签到状态：</label>'+
                '<div class="col-sm-9">'+
                '<p class="form-control-static" id="is_sign">'+minfo.is_signname+'</p>'+
                '</div>'+
                '</div>'+
                '<div class="form-group">'+
                '<label class="col-sm-3 control-label">复核状态：</label>'+
                '<div class="col-sm-9">'+
                '<p class="form-control-static" id="is_review">'+minfo.is_reviewname+'</p>'+
                '</div>'+
                '</div>'+
                '</div>';
                parent.layer.open({
                    area: '550px',
                    title: '预约信息',
                    shadeClose: true, //开启遮罩关闭
                    content: html
                })
            })
           
        }
        
    })
    
       
})