import { BrowserWindow, app, ipcMain } from "electron";
import { StudentCollection } from "./dtos/student-collection.model";
import { GradeDataProvider } from "./data-layer/grade-data-provider";
import { CreateStudentCollectionDto } from "./request/student-collection/create-class-request";
import { UpdateMessenger } from "./data-layer/update-messenger";
import { UpdateStudentCollectionDto } from "./request/student-collection/update-class-request";
import { CopyStudentCollectionDto } from "./request/student-collection/copy-class-request";
import { deepCopy, generateGuid } from "./helpers/helper-methods";

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
    this.initializeHandlers(this.gradeDataProvider, this.updateMessenger);

    ipcMain.handle('ping', () => 'pong');
  }

  private static initializeHandlers(gradeDataProvider: GradeDataProvider, updateMessenger: UpdateMessenger): void {

    ipcMain.handle('getAllClasses', () => {
      const result = gradeDataProvider.getAll();
      return result;
    });

    ipcMain.handle('getClass', (c, args: string) => {
      const result = gradeDataProvider.get(args);
      return result;
    });

    ipcMain.on('createClass', async (c, arg: CreateStudentCollectionDto) => {
      const studentCollection: StudentCollection = {
        id: generateGuid(),
        name: arg.className,
        students: [],
        gradePeriods: []
      };

      await gradeDataProvider.createOrUpdate(studentCollection);
      updateMessenger.SendUpdatedStudentCollection(studentCollection);
    });

    ipcMain.on('updateClass', async (c, arg: UpdateStudentCollectionDto) => {
      const item = await gradeDataProvider.getDeepCopy(arg.id);
      if (item) {
        item.name = arg.className;
        await gradeDataProvider.createOrUpdate(item);
        updateMessenger.SendUpdatedStudentCollection(item);
      }
    });

    ipcMain.on('copyClass', async (c, arg: CopyStudentCollectionDto) => {
      const item = await gradeDataProvider.getDeepCopy(arg.id);
      if (item) {
        item.id = generateGuid();
        await gradeDataProvider.createOrUpdate(item);
        updateMessenger.SendUpdatedStudentCollection(item);
      }
    });

    ipcMain.on('deleteClass', async (c, arg: string) => {
      gradeDataProvider.delete(arg);
    });
  }
}

Main.main();