

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
            pageSize:pageSize   //这里除了一个bug 我把pageSize属性 写成了size 这里就体验了看文档的重要性啊！
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

   //点击添加分类按钮 显示模态框  
   $('#addBtn').click(function(){
       $('#addModal').modal('show');
   })

   //表单验证 用插件来实现
   $('#form').bootstrapValidator({
       //配置图标
       feedbackIcons: {
           valid:'glyphicon glyphicon-ok', //校验成功
           invalid:'glyphicon glyphicon-remove',//校验失败
           validating:'glyphicon glyphicon-refresh'//校验中
       },
       //配置需要校验的字段 名称之前在前面就定义好了name 属性中
       fields: {
            categoryName: {
                //校验规则
                validators: { 
                    notEmpty:{
                        message:"请输入一级分类"
                    }
                }
            }
       }
   })    

   //添加表单校验成功事件 （配合上面的表单校验来一起使用）
   $("form").on("success.form.bv",function(e){
       e.preventDefault();//阻止默认提交事件

       $.ajax({
           type:'post',
           url:'/category/addTopCategory',
           data:$('#form').serialize(),
           dataType:'json',
           success:function(info){
               console.log(info);
               $("#addModal").modal('hide');//隐藏模态框
               currentPage = 1; //重新渲染第一页 因为添加是在最前面第一页的第一条
               render();

               $('#form').data('bootstrapValidator').resetForm(true);//重置表单内容
               //传true是连状态和内容一起都重置 不传true仅仅重置状态
           }
       })
   })

})