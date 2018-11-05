
$(function(){

    var currentPage = 1;
    var pageSize = 2;
    var picArr = [];//定义一个数组 用来储存后台返回回来的图片的信息

    render();
    //动态发送请求 渲染页面
    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                console.log(info);

                var htmlStr = template("productTmp",info);
                $('tbody').html(htmlStr);

                //配置分页插件 初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    totalPages:Math.ceil(info.total/info.size),
                    currentPage:info.page,
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    //点击添加分类按钮 显示模态框 这里要把模态框中下拉菜单里的选项渲染好
    $('#addBtn').click(function(){
        $('#addModal').modal('show');
        
        //获取所有二级分类 进行渲染下拉菜单
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                var htmlStr = template("dropdownTmp",info);
                $(".dropdown-menu").html(htmlStr);
            }
        })

    })

    //下拉菜单下面的a注册点击事件 用事件委托
    $('.dropdown-menu').on("click",'a',function(){

        var txt = $(this).text();
        $("#dropdownText").text(txt);

        var id = $(this).data("id");
        $("#daxiangjiao").val(id);

        //更新表单状态
        $('#form').data('bootstrapValidator').updateStatus("brandId",'VALID')
    })

    //多文件上传 插件配置 初始化 别忘了引包 
    $("#fileupload").fileupload({
        dataType:'json',//数据类型
        done:function(e,data) {//回调函数
            console.log(data.result);
            var picObj = data.result; 
            var picUrl = picObj.picAddr;//获取图片路径

            picArr.unshift(picObj);//往数组的最前面添加一个数据
            
            $('#imgBox').prepend('<img src="'+picUrl+ '"alt="" >');//往imgbox这个元素里添加图片让其显示（设置img的src 并添加到imgBox的最前面）
        
            //当数组大于3时应该删除掉最后一个
            //1.之前定义的那个存放图片信息的数组的最后一个删掉（js中的）
            //2.在imgBox里面的图片元素也要删掉（html结构中的）
            if(picArr.length>3){
                picArr.pop();
                //last-of-type 找到最后一个img类型的元素 （只看类型）
                $('#imgBox img:last-of-type').remove();
            }

            //如果图片上传满了三张 应该让picStatus的校验状态，设置成成功
            if(picArr.length===3){
                $("#form").data('bootstrapValidator').updateStatus('picStatus','VALID');
            }
        }
    })

    //添加表单校验
    $('#form').bootstrapValidator({

        excluded:[],

        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        },

        fields: {
            brandId:{
                validators:{
                    notEmpty:{
                        message:'请选择二级分类'
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:'请输入商品名称'
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'请输入商品描述'
                    }
                }
            },
            num:{ //要求库存必须是非零开头的数字
                validators:{
                    notEmpty:{
                        message:'请输入商品库存'
                    },
                    //正则校验 \d表示数字 [0-9]
                    //  \d 出现0次或多次
                    //  *  表示0次或多次
                    //  ？ 表示0次或1次
                    //  +  表示1次或多次
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'库存格式要求是非零开头的数字'
                    },
                }
            },
            size:{ //要求尺码是 xx-xx 的格式 ， xx 表示数字
                validators:{ 
                    notEmpty:{// 非空校验
                        message:'请输入商品尺码'
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:'尺码格式必须是xx-xx 的格式 例如：32-40'
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'请输入商品原价'
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:'请输入商品现价'
                    }
                }
            },
            picStatus:{
                validators:{
                    notEmpty:{
                        message:'请上传三张图片'
                    }
                }
            }

        }
    })

    //注册表单校验成功事件 阻止默认提交 通过ajax提交
    $('#form').on("success.form.bv",function(e){
        e.preventDefault();

        //拼接需要传给后台的参数
        var params = $('#form').serialize();
        //params += "&picName1=xx&picAddr1=xx";
        params += "&picName1="+picArr[0].picName+"&picAddr1="+ picArr[0].picAddr;
        params += "&picName2="+picArr[1].picName+"&picAddr2="+ picArr[1].picAddr; 
        params += "&picName3="+picArr[2].picName+"&picAddr3="+ picArr[2].picAddr; 

        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:params,
            dataType:'json',
            success:function(info){
                console.log(info);
                $('#addModal').modal('hide');
                currentPage = 1;
                render();   
                //重置模态框的表单内容和状态
                $('#form').data("bootstrapValidator").resetForm(true);
                //重置文本和图片
                $('#dropdownText').text("请选择二级分类");
                // console.log($('#imgBox img'))
                $('#imgBox img').remove(); 

                picArr = [];//注意这里别忘了清空上面定义的那个数组 不然会导致后面的图片无法显示 因为后面加了判断语句if picArr.length>3 时...
            }
        })
    })


})