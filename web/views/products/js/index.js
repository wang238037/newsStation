import { load } from "../../../util/LoadView.js"

load("topbar-products")  // 加载topbar

async function render() {
    let list = await fetch("http://localhost:3000/products")
        .then(res => res.json())
    console.log(list)

    // 动态创建指示器
    document.querySelector(".carousel-indicators").innerHTML = list.map((item,index)=> `
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="active"
        aria-current="true" aria-label="${item.title}"></button>
    `).join("")

    // 动态创建内容
    document.querySelector(".carousel-inner").innerHTML=list.map((item,index)=>`
        <div class="carousel-item ${index===0?"active":""}">
            <div style="background-image: url(${item.cover});width: 100%;height: calc(100vh - 50px);background-size: cover;"></div>
            <div class="carousel-caption d-none d-md-block">
                <h5>${item.title}</h5>
                <p>${item.introduction}</p>
            </div>
        </div>
    `).join("")
}

render()