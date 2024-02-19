import { CreateGradePeriodDto } from "../request/grade-period/create-grade-period";
import { GradeDataProvider } from "../data-layer/grade-data-provider";
import { UpdateMessenger } from "../data-layer/update-messenger";
import { GradePeriod } from "../dtos/grade-config/grade-period.model";
import { deepCopy, generateGuid } from "../helpers/helper-methods";
import { ipcMain } from "electron";
import { UpdateGradePeriodDto } from "../request/grade-period/update-grade-period";
import { DeleteGradePeriodDto } from "../request/grade-period/delete-grade-period";
import { CopyGradePeriodDto } from "../request/grade-period/copy-grade-period";
import { MultiGradeConfiguration } from "../dtos/grade-config/multi-grade-configuration.model";
import { SingleGradeConfiguration } from "../dtos/grade-config/single-grade-configuration.model";

export class GradeHandler {
    public static initializeHandlers(gradeDataProvider: GradeDataProvider, updateMessenger: UpdateMessenger): void {
        ipcMain.on('createGradePeriod', async (c, arg: CreateGradePeriodDto) => {
            const gradePeriod: GradePeriod = {
                id: generateGuid(),
                name: arg.name,
                weight: arg.weight,
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
                    gradePeriod.weight = arg.weight;
                    await gradeDataProvider.createOrUpdate(studentCollection);
                    await updateMessenger.SendUpdatedStudentCollection(studentCollection);
                }
            }
        });

        ipcMain.on('deleteGradePeriod', async (c, arg: DeleteGradePeriodDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                studentCollection.gradePeriods = studentCollection.gradePeriods.filter(g => g.id !== arg.gradePeriodId);
                await gradeDataProvider.createOrUpdate(studentCollection);
                await updateMessenger.SendUpdatedStudentCollection(studentCollection);
            }
        });

        ipcMain.on('copyGradePeriod', async (c, arg: CopyGradePeriodDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                const gradePeriod = studentCollection.gradePeriods.find(s => s.id === arg.gradePeriodId);
                if (gradePeriod) {
                    const gradePeriodCopy = deepCopy(gradePeriod)
                    gradePeriodCopy.name = arg.name;
                    gradePeriodCopy.weight = arg.weight;
                    gradePeriodCopy.id = generateGuid();
                    this.updateGradePeriodIds(gradePeriodCopy);

                    studentCollection.gradePeriods.push(gradePeriodCopy);

                    await gradeDataProvider.createOrUpdate(studentCollection);
                    await updateMessenger.SendUpdatedStudentCollection(studentCollection);
                }
            }
        });
    }

    private static updateGradePeriodIds(g: GradePeriod): void {
        this.updateMultis(g.multiGradeConfigurations);
        this.updateSingles(g.singleGradeConfigurations);

        g.multiGradeConfigurations.forEach(m => {
            m.id = generateGuid();
            this.updateMultis(m.multiGradeConfigurations);
            this.updateSingles(m.singleGradeConfigurations);
        });
    }

    private static updateMultis(multi: MultiGradeConfiguration[]): void {
        multi.forEach(m => {
            m.id = generateGuid();
            this.updateMultis(m.multiGradeConfigurations);
            this.updateSingles(m.singleGradeConfigurations);
        });
    }

    private static updateSingles(singles: SingleGradeConfiguration[]): void {
        singles.forEach(s => s.id = generateGuid());
    }
}