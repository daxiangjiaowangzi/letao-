
$(function(){
    // 登录功能
    // （1）点击发送登录按钮 获取输入框 用户名和密码
    // （2）发送ajax登录 请求
    // 处理响应
    $('#loginBtn').click(function(){
        // 获取用户输入的用户名和密码
        var username = $('#username').val().trim();
        var password = $('#password').val().trim();

        if(username === '') {
            mui.toast('请输入用户名');
            return;
        }
        if(password==='') {
            mui.toast('请输入密码');
            return;
        }

        // 发送ajax请求
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            datatType:'json',
            success:function(info){
                console.log(info);
                if(info.error===403) {
                    mui.toast('用户名或者密码错误');
                    return;
                }
                if(info.success) {
                    // 登录成功
                    // 如果是从购物车页面跳转过来的 需要跳转回去
                    // 如果直接访问的 login.html 登录完要跳转到用户中心去
                    if(location.href.indexOf('retUrl') != -1) {
                        // 有relUrl说明需要跳转回去
                        var retUrl = location.search.replace("?retUrl=",'');//解析得到地址
                        location.href = retUrl;
                    }else {
                        location.href = 'user.html'; //没有就去个人中心
                    }
                }
            }
        })



    })


})