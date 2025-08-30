const { app, BrowserWindow, protocol } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
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
        'Content-Security-Policy': ['default-src \'self\' \'unsafe-inline\' data: blob:; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\';']
      }
    });
  });

  if (process.env.ELECTRON_DEV) {
    // In development, load React (Vite) dev server
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    // In production, check if build exists, otherwise show error
    const buildPath = path.join(__dirname, "../ReactGui/dist/index.html");
    if (fs.existsSync(buildPath)) {
      mainWindow.loadFile(buildPath);
    } else {
      // Load a simple HTML page with instructions
      const errorHtml = `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Build Not Found</h2>
            <p>The React build files are not found. Please:</p>
            <ol>
              <li>Navigate to the ReactGui folder</li>
              <li>Run <code>npm run build</code></li>
              <li>Or use <code>npm run dev</code> for development mode</li>
            </ol>
          </body>
        </html>
      `;
      mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(errorHtml));
    }
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