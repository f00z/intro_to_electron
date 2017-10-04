const {app, BrowserWindow, Menu}= require('electron')
let mainWindow

app.on("ready",()=>{
    
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.on("will-navigate",(event, url)=>{
        event.preventDefault();
        console.log(url);
        mainWindow.webContents.send('open-file', url)
    })

    const menuTemplate = [{
        label:'File',
        submenu:[
           {
            label: 'Save File',
            click(){
                mainWindow.webContents.send('save-file')
            }
           }
        ]
    }]
    
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu)
})