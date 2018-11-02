
$(function(){

    var currentPage = 1;
    var pageSize = 5;

    render();

    function render(){
        $.ajax({ //注意只要有ajax和后台有相互的 一定要看借口文档
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                var htmlStr = template("secondTmp",info);
                $('tbody').html(htmlStr);
    
                //分页插件初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    totalPages:Math.ceil(info.total/info.size),
                    currentPage:info.page,
                    onPageClicked:function(a,b,c,page){
                        currentPage = page,
                        render();
                    }
                })
    
            }
    
        }) 
    }   

    //点击添加分类按钮 显示模态框
    $('#addBtn').click(function(){
        $('#addModal').modal('show');

        //请求模态框的下拉菜单数据 进行渲染
        //提供的是分页借口 我们可以通过分页接口 模拟获取全部一级分类的接口
        //配置请求 第一页 请求100条数据 模拟接口
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                var htmlStr = template("dropdownTmp",info);
                $('.dropdown-menu').html(htmlStr);
            }
        })

    })

    //给下拉菜单中的a注册点击事件  通过事件委托
    $('.dropdown-menu').on('click','a',function(){
        //获取a文本
        var txt = $(this).text()
        //设置 给按钮 让按钮有这个文本
        $('#dropdownText').text(txt);

        //获取选择的一级分类id 设置给隐藏域
        var id = $(this).data("id");  //这个id是模板渲染的时候就放在a标签的自定义属性当中
        $("#daxiangjiao").val( id );

        //让一级分类对应的影藏域，校验状态设置成 校验成功
        //参数一是字段名称 参数二是校验状态 参数三是配置校验规则 用来显示错误信息
        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
    });

    //配置上传文件的插件 
    $("#fileupload").fileupload({
        //返回会来的数据格式json格式
        dataType:'json',
        //文件上传完成回来的 回调函数
        done:function(e,data){
            console.log(data);//后台返回的数据
            var picUrl = data.result.picAddr;
            $("#imgBox img").attr('src',picUrl); //将图片地址设置给img

            $('#daxiangjiao2').val(picUrl); //将图片地址设置给隐藏域

            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');//让表单状态 变成校验成功
        }
    })

    //表单校验
    $('#form').bootstrapValidator({
        //指定不校验的类型 默认为[':disabled',':hidden',':not(:visible)'],可以不设置
        excluded:[],
        
        //配置图标
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok', //校验成功
            invalid:'glyphicon glyphicon-remove', //校验失败
            validating:'glyphicon glyphicon-refresh' // 校验中
        },

        fields: {
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },

            brandName:{
                validators:{
                    notEmpty:{
                        message:'请输入二级分类名称'
                    }
                }
            },

            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'请选择图片'
                    }
                }
            }
        }
    })

    //添加表单验证成功事件 
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('#form').serialize(),
            dataType:'json',
            success:function(info){
                console.log(info);
                $('#addModal').modal('hide');

                currentPage = 1;
                render();

                $('#form').data('bootstrapValidator').resetForm('true');

                $('#dropdownText').text("请选择一级分类");

                $('#imgBox img').attr('src','images/none.png')

            }
        })
    })

})