$(function(){
    //一进入页面 发送ajax请求 获取用户列表 通过模板引擎进行渲染
    //先看后台给的 借口文档
   
    var currentPage = 1;//将当前页定义为全局变量 因为具体渲染哪个页面要根据用户点击的页码值来进行设置
    var Pagesize = 5;
    var currentId;
    var isDelete;

    render();//一进入页面先渲染一次

    function render() {
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:currentPage,
                pageSize:Pagesize
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                //通过模板引擎渲染
                // var htmlStr = template("模板id","数据对象")
                //在模板中可以使用传入的数据对象的属性
                var htmlStr = template("tmp",info); //让模板和数据进行绑定
                console.log(htmlStr);
                $("tbody").html(htmlStr);//将数据渲染到页面上去
    
    
                //配置分页插件 别忘了引包 配置具体看说明文档 注意前面要准备一个容器 而且这里因为版本是3.0所以容器必须是ul
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3, //配置版本号 
                
                    totalPages:Math.ceil(info.total/info.size), //总页数
                
                    currentPage:info.page, //当前页
                    //下面页码点击事件中的参数前三个没什么用 但是一定要放着
                    onPageClicked:function(a,b,c,page) { //页码点击事件 这里主要是要拿到 当用户点击分页插件的上的页面时 拿到所点击的那个页码值
                        currentPage = page ; //通过这个事件拿到用户点击的页码值 关键 赋值给currentPage（全局变量）
                    
                        render(); //当用户点击了分页插件 就发送ajax请求 根据currentPage来加载相对应的页面 这步很关键 因为已经ajax什么的都封装成了一个方法 需要被调用才能触发这个方法
                    
                    }
                })
    
            }
        });
    }

    //什么时候需要像下面这样用事件委托 1.当绑定元素是动态创建出来的  2.利用冒泡来批量注册事件
    //当用户点击禁用/开启按钮的时候 弹出模态框 并且把需要传给后台（用来修改当前状态的数据）用全局变量定义 
    $('tbody').on("click",".btn",function(){
        $("#addModal").modal("show"); //开启模态框

        currentId = $(this).parent().data("id");//因为id用自定义属性存在按钮的父元素中（前面模板里写了） data是jquery用来快速获取自定义属性值的

        isDelete = $(this).hasClass("btn-danger") ? 0 : 1 ; //判断当前点击的按钮有没有这个类 如果有就切换相对应的（开启-》禁用 禁用-》开启）
    })

    //点击模态框中的按钮 向后台发送请求 修改当前状态 别忘了重新渲染哦
    $("#submitBtn").click(function(){//因为上面的事件会被先触发（点了表里面的按钮才会显示模态框）当触发这个事件的时候所需变量都存在全局里了
        $.ajax({
            type:"post",  //注意这里要看一下文档 只要有ajax请求就要看文档！！！
            url:"/user/updateUser",
            data:{
                id:currentId,    //拿到之前存在全局中的变量的值
                isDelete:isDelete
            },
            dataType:"json",
            success:function(info){
                $('#addModal').modal('hide'); //隐藏模态框

                render(); //重新渲染 因为当前页是存在全局变量当中的 所以这边开启重新渲染 渲染的就是当前页码
            }

        })
    })

});