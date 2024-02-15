import { BrowserWindow, app, ipcMain } from "electron";
import { StudentCollection } from "./dtos/student-collection.model";
import { GradeDataProvider } from "./data-layer/grade-data-provider";
import { CreateStudentCollectionDto } from "./request/student-collection/create-class-request";
import { UpdateMessenger } from "./data-layer/update-messenger";
import { UpdateStudentCollectionDto } from "./request/student-collection/update-class-request";
import { CopyStudentCollectionDto } from "./request/student-collection/copy-class-request";
import { deepCopy, generateGuid } from "./helpers/helper-methods";
import { StudentCollectionHandler } from "./handlers/student-collection.handler";
import { StudentHandler } from "./handlers/student.handler";
import { GradeHandler } from "./handlers/grade.handler";

const path = require('node:path');

export default class Main {
  private static appWindow: BrowserWindow | null;
  private static gradeDataProvider: GradeDataProvider = new GradeDataProvider();
  private static updateMessenger: UpdateMessenger;

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

    this.updateMessenger = new UpdateMessenger(this.appWindow);

    StudentCollectionHandler.initializeHandlers(this.gradeDataProvider, this.updateMessenger);
    StudentHandler.initializeHandlers(this.gradeDataProvider, this.updateMessenger);
    GradeHandler.initializeHandlers(this.gradeDataProvider, this.updateMessenger);
    
    ipcMain.handle('ping', () => 'pong');
  }

  
}

Main.main();