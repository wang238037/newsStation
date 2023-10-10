import { load, isLogin } from "../../../../util/LoadView.js"

load("sidemenu-newsList")  // 加载sidemenu和topbar

let myPreviewModal = new bootstrap.Modal(document.getElementById('previewModal'))
let myDelModal = new bootstrap.Modal(document.getElementById('delModal'))
let updateId = 0

let categoryList = ["最新动态", "典型案例", "通知公告"]

let list = []
async function render() {
    let username = JSON.parse(isLogin()).username
    list = await fetch(`http://localhost:3000/news?author=${username}`)
        .then(res => res.json())

    console.log(list)
    listbody.innerHTML = list.map(item => `
    <tr>
        <th scope="row" >${item.title}</th>
        <td>
            ${categoryList[item.category]}
        </td>
        <td>
            <button type="button" class="btn btn-success btn-sm btn-preview" data-myid=${item.id}>预览</button>
            <button type="button" class="btn btn-primary btn-sm btn-update" data-myid=${item.id}>编辑</button>
            <button type="button" class="btn btn-danger btn-sm btn-delete" data-myid=${item.id}>删除</button>
        </td>      
    </tr>
`).join("")
}

function renderPreviewModal(obj) {
    document.querySelector("#previewModalTitle").innerHTML = obj.title
    document.querySelector("#previewModalContent").innerHTML = obj.content
}

listbody.onclick = function (evt) {
    if (evt.target.className.includes("btn-preview")) {
        // 显示modal
        myPreviewModal.toggle()
        // 预填modal
        updateId = evt.target.dataset.myid
        let obj = list.filter(item => item.id == evt.target.dataset.myid)[0]

        renderPreviewModal(obj)
    } else if (evt.target.className.includes("btn-update")) {
        location.href="/admin/views/news-manage/EditNews/index.html?id="+evt.target.dataset.myid
    } else if (evt.target.className.includes("btn-delete")) {
        updateId = evt.target.dataset.myid
        myDelModal.toggle()
    }
}

delConfirm.onclick = async function () {
    await fetch(`http://localhost:3000/news/${updateId}`, {
        method: "delete"
    }).then(res=>res.json()).then(()=>{
        myDelModal.toggle()
        render()
    })
}

render()