const path = require('path');
const url = require('url');
const os = require('os');
const { app, session, BrowserWindow } = require('electron');

const DEV_DIR = '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.8.1_0';
let mainWindow;

const dev = (process.env.ELECTRON_ENV === 'development');

// Temporary fix for broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 930,
    height: 850,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let indexPath;
  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, '..', 'dist', 'index.html'),
      slashes: true,
    });
  }
  mainWindow.loadURL(indexPath);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    if (dev) {
      mainWindow.webContents.openDevTools();
    }
    if (!dev) {
      mainWindow.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\');
      global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\');
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  if (dev) {
    setTimeout(() => {
      session.defaultSession.loadExtension(
        path.join(os.homedir(), DEV_DIR)
      );
    }, 3000);
  }
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
