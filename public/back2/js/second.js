
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

})