import { CreateGradePeriodDto } from "../request/grade-period/create-grade-period";
import { GradeDataProvider } from "../data-layer/grade-data-provider";
import { UpdateMessenger } from "../data-layer/update-messenger";
import { GradePeriod } from "../dtos/grade-config/grade-period.model";
import { generateGuid } from "../helpers/helper-methods";
import { ipcMain } from "electron";
import { UpdateGradePeriodDto } from "../request/grade-period/update-grade-period";
import { DeleteGradePeriodDto } from "../request/grade-period/delete-grade-period";

export class GradeHandler {
    public static initializeHandlers(gradeDataProvider: GradeDataProvider, updateMessenger: UpdateMessenger): void {
        ipcMain.on('createGradePeriod', async (c, arg: CreateGradePeriodDto) => {
            const gradePeriod: GradePeriod = {
                id: generateGuid(),
                name: arg.name,
                multiGradeConfigurations: [],
                singleGradeConfigurations: []
            }

            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                studentCollection.gradePeriods.push(gradePeriod);
                await gradeDataProvider.createOrUpdate(studentCollection);
                await updateMessenger.SendUpdatedStudentCollection(studentCollection);
            }
        });

        ipcMain.on('updateGradePeriod', async (c, arg: UpdateGradePeriodDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                const gradePeriod = studentCollection.gradePeriods.find(s => s.id === arg.gradePeriodId);
                if (gradePeriod) {
                    gradePeriod.name = arg.name;
                    await gradeDataProvider.createOrUpdate(studentCollection);
                    await updateMessenger.SendUpdatedStudentCollection(studentCollection);
                }
            }
        });

        ipcMain.on('deleteGradePeriod', async (c, arg: DeleteGradePeriodDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                const gradePeriodIndex = studentCollection.students.findIndex(s => s.id === arg.gradePeriodId);
                if (gradePeriodIndex >= 0) {
                    studentCollection.gradePeriods = studentCollection.gradePeriods.splice(gradePeriodIndex, 1);
                    await gradeDataProvider.createOrUpdate(studentCollection);
                    await updateMessenger.SendUpdatedStudentCollection(studentCollection);
                }
            }
        });
    }
}