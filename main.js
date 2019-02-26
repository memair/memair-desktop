const { app, BrowserWindow, Menu } = require('electron')
var path = require('path')

function createWindow () {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  })

  win.loadFile('app/index.html')

  Menu.setApplicationMenu();
}

app.on('ready', createWindow)
