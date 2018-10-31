


//进度条部分 使用NProgress插件来实现 别忘了引包 CSS JS 还用到了AJAX全局事件
$(document).ajaxStart(function(){ //第一个ajax开始发送调用，开启进度条
    NProgress.start();
})

$(document).ajaxStop(function(){ //在所有的ajax请求完成时调用
    
    setInterval(function(){// 这里模拟网络延迟
        NProgress.done();
    },1000)
})



$(function(){ // 用css3来给前面设置样式 这边js来切换类来实现这个效果 
    
    // 让侧边栏里面的MV下面的两个a标签展现或隐藏
    $('.lt_side .nav .category').click(function(){
        $(this).next().stop().slideToggle();
    })
    //让侧边栏隐藏或展现  
    $('.lt_topbar .icon_menu').click(function(){
        $('.lt_side').toggleClass("hiddenmenu");
        $('.lt_main').toggleClass("hiddenmenu");
        $('.lt_topbar').toggleClass("hiddenmenu");
    })

    
    //退出功能 
    
    //用js来实现弹出模态框的方法 （这里还有一种方法可以显示模态框 就是给我们自己的按钮 加两个属性即可 data-什么的属性）
    $('.lt_topbar .icon_logout').click(function(){
        //显示模态框
        //显示 modal("show")
        //隐藏 modal("hide")
        $('#myModal').modal("show"); //这个方法是插件提供的
    })
    //退出登录的方式：
    //      1.用户端（浏览器端），用户自己清楚了浏览器缓存 （清空了 cookie），本质上将会话标识 sessionId 也清除了
    //      2.前端通过发送ajax退出请求 让后台销毁当前用户的登录状态 session
    // 给模态框中的退出 按钮 注册事件
    $('#logoutBtn').click(function(){ //查看后台给的借口文档
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json', //如果后台在响应头中 设置了 响应类型为json类型 就可以省略dataType
            success:function( info ) {
                console.log(info);
                if( info.success ) {
                    location.href="login.html"; //退出成功 跳转到登录页
                }   
            }
        })
    })  

});

