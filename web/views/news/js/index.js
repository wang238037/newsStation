import { load } from "../../../util/LoadView.js"

load("topbar-news")  // 加载topbar

// 已有新闻
let list = []

//  class="list-group-item"
search.oninput = async function () {
    if (!search.value) {
        document.querySelector(".list-group").style.display = "none"
        return
    }
    document.querySelector(".list-group").style.display = "block"
    let res = await fetch("http://localhost:3000/news?title_like=" + search.value)
        .then(res => res.json())

    document.querySelector(".list-group").innerHTML = res.map(item => `
        <li class="list-group-item"><a href="/web/views/detail/index.html?id=${item.id}">${item.title}</a></li>
    `).join("")
    
}
// 失去焦点时
search.onblur = function () {
    setTimeout(() => {
        document.querySelector(".list-group").style.display = "none"
    }, 300)

}
// 获取焦点时
search.onfocus = function () {
    document.querySelector(".list-group").style.display = "block"
}

async function render() {
    await renderList()
    renderTab()
}
async function renderList() {
    list = await fetch("http://localhost:3000/news")
        .then(res => res.json())

    let newlist = list.reverse().slice(0,4)

    let cardcontainer=document.querySelector(".cardContainer")
    cardcontainer.innerHTML=newlist.map(item=>`
        <div class="card" data-myid="${item.id}">
            <div style="background-image:url(${item.cover});" class="imgcover"></div>
            <div class="card-body">
                <h5 class="card-title" style="font-size:16px">${item.title}</h5>
                <p class="card-text" style="color:gray;font-size:14px">作者：${item.author}</p>
            </div>
        </div>
    `).join("")

    for(let item of document.querySelectorAll(".card")){
        item.onclick=function(){
            location.href=`/web/views/detail/index.html?id=${item.dataset.myid}`
        }
    }
}
async function renderTab() {
    let categoryObj=_.groupBy(list,item=>item.category)
    console.log(categoryObj)
    let tabs=[tab0,tab1,tab2]
    tabs.forEach((item,index)=>{
        item.innerHTML=categoryObj[index]?.map(item=>`
            <div class="listitem" data-id="${item.id}">
                <img src="${item.cover}" data-id="${item.id}"/>
                <div>
                    
                    <div data-id="${item.id}">${item.title}</div>
                    <p class="card-text" style="color:gray;font-size:14px" data-id="${item.id}">作者：${item.author}</p>
                </div>
                
            </div>
        `).join("")||""

        item.onclick=function(evt){
            location.href=`/web/views/detail/index.html?id=${evt.target.dataset.id}`
        }
    })

    
}

render()