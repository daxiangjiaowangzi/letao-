// 一进入页面 判断当前用户是否是登录的（发送请求询问后台） 如果是已经登录的 才能继续访问
// 查看借口文档 这个功能有些页面时不需要的 比如说登录页和注册页 如果给这些页也设置了登录拦截那么页面就会一直请求
$.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function(info) {
        console.log(info);
        if(info.error === 400) {
            location.href = "login.html";
        }
        if(info.success) {
            console.log("当前用户已登录");
        }
    }
})