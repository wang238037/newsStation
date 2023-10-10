import { load, isLogin } from "../../../util/LoadView.js"

load("sidemenu-home")  // 加载sidemenu和topbar

let user = JSON.parse(isLogin())
let categoryList = ["最新动态", "典型案例", "通知公告"]

document.querySelector(".userprofile").innerHTML = `
    <img src="${user.photo}" style="width:120px;"/>
    <div>
        <div><strong>${user.username}</strong></div>
        <div><pre>${user.introduction || "这个人很懒..."}</pre></div>
    </div>
`
// 加上<pre></pre>标签，会保留输入的换行符等特殊字符

async function analyse() {
    let res = await fetch(`http://localhost:3000/news?author=${user.username}`)
        .then(res => res.json())
    let obj = _.groupBy(res, item => item.category)
    console.log(obj)
    let arr = []
    for (let i in obj) {
        arr.push({
            name: categoryList[i],
            value: obj[i].length
        })
    }
    renderEcharts(arr)
}

function renderEcharts(arr) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '当前用户发布的新闻',
            subtext: '不同类别占比',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '类别',
                type: 'pie',
                radius: '50%',
                data: arr,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

analyse()
