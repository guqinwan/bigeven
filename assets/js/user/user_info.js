$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length >6){
                return '用户昵称需在1~6个字符之间';
            }
        }
    })
    initUserInfo()
    function initUserInfo(){
        $.ajax({
            method:'get',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败');
                }
                //console.log(res.data);
                form.val('userinfo',res.data)
            }
        })
    }
    $('.resetinfo').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    layer.msg('更新用户信息失败')
                }else{
                    layer.msg('更新用户信息成功')
                    window.parent.updateInfo()
                }
            }
        })
    })
})
