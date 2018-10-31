


$(document).ajaxStart(function(){
    NProgress.start();
})

$(document).ajaxStop(function(){
    
    setInterval(function(){
        NProgress.done();
    },1000)
})