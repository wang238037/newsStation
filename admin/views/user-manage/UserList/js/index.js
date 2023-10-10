import { load, isLogin } from "../../../../util/LoadView.js"
load("sidemenu-userList")
let myEditModal = new bootstrap.Modal(document.getElementById('editModal'))
let myDelModal=new bootstrap.Modal(document.getElementById('delModal'))
let list = []
let photodata = ""
let updateId = 0

async function render() {
    list = await fetch("http://localhost:3000/users")
        .then(res => res.json())
    // console.log(list)
    listbody.innerHTML = list.map(item => `
        <tr>
            <th scope="row" >${item.username}</th>
            <td>
                <img src="${item.photo}" style="width:50px; height:50px; border-radius:50%"/>
            </td>
            <td>
                <button type="button" class="btn btn-primary btn-sm btn-edit" data-myid=${item.id} ${item.default ? "disabled" : ""}>编辑</button>
                <button type="button" class="btn btn-danger btn-sm btn-del" data-myid=${item.id} ${item.default ? "disabled" : ""}>删除</button>
            </td>      
        </tr>
    `).join("")
    // 管理员的身份不允许被删除和修改
}

listbody.onclick = function (evt) {
    if (evt.target.className.includes("btn-edit")) {
        console.log("edit")
        // 显示modal
        myEditModal.toggle()
        // 预填modal
        updateId=evt.target.dataset.myid

        let obj = list.filter(item => item.id == evt.target.dataset.myid)[0]

        document.querySelector("#username").value = obj.username
        document.querySelector("#introduction").value = obj.introduction
        document.querySelector("#password").value = obj.password
        photodata = obj.photo

    } else if (evt.target.className.includes("btn-del")) {
        updateId=evt.target.dataset.myid
        myDelModal.toggle()
    }
}

photofile.onchange = function (evt) {
    // 将图片转换为base64编码格式
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function (e) {
        // console.log(e.target.result)
        photodata = e.target.result
    }
}

editConfirm.onclick = async function () {
    await fetch(`http://localhost:3000/users/${updateId}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:document.querySelector("#username").value,
            password:document.querySelector("#password").value,
            introduction:document.querySelector("#introduction").value,
            photo:photodata
        })
    }).then(res=>res.json()).then(()=>{
        myEditModal.toggle()
        render()
    })
}

delConfirm.onclick=async function(){
    await fetch(`http://localhost:3000/users/${updateId}`,{
        method:"delete"
    }).then(res=>res.json()).then(()=>{
        myDelModal.toggle()
        render()
    })
}

render()