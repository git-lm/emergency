
;
(function($){
    $.showMsg =  function(arr,url){
        var obj = eval('('+arr+')');
        console.log(obj);
        if (obj.state == 'ok') {
            parent.layer.open({
                content: obj.msg,
                yes: function () {
                    if(url ==undefined){
                        location.reload();
                        parent.layer.closeAll();
                    }else{
                        window.location.href = url;
                    }
                    
                }
            })
        } else if (obj.state == 'no') {
            parent.layer.open({
                content: obj.msg,
                yes: function () {
                    parent.layer.closeAll();
                    location.reload();
                }
                        
            })
        } else {
            parent.layer.open({
                content: '系统异常',
                yes: function () {
                    parent.layer.closeAll();
                    location.reload();
                }
            })
        }
    }
})(jQuery)

