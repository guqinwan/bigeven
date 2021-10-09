//拦截每次ajax请求，对url地址进行拼接
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url
    console.log(options.url);
})