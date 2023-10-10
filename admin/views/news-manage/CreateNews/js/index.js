import { load, isLogin } from "../../../../util/LoadView.js"

load("sidemenu-addNews")  // 加载sidemenu和topbar

let newsContent=""
let coverPhoto=""
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

addNewsForm.onsubmit= async function(evt){
    evt.preventDefault()
    await fetch("http://localhost:3000/news",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            title:title.value,
            content:newsContent,
            category:category.value,
            cover:coverPhoto,
            author:JSON.parse(isLogin()).username
        })
    }).then(res=>res.json()).then(()=>{
        location.href="/admin/views/news-manage/NewsList/index.html"
    })

}