
$(function(){
    // 需求：解析地址栏参数 获取搜索关键字key
    // 设置给input框 并且根据关键字发送请求 进行渲染

    // 解析获取搜索关键字
    var key = getSearch("key");

    // 设置给input
    $('.search_input').val(key);

    render();//页面开启的时候就调用一次 

    //根据关键字发送请求 渲染页面
    function render() {
        $('.lt_product').html('<div class="loading"></div>');
        //定义一个空对象
        var obj = {};
        // 三个必须传的参数
        obj.proName = $('.search_input').val();
        obj.page = 1;
        obj.pageSize = 100;

        // 两个可选的参数 价格price 库存num
        // （1）根据有没有高亮的a 决定是否要排序
        // （2）根据箭头的方向来决定降序还是升序（类名） 2降序 1升序 （后台借口文档里定义的）
        var $current = $('.lt_sort a.current');
        if( $current.length>0) {
            //有高亮的a 需要排序
            var sortName = $current.data('type'); //price
            var sortValue = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;
            obj[sortName] = sortValue;

        }

        setTimeout(function(){
            // 根据关键字进行搜索 进行渲染
            $.ajax({   //这边查看后台借口文档
                type:'get',
                url:'/product/queryProduct',
                data:obj,
                dataType:'json',
                success:function(info){
                    console.log(info);
                    var htmlStr = template('listTmp',info);
                    $('.lt_product').html(htmlStr);
                }
            })
        },1500);
    }

    //点击搜索按钮 进行搜索
    $('.btn_search').click(function(){
        render();
    })

    // 排序功能
    // 给有data-type属性的排序按钮 注册点击事件
    // 原来没有current类 添加上current类
    // 如果原来有current类的 改变箭头方向
    // 根据高亮的a 和箭头的方向来 排序 
    // 最后对数据进行渲染
    $('.lt_sort a[data-type]').click(function(){
        if($(this).hasClass('current')) {
            // 有current类 就改变箭头的方向 其实就是给i标签 换了一个类
            $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        }else {
            //没有current类就添加 注意这里要排他
            $(this).addClass('current').siblings().removeClass('current');
        }

        render();//最后别忘了重新渲染
    })
})