
//使用这个插件最好去官网 看一下 使用教程 注意这里需要提前在页面上准备要一个容器来放可视化数据
// 其实改变下面结构中的option 就可以实现改变整个图 因为其他都是一样的
$(function(){
    // 基于准备好的dom，初始化echarts实例
    var leftChart = echarts.init(document.querySelector('.echarts_left')); //这里面写之前提前准备好的容器

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts 入门示例'  //大标题
        },
        tooltip: {}, //提示框组件  鼠标放上去会显示一个框
        legend: {   // 图例 （用于解释说明）
            data:['销量'] 
        },
        xAxis: { //x轴
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {}, //y轴的刻度是根据数据自动生成的
        series: [{  //这里面可以显示多组数据 一个对象是一组数据 这里下面只有一组数据（因为数组里只有一个对象）
            name: '销量',
            type: 'bar', //这里可以设置图标的类型 pie饼图 bar柱状图 line折线图
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    leftChart.setOption(option);

    // ------------------------------------------

    var rightChart = echarts.init(document.querySelector('.echarts_right')); //这里面写之前提前准备好的容器

    // 指定图表的配置项和数据
    option = {
        title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
        }, 
        tooltip : {// 在饼图中 鼠标滑到数据上时 显示提示框
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)" //配置提示框文本 {a}系列名称 {b}数据项名称 {c}数值 {d}百分比
        },
        legend: { //图例   
            orient: 'vertical', //方向  水平为 horizontal
            left: 'left',
            data: ['三菱EVO','奔驰A45','斯巴鲁翼豹','宝马M5','丰田SUPRA']
        },
        series : [ 
            {
                name: '访问来源',
                type: 'pie',
                radius : '70%', //配置圆的大小 圆的半径
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'三菱EVO'},
                    {value:310, name:'奔驰A45'},
                    {value:234, name:'斯巴鲁翼豹'},
                    {value:135, name:'宝马M5'},
                    {value:1548, name:'丰田SUPRA'}
                ],
                itemStyle: { // 阴影效果
                    emphasis: {
                        shadowBlur: 20,    
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    rightChart.setOption(option);
})