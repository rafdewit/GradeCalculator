import { GradeDataProvider } from "../data-layer/grade-data-provider";
import { UpdateMessenger } from "../data-layer/update-messenger";
import { ipcMain } from "electron";
import { SingleGradesUpdateDto } from "../request/grade-update/single-grades-update";

export class UpdateSinglesHandler {
    public static initializeHandlers(gradeDataProvider: GradeDataProvider, updateMessenger: UpdateMessenger): void {
        ipcMain.on('updateSingleGrades', async (c, arg: SingleGradesUpdateDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                arg.singleGradeUpdates.forEach(u => {
                    const student = studentCollection.students.find(s => s.id === u.studentId);
                    if(student) {
                        const grade = student.studentSingleGrades.find(g => g.singleGradeConfigurationId === arg.singleGradeConfigurationId);
                        if(grade) {
                            grade.score = u.score;
                        }
                    }
                });

                await gradeDataProvider.createOrUpdate(studentCollection);
                await updateMessenger.SendUpdatedStudentCollection(studentCollection);
            }
        });
    }
}