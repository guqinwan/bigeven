//拦截每次ajax请求，对url地址进行拼接
$.ajaxPrefilter(function(options){
    //拼接URL地址
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url
    //为有权限的接口设置请求头
    if(options.url.indexOf('/my') !==-1){
        options.headers ={
            Authorization:localStorage.getItem('token') ||''           
        }
    }
    //判断是否能登陆到有权限的页面
    options.complete = function(res){
        if(res.responseJSON.status==1 &&res.responseJSON.message == '身份认证失败！'){
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }
})