const {app, BrowserWindow, Menu, dialog}= require('electron')

let mainWindow

app.on("ready",()=>{
    
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.on("will-navigate",(event, url)=>{
        event.preventDefault();
        console.log(url);
        mainWindow.webContents.send('open-file', url)
    })

    const menuTemplate = [
       {
         label: "Editor",
         submenu:[
             {
                 role: 'toggledevtools'   
             },
             {
                 role: 'quit'
             }
         ]
       },
       {
        label:'File',
        submenu:[
           {
            label: 'Save File',
            click(){
                mainWindow.webContents.send('save-file')
            }
           }
        ]
       },
       {
           role: 'editMenu' 
       },
       {
           role: 'windowMenu'
       },
       {
           label: 'Open File',
           click(){
               dialog.showOpenDialog(mainWindow, (urls)=>{
                   if (!urls || urls.length ===0){
                       return
                   }
                   mainWindow.webContents.send('open-file', url[0])
               })
           }
       }
    ]

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu)
})