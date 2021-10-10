$(function(){
    var form = layui.form
    var layer=  layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          newpwd:function(value){
              if(value === $('[name=oldPwd]').val()){
                  return '旧密码不能和新密码一样';
              }
          },
          oldpwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码输入不一致';
            }
          }
    })
    $('#form_pwd').on('submit',function(e){
         e.preventDefault()
            $.ajax({
                method:'post',
                url:'/my/updatepwd',
                data:$(this).serialize(),
                success:function (res) {
                    if(res.status !==0){
                        return layer.msg('重置密码失败！')
                    }else{
                        layer.msg('重置密码成功')
                        $('#form_pwd')[0].reset()
                    }
                  }
            })
    })
})