$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //自定义layui校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //数组形式的校验规则
        pwd: [/^[\S]{6,12}/, '密码必须6到12为，且不能出现空格'],
        //以函数的的校验规则来检验两次密码是否一致
        repwd: function (value) {
            //获取密码框中的值
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码输入不一致！'
            }
        }
    })
    //注册ajax
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        //用$.ajaxPrefilter(options)进行URL拼接
        $.post("/api/reguser", {
            username:$('#form-reg [name=username]').val(),
            password:$('#form-reg [name=password]').val()
        },
            function (res) {
                if (res.status != 0) {
                   return layer.msg(res.message)
                } else {
                    layer.msg('注册成功')
                    //模拟行为点击跳转到登陆页面
                    $('#link-login').click()
                }
            },

        );
    })
    //登陆ajax
    $('#form-login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !=0){
                    layer.msg('登陆失败！')
                }else{
                    layer.msg('登陆成功！')
                    console.log(res.token);
                    localStorage.setItem('token',res.token)
                    location.href='/index.html'
                }
            }
        })
    })
})