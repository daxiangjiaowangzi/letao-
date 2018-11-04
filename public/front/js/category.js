

$(function(){
    //发送ajax 请求左侧一级分类的数据 进行渲染
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        dataType:'json',
        success:function( info ) {
            console.log(info);
            var htmlStr = template("leftTmp",info);
            $('.lt_category_left ul').html( htmlStr );

            renderByid(info.rows[0].id);
        }
    })

    //根据一级分类的id 渲染二级分类
    function renderByid( id ) {
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data: {
                id:id
            },
            dataType:'json',
            success:function(info) {
                console.log(info);
                var htmlStr = template ("rightTmp",info);
                $('.lt_category_right ul').html(htmlStr);
            }
        })
    }

    $('.lt_category_left ul').on('click',"a",function(){

        var id = $(this).data("id");

        renderByid(id);

        $(this).addClass('current').parent().siblings().find('a').removeClass('current');

    })

})