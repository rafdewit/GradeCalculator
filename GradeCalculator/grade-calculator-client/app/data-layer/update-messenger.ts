import { StudentCollection } from "../dtos/student-collection.model";
import { BrowserWindow, ipcMain } from "electron";

export class UpdateMessenger {
    constructor(private mainWindow: BrowserWindow) {

    }

    public async SendUpdatedStudentCollection(studentCollection: StudentCollection)
    {
        this.mainWindow.webContents.send("studentcollectionupdated", studentCollection);
    }

    public async SendDeletedStudentCollection(id: string)
    {
        this.mainWindow.webContents.send("studentcollectiondeleted", id);
    }
}