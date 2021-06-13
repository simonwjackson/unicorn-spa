/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow } = require('electron')
const path = require('path')

const main = () => {
   function createWindow() {
      const win = new BrowserWindow({
         width: 800,
         height: 600,
         show: false,
         webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
         },
      })

      win.once('ready-to-show', () => win.show())
      win.loadURL('http://localhost:31348/index')
   }

   app.whenReady().then(() => {
      createWindow()

      app.on('activate', () => {
         if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
         }
      })
   })

   app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
         app.quit()
      }
   })
}

require('./server')({
   cb: main,
   isProduction: app.isPackaged,
})
