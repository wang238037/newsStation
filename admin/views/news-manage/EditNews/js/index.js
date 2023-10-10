import { load, isLogin } from "../../../../util/LoadView.js"

load("sidemenu-newsList")  // 加载sidemenu和topbar


let newsContent=""
let coverPhoto=""

// 获取新闻列表页面传来的id值
let updateId=new URL(location.href).searchParams.get("id")

const { createEditor, createToolbar } = window.wangEditor

// 编辑器的配置信息
const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
        const html = editor.getHtml()
        newsContent=html
        // console.log('editor content', html)
        // 也可以同步到 <textarea>
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})

coverfile.onchange = function (evt) {
    // 将图片转换为base64编码格式
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function (e) {
        // console.log(e.target.result)
        coverPhoto = e.target.result
    }
}

editNewsForm.onsubmit= async function(evt){
    evt.preventDefault()
    await fetch(`http://localhost:3000/news/${updateId}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            title:title.value,
            content:newsContent,
            category:category.value,
            cover:coverPhoto
        })
    }).then(res=>res.json()).then(()=>{
        location.href="/admin/views/news-manage/NewsList/index.html"
    })

}

async function render(){
    let {title,category,content,cover} = await fetch(`http://localhost:3000/news/${updateId}`)
    .then(res=>res.json())
    // console.log(obj)

    document.querySelector("#title").value=title
    document.querySelector("#category").value=category
    editor.setHtml(content)
    newsContent=content
    coverPhoto=cover

}

render()