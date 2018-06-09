;
(function($){
    $.showMsg =  function(arr){
        var obj = eval('('+arr+')');
        console.log(obj);
        if (obj.state == 'ok') {
            parent.layer.open({
                content: obj.msg,
                yes: function () {
                    location.reload();
                    parent.layer.closeAll();
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

