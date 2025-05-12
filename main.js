const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const http = require('http');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const checkServer = () => {
    http.get('http://localhost:3000', () => {
      mainWindow.loadURL('http://localhost:3000');
    }).on('error', () => {
      setTimeout(checkServer, 500);
    });
  };

  exec('npm start', (err, stdout, stderr) => {
    if (err) {
      console.error(`Błąd uruchamiania backendu: ${err}`);
      return;
    }
  });

  checkServer();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});