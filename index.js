const {app, BrowserWindow}= require('electron')
let mainWindow

app.on("ready",()=>{
    
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.on("will-navigate",(event, url)=>{
        event.preventDefault();
        console.log(url);
        mainWindow.webContents.send('open-file', url)
    })

})