

$(function(){

    var currentPage = 1; //将当前页面定义为全区变量 （因为会发生改变）
    var pageSize = 5;

    render(); //刚进入页面的时候渲染一次

   function render() {
    $.ajax({ //发送ajax请求 拿到数据后 用模板渲染数据 注意这里要看一个后台给的文档 地址啊 数据请求类型啊 必须看！
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:currentPage,
            size:pageSize   
        },
        dataType:'json',
        success:function(info){
            console.log(info);
            var htmlStr = template("firstTmp",info);
            $('tbody').html(htmlStr);

            //初始化分页插件 被忘了在前面准备一个容器
            $('#paginator').bootstrapPaginator({
                //版本号
                bootstrapMajorVersion:3,
                //总页数
                totalPages: Math.ceil(info.total/info.size),
                //当前页
                currentPage:info.page,
                //绑定页码点击事件
                onPageClicked:function(a,b,c,page) {
                    currentPage = page; //点击时显示page页的数据 更新当前页
                    render();
                }


            })

        }
    })
   }


})