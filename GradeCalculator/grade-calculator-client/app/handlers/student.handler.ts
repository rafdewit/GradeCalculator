import { GradeDataProvider } from "../data-layer/grade-data-provider";
import { UpdateMessenger } from "../data-layer/update-messenger";
import { Student } from "../dtos/students/student.model";
import { generateGuid } from "../helpers/helper-methods";
import { CreateStudentPeriodDto } from "../request/students/create-student-period";
import { DeleteStudentPeriodDto } from "../request/students/delete-student-period";
import { UpdateStudentPeriodDto } from "../request/students/update-student-period";
import { ipcMain } from "electron";

export class StudentHandler {
    public static initializeHandlers(gradeDataProvider: GradeDataProvider, updateMessenger: UpdateMessenger): void {
        ipcMain.on('createStudent', async (c, arg: CreateStudentPeriodDto) => {
            const student: Student = {
                id: generateGuid(),
                name: arg.name,
                studentSingleGrades: []
            }

            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                studentCollection.students.push(student);
                await gradeDataProvider.createOrUpdate(studentCollection);
                await updateMessenger.SendUpdatedStudentCollection(studentCollection);
            }
        });

        ipcMain.on('updateStudent', async (c, arg: UpdateStudentPeriodDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                const student = studentCollection.students.find(s => s.id === arg.studentId);
                if (student) {
                    student.name = arg.name;
                    await gradeDataProvider.createOrUpdate(studentCollection);
                    await updateMessenger.SendUpdatedStudentCollection(studentCollection);
                }
            }
        });

        ipcMain.on('deleteStudent', async (c, arg: DeleteStudentPeriodDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                const studentIndex = studentCollection.students.findIndex(s => s.id === arg.studentId);
                if (studentIndex >= 0) {
                    studentCollection.students = studentCollection.students.splice(studentIndex, 1);
                    await gradeDataProvider.createOrUpdate(studentCollection);
                    await updateMessenger.SendUpdatedStudentCollection(studentCollection);
                }
            }
        });
    }
}