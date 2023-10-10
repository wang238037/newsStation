const loginform = document.querySelector("#loginform")
loginform.onsubmit = async function (evt) {
    loginwarning.style.display="none"
    // console.log("submit")
    evt.preventDefault()
    // console.log(username.value,password.value)
    let res = await fetch(`http://localhost:3000/users?username=${username.value}&password=${password.value}`)
        .then(res => res.json())
    // console.log(res)
    if(res.length>0){
        // 登录成功，跳转页面
        localStorage.setItem("token",JSON.stringify({
            ...res[0],password:"***"
        }))
        location.href="../home/index.html"
        
        
    }else{
        // 登录失败，提示用户名密码不匹配
        loginwarning.style.display="block"
    }
}