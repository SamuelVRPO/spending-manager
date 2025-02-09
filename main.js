const { app, BrowserWindow } = require('electron');
const path = require('path');


function createWindow() {
    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    const indexPath = path.join(__dirname, 'dist', 'spending-manager', 'browser', 'index.html');
    win.loadURL(`file://${indexPath}`);
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});