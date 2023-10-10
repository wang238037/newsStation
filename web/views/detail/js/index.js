import { load } from "../../../util/LoadView.js"

load("topbar-news")  // 加载topbar



async function render() {
    let id = new URL(location.href).searchParams.get("id")
    // console.log(id)
    let {title,author,content} = await fetch(`http://localhost:3000/news/${id}`)
        .then(res => res.json())
    document.querySelector(".title").innerHTML=title
    document.querySelector(".author").innerHTML=author
    document.querySelector(".newsDetail").innerHTML=content
}
render()