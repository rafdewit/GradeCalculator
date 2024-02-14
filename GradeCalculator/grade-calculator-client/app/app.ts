import { BrowserWindow, app, ipcMain } from "electron";
import { StudentCollection } from "./dtos/student-collection.model";
import { GradeDataProvider } from "./data-layer/grade-data-provider";
import { CreateStudentCollectionDto } from "./request/student-collection/create-class-request";
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

    this.initializeHandlers();

    ipcMain.handle('ping', () => 'pong');
  }

  private static initializeHandlers(): void {
    ipcMain.handle('getAllClasses', () => {
      const provider: GradeDataProvider = new GradeDataProvider();
      const studentCollection: StudentCollection = {
        id: 'test-id',
        name: 'test-name',
        gradePeriods: [],
        students: []
      };

      provider.store(studentCollection);
      const result = provider.get(studentCollection.id);

      return [result];
    });

    ipcMain.handle('getClass', () => {
      const studentCollection: StudentCollection = {
        id: 'test-id',
        name: 'test-name',
        gradePeriods: [],
        students: []
      };
      return studentCollection;
    });

    ipcMain.on('createClass', (c, arg: CreateStudentCollectionDto) => {
      console.log(arg);
    });
    
  }
}

Main.main();