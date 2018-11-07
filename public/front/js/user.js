
$(function(){

    // 功能1：请求用户数据 进行页面渲染（要求登录）
    // （1）未登录，后台返回 当前用户未登录 拦截到登录页
    // （2）已登录， 后台返回 当前用户信息的对象
    $.ajax({
    	type:'get',
    	url:'/user/queryUserMessage',
    	dataType:'json',
    	success:function(info) {
    		console.log(info);
    		if(info.error===400) {
    			// 未登录
    			location.href = 'login.html';
    			return;
    		}

    		//成功，返回用户信息对象 通过模板引擎渲染
    		var htmlStr =template('userTpl',info);
    		$('#userInfo').html(htmlStr);
    	}
    })

    // 功能2：退出功能
    $('#logout').click(function(){
    	$.ajax({
    		type:'get',
    		url:'/user/logout',
    		dataType:'json',
    		success:function(info) {
    			console.log(info);
    			if(info.success) {
    				// 退出成功 跳转到登录页
    				location.href = 'login.html';
    			}
    		}
    	})
    })

})