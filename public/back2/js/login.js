
// 表单校验配置 要求：1.用户名不能为空 长度为2-6位 2.密码不能为空 长度为6-12位
$(function(){
    $("#form").bootstrapValidator({

        //配置校验图标（就是输入框后面紧跟着的那个小图标）
        feedbackIcons: {
            valid:'glyphicon glyphicon-ok', //校验成功
            invalid:'glyphicon glyphicon-remove', //校验失败
            validating:'glyphicon glyphicon-refresh' //校验中
        },

        //配置校验字段 注意！这里要先给前面需要校验的表单元素 添加name属性 属性值要参考借口文档不能乱写
        fields:{
            username:{ //配置用户名校验
                validators:{ //配置校验规则
                    notEmpty:{ //非空校验
                        message:"用户名不能为空" //非空提示 
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:"长度为2-6位"
                    },
                    callback:{  //用于配置ajax回调的提示
                        message:"用户名不存在"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"长度为6-12位"
                    },
                    callback:{ //用于配置ajax回调的提示
                        message:"密码错误"
                    }
                }
            }
        }

    });



    // 登录功能 表单校验插件会在表单提交时进行校验 如果希望通过ajax提交
    // 可以注册表单校验成功事件，在事件中，阻止默认的跳转提交，通过ajax进行提交

    $("#form").on("success.form.bv",function(e){

        e.preventDefault();

        //通过ajax提交
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
                if(info.success){
                    location.href = "index.html";
                }
                if(info.error===1000){
                 //用户名不存在
                 //调用插件实例方法，更新校验状态成功失败
                 //updateStatus
                 //参数1：校验字段
                 //参数2：校验状态 NOT_VALIDATED未校验,VALIDATING校验中,INVALID校验失败 OR VALID校验成功
                 //参数3：校验规则 用于配置提示信息
                 $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if(info.error===1001){
                    //密码错误 
                    $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
            }
        })

    })

    // 重置功能
    $("[type='reset']").click(function(){
        //注意要像创建插件实例 然后用实例去调用方法
        $("#form").data("bootstrapValidator").resetForm(true);
        //注意这里传true内容和校验转台都重置 如果不传那就只重置校验状态

    })

})