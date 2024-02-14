import { StudentCollection } from "../dtos/student-collection.model";
import { ipcMain } from "electron";

export class UpdateMessenger {
    public async SendUpdatedStudentCollection(studentCollection: StudentCollection)
    {
        await ipcMain.emit("studentcollectionupdated", studentCollection);
    }

    public async SendDeletedStudentCollection(id: string)
    {
        await ipcMain.emit("studentcollectiondeleted", id);
    }
}