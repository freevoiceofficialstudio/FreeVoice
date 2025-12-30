
/**
 * FREE VOICE DESKTOP CORE
 * This file handles the Desktop App lifecycle and background mic interception.
 */

const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // Custom modern frame
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    backgroundColor: '#020617',
    icon: path.join(__dirname, 'icon.png')
  });

  // Load the web app
  mainWindow.loadURL('https://free-voice-official.web.app');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// System Tray for Background Operation
function createTray() {
  tray = new Tray(path.join(__dirname, 'icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow.show() },
    { label: 'Stop Live Changer', click: () => stopLiveConversion() },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() }
  ]);
  tray.setToolTip('Free Voice Desktop');
  tray.setContextMenu(contextMenu);
}

function stopLiveConversion() {
    // Logic to release the Virtual Mic Driver
    console.log("Stopping background conversion...");
    mainWindow.webContents.send('stop-conversion');
}

app.on('ready', () => {
  createWindow();
  createTray();
});

// Membership Security: Desktop check
ipcMain.on('verify-membership', (event, userId) => {
    // Desktop apps can communicate with local OS features here
    // But they must still verify against Firestore server-side
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
