const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 300,
        frame: true,
        titleBarOverlay: {
            color: '#333333', // Background color of the title bar overlay
            symbolColor: '#FFFFFF', // Color of the symbols (e.g., 'x' for close)
            height: 30
        } // Optional: Height of the title bar overlay
    });

    win.setMenuBarVisibility(false); // hides menu bar
    win.webContents.openDevTools();  // opens developer tools


    win.loadFile('C:/Users/Deep/OneDrive/Desktop/cmdDev/CmDZeN/ElectronZenGUI/CmDZeNGUI/dist/index.html');
}

app.whenReady().then(createWindow);
