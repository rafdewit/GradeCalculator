import { BrowserWindow, app, ipcMain } from "electron";
import { StudentCollection } from "src/services/dtos/student-collection.model";
const path = require('node:path');

export default class Main {
  private static appWindow: BrowserWindow | null;

  static main() {
    app.on('ready', () => this.onReady());
    app.on('window-all-closed', () => app.quit());
  }

  private static onReady() {
    this.appWindow = new BrowserWindow({
      width: 1000,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
      }
    });

    this.appWindow.webContents.openDevTools();
    this.appWindow.loadFile('dist/grade-calculator-client/index.html');
    this.appWindow.on('closed', () => this.appWindow = null);

    ipcMain.handle('getAllClasses', () => {
      const studentCollection: StudentCollection = {
        id: 'test-id',
        name: 'test-name',
        gradePeriods: [],
        students: []
      };
      return [studentCollection];
    });

    ipcMain.handle('ping', () => 'pong');
  }
}

Main.main();