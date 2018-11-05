
$(function(){
    // 获取到地址栏传递过来的productId
    var productId = getSearch('productId');

    //根据 productId发送请求 渲染页面
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{
            id:productId
        },
        dataType:'json',
        success:function(info){
            console.log(info);
            var htmlStr = template('productTpl',info);
            $('.lt_main .mui-scroll').html(htmlStr);

            // 手动在 轮播图 渲染完成后 初始化 查看mui文档说明可以知道 动态渲染的轮播图需要初始化后才能使用
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放 默认为0
            });

            //手动初始化 数字框
            mui(".mui-numbox").numbox(); 

        }
    })

    // 给尺码添加可点击功能 通过事件委托
    $('.lt_main .mui-scroll').on('click','.lt_size span',function(){
        // 添加类名current 要排他
        $(this).addClass("current").siblings().removeClass('current');
    });

    // 加入购物车功能
    $('#addCart').click(function(){
        //获取尺码和数量
        var size = $('.lt_size span.current').text();
        var num = $('.mui-numbox-input').val();

        if(!size) {
            // 没有选中尺码
            mui.toast('请选择尺码');
            return;
        }

        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId:productId,
                size:size,
                num:num
            },
            dataType:'json',
            success:function(info){
                console.log(info);

                if(info.error===400) {
                    // 当前用户未登录 直接拦截到登录页 并且将当前页地址传递过去（好让用户登录完再跳转回来）
                    location.href = 'login.html?retUrl=' + location.href;
                }

                if(info.success) {
                    mui.confirm("添加成功",'温馨提示',['去购物车','继续浏览',function(e){
                        //通过e.index来判断用户点击的是那个按钮
                        if(e.index===0) {
                            location.href = 'cart.html';
                        }
                    }])
                }
            }
        })

    })



})