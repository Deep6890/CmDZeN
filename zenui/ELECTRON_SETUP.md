# Electron Desktop App Setup Guide

## 📦 Electron Integration for ZEN Focus

### **What is Electron?**
Electron allows you to build desktop applications using web technologies (HTML, CSS, JavaScript). Your React app can run as a native desktop application on Windows, macOS, and Linux.

## 🚀 Quick Electron Setup

### **Step 1: Install Electron Dependencies**
```bash
cd ReactGui
npm install electron electron-builder --save-dev
```

### **Step 2: Create Electron Main Process**
Create `ReactGui/electron/main.js`:
```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../src/assets/icon.png')
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```

### **Step 3: Create Preload Script**
Create `ReactGui/electron/preload.js`:
```javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Expose safe APIs to renderer process
  platform: process.platform,
  versions: process.versions
});
```

### **Step 4: Update package.json**
Add to `ReactGui/package.json`:
```json
{
  "main": "electron/main.js",
  "scripts": {
    "electron": "electron .",
    "electron:dev": "concurrently \"npm run dev\" \"wait-on http://localhost:5173 && electron .\"",
    "electron:build": "npm run build && electron-builder",
    "electron:dist": "npm run build && electron-builder --publish=never"
  },
  "build": {
    "appId": "com.zenfocus.app",
    "productName": "ZEN Focus",
    "directories": {
      "output": "release"
    },
    "files": [
      "dist/**/*",
      "electron/**/*",
      "node_modules/**/*"
    ],
    "mac": {
      "category": "public.app-category.productivity"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "AppImage"
    }
  }
}
```

## 📁 Electron File Structure

```
ReactGui/
├── electron/
│   ├── main.js              # Main Electron process
│   ├── preload.js           # Preload script
│   └── icon.png             # App icon
├── src/                     # React source code
├── dist/                    # Built React app (gitignored)
├── release/                 # Electron builds (gitignored)
└── package.json             # Updated with Electron scripts
```

## 🔧 Development Workflow

### **Web Development**
```bash
npm run dev                  # React development server
```

### **Electron Development**
```bash
npm run electron:dev         # React + Electron together
```

### **Building for Distribution**
```bash
npm run electron:build       # Build for current platform
npm run electron:dist        # Build without publishing
```

## 🎯 Platform-Specific Builds

### **Windows**
```bash
npm run electron:build -- --win
# Generates: .exe installer
```

### **macOS**
```bash
npm run electron:build -- --mac
# Generates: .dmg installer
```

### **Linux**
```bash
npm run electron:build -- --linux
# Generates: .AppImage file
```

## 📋 Git Best Practices for Electron

### **✅ COMMIT These Files**
```
electron/
├── main.js                  # Main process code
├── preload.js              # Preload script
└── icon.png                # App icon (small file)

package.json                 # Updated scripts
```

### **❌ NEVER COMMIT These**
```
out/                        # Electron build output
release/                    # Distribution files
dist-electron/              # Electron-specific dist
*.exe                       # Windows executables
*.dmg                       # macOS disk images
*.deb                       # Debian packages
*.rpm                       # Red Hat packages
*.AppImage                  # Linux AppImages
*.snap                      # Snap packages
```

## 🚨 Critical Electron Warnings

### **1. Build File Sizes**
- Electron apps are 100MB+ due to Chromium
- NEVER commit build files to Git
- Use releases or CI/CD for distribution

### **2. Security Considerations**
```javascript
// ALWAYS use these security settings:
webPreferences: {
  nodeIntegration: false,        // Disable Node.js in renderer
  contextIsolation: true,        // Enable context isolation
  preload: path.join(__dirname, 'preload.js')
}
```

### **3. Auto-Updater Setup**
```javascript
// For production apps, implement auto-updater:
const { autoUpdater } = require('electron-updater');

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();
});
```

## 🔄 CI/CD for Electron

### **GitHub Actions Example**
Create `.github/workflows/electron.yml`:
```yaml
name: Build Electron App

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]

    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: |
        cd ReactGui
        npm install
    
    - name: Build Electron app
      run: |
        cd ReactGui
        npm run electron:build
    
    - name: Upload artifacts
      uses: actions/upload-artifact@v2
      with:
        name: electron-app-${{ matrix.os }}
        path: ReactGui/release/
```

## 📱 Electron Features Integration

### **Native Notifications**
```javascript
// In main.js
const { Notification } = require('electron');

function showNotification(title, body) {
  new Notification({ title, body }).show();
}
```

### **System Tray**
```javascript
// In main.js
const { Tray, Menu } = require('electron');

let tray = null;

function createTray() {
  tray = new Tray(path.join(__dirname, 'icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() }
  ]);
  tray.setContextMenu(contextMenu);
}
```

### **File System Access**
```javascript
// In preload.js
const { ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (data) => ipcRenderer.invoke('save-file', data),
  loadFile: () => ipcRenderer.invoke('load-file')
});
```

## 🎯 Production Checklist

- [ ] App icon added (multiple sizes)
- [ ] Security settings configured
- [ ] Auto-updater implemented
- [ ] Code signing certificates (for distribution)
- [ ] Build scripts tested on all platforms
- [ ] No build files in Git repository
- [ ] CI/CD pipeline configured
- [ ] App store compliance (if publishing)

## 📞 Electron Support Resources

- **Official Docs**: https://electronjs.org/docs
- **Security Guide**: https://electronjs.org/docs/tutorial/security
- **Best Practices**: https://electronjs.org/docs/tutorial/best-practices
- **Electron Builder**: https://www.electron.build/

---

**Remember**: Electron turns your web app into a powerful desktop application! 🖥️