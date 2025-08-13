const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 300,
    });

    win.setMenuBarVisibility(false); // hides menu bar
    win.webContents.openDevTools();  // opens developer tools


    win.loadFile('C:/Users/Deep/OneDrive/Desktop/cmdDev/CmDZeN/ElectronZenGUI/CmDZeNGUI/dist/index.html');
}

app.whenReady().then(createWindow);
