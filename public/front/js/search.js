
$(function(){

    // 由于进行的是本地存储操作，约定存储的键名：search_list
    // 以下三句话，放在控制台执行   用于添加假数据 
    // var arr =  ['耐克','阿迪',"阿迪王",'耐克王'];
    // var jsonStr = JSON.stringify(arr);
    // localStorage.setItem('search_list',jsonStr);

    // 功能分析
    // 1.搜索历史记录渲染
    // 2.清空搜索历史
    // 3.删除单条历史记录
    // 4.添加搜索历史记录


    // 功能1搜索历史记录渲染
    // 思路：
        // （1）读取本地存储，读取得到的是jsonStr
        // （2）转成数组
        // （3）结合模板引擎渲染

        render();//在页面打开的时候就要渲染一次

        //将本地存储中的数据取出来 转成一个数组
       function getHistory() {
            // 对空数据进行处理，如果读取出来的是null 默认设置成'[]'
            var jsonStr = localStorage.getItem('search_list') || "[]";
            var arr = JSON.parse(jsonStr);
            return arr;
       }
        
       //将渲染的步骤封装起来
       function render() {
        var arr = getHistory();
           // 结合模板动态渲染
        var htmlStr = template('historyTmp',{list:arr});
        $('.lt_history').html(htmlStr);
       }

    // 功能2 清空历史记录
    // 思路：
    // （1）给 清空全部 添加点击事件（事件委托注册）
    // （2）清楚本地历史的记录 removeItem
    // （3）页面重新渲染
       $('.lt_history').on('click','.btn_empty',function(){
        // 添加mui确认框
        // 参数1：message提示信息
        // 参数2：title提示标题
        // 参数3：btnArr配置按钮显示的文本
        // 参数4：关闭模态框 触发的回调
        mui.confirm("你确定要清空历史记录吗Boy?","爱的提示",["取消","确认"],function(e){
            // e.index 标记了用户点击的 按钮的下标
            if(e.index===1) {
                localStorage.removeItem("search_list");
                render();
            }
        })
       })

    // 功能3：删除单个
    // 思路：
    //    （1）给删除按钮 通过事件委托添加点击事件
    //    （2）存储下标 点击的时候 拿到下标
    //    （3）根据下标删除数组的对应项
    //    （4）将修改过后的数组存储到本地存储中
    //    （5）页面重新渲染
       $('.lt_history').on('click','.btn_delete',function(){
           var index = $(this).data("index");//拿到数据在数组中相对应的下标

            var arr = getHistory();//获取历史记录数组（本地存储中的数组）
            
            // 根据下标删除数组中的对应项
            // splice会改变原数组
            // arr.splice(从哪儿开始，删除几个，加入的项1，加入的项2，加入的项3)
            arr.splice(index,1);
            //转成json字符创存储到本地
            localStorage.setItem("search_list",JSON.stringify(arr));
            // 重新渲染
            render();        
       })


    //    功能4：添加历史记录功能
    //    思路：
    //         （1）给搜索按钮添加点击事件
    //         （2）获取输入框的值
    //         （3）往数组的最前面添加（unshift）
    //         （4）将数组存储到本地存储中
    //         （5）页面重新渲染
        $('.btn_search').on('click',function(){
            var key = $('.search_input').val().trim(); //获取关键字

            if(key === '') {
                // 弹出 mui消息框
                mui.toast("请输入关键字");
                return;
            }
            //往数组的最前面添加
            var arr = getHistory();
            // 需求：1.如果发现在追加前有重复项 删除重复项 2.长度在10个以内 超出10个的都删除
            var index = arr.indexOf(key);
            if(index !==-1) {
                arr.splice(index,1)
            };
            if( arr.length >= 10 ) {
                arr.pop();
            };

            arr.unshift(key);
            //转成jsonStr 存储到本地
            localStorage.setItem("search_list",JSON.stringify(arr));
            //最后重新渲染
            render();

            //清空数据框内的数据
            $('.search_input').val('');

            //最后要跳转到搜索的结果页面当中去
            location.href = "searchList.html?key=" + key;
        })





})