$(function(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') ||''
        // },
        success:function(res){
            if(res.status !== 0){
               return layui.layer.msg('获取用户信息失败！')
            }
            getUserInfo(res.data)
        },
        //   complete:function(res){
        //     console.log(res);
        //     if(res.responseJSON.status==1 &&res.responseJSON.message == '身份认证失败！'){
        //         localStorage.removeItem('token')
        //         location.href='/login.html'
        //     }
        //   }
    })
    var layer = layui.layer
    $('.tuchu').on('click',function(){
        layer.confirm('是否退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          });
    })
})

function getUserInfo(data){
    var username = data.nickname || data.username
    $('.username').html(username)
    if(data.username != null){
        var avatar = username[0].toUpperCase()
        $('.text-avatar').html(avatar)
    }
   if(data.user_pic !== null){
    $('.text-avatar').hide()
       $('.layui-nav-img').attr('src',data.user_pic).show()
       
   }else{
       $('.layui-nav-img').hide()
       $('.text.avatar').show()
   }
}