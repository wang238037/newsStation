import { load, isLogin } from "../../../../util/LoadView.js"
load("sidemenu-addUser")  // 加载sidemenu和topbar

let photo = ""
addUserForm.onsubmit = async function (evt) {
    evt.preventDefault()

    await fetch("http://localhost:3000/users", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
            introduction: introduction.value,
            photo: photo
        })
    }).then(res=>res.json())
    
    location.href="/admin/views/user-manage/UserList/index.html"
    

}
photofile.onchange = function (evt) {
    // 将图片转换为base64编码格式
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function (e) {
        // console.log(e.target.result)
        photo = e.target.result
    }
}