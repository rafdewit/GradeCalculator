import { BrowserWindow, app, ipcMain } from "electron";
import { StudentCollection } from "./dtos/student-collection.model";
import { GradeDataProvider } from "./data-layer/grade-data-provider";
import { CreateStudentCollectionDto } from "./request/student-collection/create-class-request";

const path = require('node:path');

export default class Main {
  private static appWindow: BrowserWindow | null;
  private static gradeDataProvider: GradeDataProvider = new GradeDataProvider();

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

    this.initializeHandlers(this.gradeDataProvider);

    ipcMain.handle('ping', () => 'pong');
  }

  private static initializeHandlers(gradeDataProvider: GradeDataProvider): void {

    ipcMain.handle('getAllClasses', () => {
      const result = gradeDataProvider.getAll();
      return result;
    });

    ipcMain.handle('getClass', (c, args: string) => {
      const result = gradeDataProvider.get(args);
      return result;
    });

    ipcMain.on('createClass', (c, arg: CreateStudentCollectionDto) => {
      const studentCollection: StudentCollection = {
        id: this.generateGuid(),
        name: arg.className,
        students: [],
        gradePeriods: []
      };
      
      console.log(studentCollection);

      const result = gradeDataProvider.createOrUpdate(studentCollection);
      return result;
    });
    
  }

  private static generateGuid(): string {
    const crypto = require("crypto")
    return crypto.randomBytes(16).toString("hex");
  }
}

Main.main();