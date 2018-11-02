var reqAjax = {
    delete:function(type,url,data,returnUrl,callback,msg){
        $.ajax({
            type:type,
            data:data,
            dataType:'json',
            url:url,
            success:function(res){
                console.log(res);
                if(res.code===0){
                    var tipMsg = msg?msg:res.msg;
                    layer.msg(tipMsg);
                    if(callback){
                        callback()
                    }else{
                        if(returnUrl){
                            setTimeout(function(){
                                window.location.href = returnUrl
                            },500)
                        }
                    }
                }else{
                    layer.msg(res.msg);
                }
            },
            error:function(err){
                console.log(err);
                layer.msg('请求出错');
            }
        })
    },
    change:function(type,url,data,callback){
        $.ajax({
            type:type,
            data:data,
            dataType:'json',
            url:url,
            success:function(res){
                console.log(res);
                if(res.code===0){
                    layer.msg(res.msg);
                    callback&&callback()
                }else{
                    layer.msg(res.msg);
                }
            },
            error:function(err){
                layer.msg('请求出错');
            }
        })
    }
}