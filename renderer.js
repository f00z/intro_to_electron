const loader = require('monaco-loader')
const {ipcRenderer}= require('electron')
const fs = require("fs")

loader().then((monaco)=>{
    const div= document.querySelector('#container')
    let editor = monaco.editor.create(div, {
        language:'javascript',
        theme: 'vs-dark',
        automaticLayout:true
    })

    ipcRenderer.on('open-file',(sender, url = '')=>{
        const sliceLength = process.platform === 'win32' ? 8:7
        url=url.slice(sliceLength);
        console.log(url);

        const filedata = fs.readFileSync(url, 'utf-8')
        console.log(filedata)

        const model = monaco.editor.createModel(filedata, 'javascript')
        editor.setModel(model)
    })
})