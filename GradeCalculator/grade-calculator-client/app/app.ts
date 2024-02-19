import { BrowserWindow, app, ipcMain } from "electron";
import { GradeDataProvider } from "./data-layer/grade-data-provider";
import { UpdateMessenger } from "./data-layer/update-messenger";
import { StudentCollectionHandler } from "./handlers/student-collection.handler";
import { StudentHandler } from "./handlers/student.handler";
import { GradeHandler } from "./handlers/grade.handler";
import { UpdateSinglesHandler } from "./handlers/update-singles.handler";
import { SingleGradeConfigHandler } from "./handlers/single-grade-config.handler";
import { MultiGradeConfigHandler } from "./handlers/multi-grade-config.handler";

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
      width: 1600,
      height: 1200,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
      }
    });

    this.appWindow.webContents.openDevTools();
    this.appWindow.maximize();
    this.appWindow.loadFile('dist/grade-calculator-client/index.html');
    this.appWindow.on('closed', () => this.appWindow = null);

    this.updateMessenger = new UpdateMessenger(this.appWindow);

    StudentCollectionHandler.initializeHandlers(this.gradeDataProvider, this.updateMessenger);
    StudentHandler.initializeHandlers(this.gradeDataProvider, this.updateMessenger);
    GradeHandler.initializeHandlers(this.gradeDataProvider, this.updateMessenger);
    UpdateSinglesHandler.initializeHandlers(this.gradeDataProvider, this.updateMessenger);
    SingleGradeConfigHandler.initializeHandlers(this.gradeDataProvider, this.updateMessenger);
    MultiGradeConfigHandler.initializeHandlers(this.gradeDataProvider, this.updateMessenger);

    ipcMain.handle('ping', () => 'pong');
  }

  
}

Main.main();