import { GradeDataProvider } from '../data-layer/grade-data-provider';
import { UpdateMessenger } from '../data-layer/update-messenger';
import { StudentCollection } from '../dtos/student-collection.model';
import { generateGuid } from '../helpers/helper-methods';
import { CopyStudentCollectionDto } from '../request/student-collection/copy-class-request';
import { CreateStudentCollectionDto } from '../request/student-collection/create-class-request';
import { UpdateStudentCollectionDto } from '../request/student-collection/update-class-request';
import { ipcMain } from 'electron';

export class StudentCollectionHandler {
  public static initializeHandlers(gradeDataProvider: GradeDataProvider, updateMessenger: UpdateMessenger): void {
    ipcMain.handle('getAllDirectories', () => {
      const result = gradeDataProvider.getAllDirectories();
      return result;
    });

    ipcMain.handle('deleteDirectory', async (c, args: string) => {
      const result = gradeDataProvider.deleteDirectory(args);
      const update = gradeDataProvider.getAllDirectories();
      await updateMessenger.SendUpdatedDirectories(update);
      return result;
    });

    ipcMain.handle('createDirectory', async (c, args: string) => {
      const result = gradeDataProvider.createDirectory(args);
      const update = gradeDataProvider.getAllDirectories();
      await updateMessenger.SendUpdatedDirectories(update);
      return result;
    });

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
        gradePeriods: [],
        directories: arg.directories,
      };

      await gradeDataProvider.createOrUpdate(studentCollection);
      await updateMessenger.SendUpdatedStudentCollection(studentCollection);
    });

    ipcMain.on('updateClass', async (c, arg: UpdateStudentCollectionDto) => {
      const item = await gradeDataProvider.getDeepCopy(arg.id);
      if (item) {
        item.name = arg.className;
        await gradeDataProvider.createOrUpdate(item);
        await updateMessenger.SendUpdatedStudentCollection(item);
      }
    });

    ipcMain.on('copyClass', async (c, arg: CopyStudentCollectionDto) => {
      const item = await gradeDataProvider.getDeepCopy(arg.id);
      if (item) {
        item.id = generateGuid();
        await gradeDataProvider.createOrUpdate(item);
        await updateMessenger.SendUpdatedStudentCollection(item);
      }
    });

    ipcMain.on('deleteClass', async (c, arg: string) => {
      gradeDataProvider.delete(arg);
      await updateMessenger.SendDeletedStudentCollection(arg);
    });
  }
}
