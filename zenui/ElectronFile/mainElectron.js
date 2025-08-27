const { app, BrowserWindow, protocol } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Set Content Security Policy
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['default-src \'self\' \'unsafe-inline\' data: blob:; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'; style-src \'self\' \'unsafe-inline\';']
      }
    });
  });

  if (process.env.ELECTRON_DEV) {
    // 👉 In development, load React (Vite) dev server
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    // 👉 In production, load React build files
    mainWindow.loadFile(path.join(__dirname, "../ReactGui/dist/index.html"));
  }
}

app.whenReady().then(() => {
  // Register protocol for serving JSON files
  protocol.registerFileProtocol('json', (request, callback) => {
    const url = request.url.substr(7); // Remove 'json://' prefix
    const filePath = path.join(__dirname, '../ReactGui/public', url);
    callback({ path: filePath });
  });
  
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
