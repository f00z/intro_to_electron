const loader = require('monaco-loader')
const {ipcRenderer,remote}= require('electron')
const fs = require("fs")

let filePath
let changed= false

function saveFile(saveFilePath){
    model._lines.forEach((line)=>{
        data += line.text + model._EOL;
    })     
    fs.writeFileSync(saveFilePath, data, 'utf-8')
}

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
        filePath=url;
        changed=false;

        const filedata = fs.readFileSync(url, 'utf-8')
        console.log(filedata)

        const model = monaco.editor.createModel(filedata, 'javascript')
        model.onDidChangeContent(()=>{
             changed = true;
             changeListener.dispose()   
        })
        editor.setModel(model)
    })

    ipcRenderer.on('save-file',()=>{
        const model = editor.getModel()
        let data=''

        remote.dialog.showMessageBox(remote.getCurrentWindow(),{
            type:'question',
            title: 'Save?',
            message: 'Do you really want to save?',
            buttons: ['Yes','No']
        },(response)=>{
            if (response ===0 && filePath){
                dialog.showSaveDialog(browserWindow, {},(userPath)=>[
                     saveFile(userPath)   
                ])                 
            } 
            else if (response ===0){
                saveFile(filePath)
            }
            else {
                console.log("Not Saving!")
            }

        })
        

       
    })
})
