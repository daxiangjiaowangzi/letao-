
mui('.mui-scroll-wrapper').scroll({
    deceleration:0.0005
});


//解析地址栏参数

function getSearch(k) { //具体注释的步骤请看 移动web开发笔记第38条
    var str = location.search;
   
    str = decodeURI(str);

    str = str.slice(1);

    var arr = str.split("&");

    var obj = {};

    arr.forEach(function(v,i){
    var key = v.split("=")[0];
    var value = v.split("=")[1];

    obj[key] = value;
    })

    return obj[k];
}
