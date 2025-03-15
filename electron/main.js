const { Menu } = require('electron');
const { app, BrowserWindow, session } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    }
  });
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src 'self' https://ai.cilicili.club https: 'unsafe-inline' 'unsafe-eval' data: blob:"]
      }
    });
  });
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('加载失败:', errorCode, errorDescription);
    mainWindow.loadURL('https://ai.cilicili.club/intro/index');
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://ai.cilicili.club')) {
      mainWindow.loadURL(url);
    }
    return { action: 'deny' };
  });
  mainWindow.loadURL('https://ai.cilicili.club/intro/index');
  if (process.env.ELECTRON === 'true') {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  const emptyMenu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(emptyMenu);
}

// 允许跨域请求
app.commandLine.appendSwitch('disable-site-isolation-trials');
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});