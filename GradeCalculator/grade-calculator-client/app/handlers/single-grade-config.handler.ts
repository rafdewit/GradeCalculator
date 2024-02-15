import { CreateSingleGradeConfigurationDto } from "app/request/single/create-single-grade-configuration";
import { GradeDataProvider } from "../data-layer/grade-data-provider";
import { UpdateMessenger } from "../data-layer/update-messenger";
import { Student } from "../dtos/students/student.model";
import { generateGuid } from "../helpers/helper-methods";
import { ipcMain } from "electron";
import { UpdateSingleGradeConfigurationDto } from "app/request/single/update-single-grade-configuration";
import { DeleteSingleGradeConfigurationDto } from "app/request/single/delete-single-grade-configuration";
import { GradeConfigFinder } from "./grade-config.finder";
import { SingleGradeConfiguration } from "app/dtos/grade-config/single-grade-configuration.model";

export class StudentHandler {
    public static initializeHandlers(gradeDataProvider: GradeDataProvider, updateMessenger: UpdateMessenger): void {
        ipcMain.on('createSingleGradeConfigurationDto', async (c, arg: CreateSingleGradeConfigurationDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (!studentCollection) {
                return;
            }

            const single: SingleGradeConfiguration = {
                id: generateGuid(),
                name: arg.name,
                totalScore: arg.totalScore,
                weight: arg.weight
            };

            if (arg.multiParentId) {
                const parent = GradeConfigFinder.findMulti(studentCollection, arg.multiParentId);
                if (parent) {
                    parent.result.singleGradeConfigurations.push(single);
                }
            } else if (arg.gradePeriodId) {
                const gradePeriod = studentCollection.gradePeriods.find(g => g.id === arg.gradePeriodId);
                if (gradePeriod) {
                    gradePeriod.singleGradeConfigurations.push(single);
                }
            }

            await gradeDataProvider.createOrUpdate(studentCollection);
            await updateMessenger.SendUpdatedStudentCollection(studentCollection);
        });

        ipcMain.on('updateSingleGradeConfiguration', async (c, arg: UpdateSingleGradeConfigurationDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                const single = GradeConfigFinder.findSingle(studentCollection, arg.singleId);
                if (single) {
                    single.result.name = arg.name;
                    single.result.totalScore = arg.totalScore;
                    single.result.weight = arg.weight;
                }

                await gradeDataProvider.createOrUpdate(studentCollection);
                await updateMessenger.SendUpdatedStudentCollection(studentCollection);
            }
        });

        ipcMain.on('deleteSingleGradeConfigurationDto', async (c, arg: DeleteSingleGradeConfigurationDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                const single = GradeConfigFinder.findSingle(studentCollection, arg.singleId);
                if(single) {
                    if(single.parent) {
                        const index = single.parent.singleGradeConfigurations.findIndex(s => s.id === arg.singleId);
                        if(index >= 0) {
                            single.parent.singleGradeConfigurations = single.parent.singleGradeConfigurations.splice(index, 1);
                        }
                    } else {
                        const index = single.gradePeriod.singleGradeConfigurations.findIndex(s => s.id === arg.singleId);
                        if(index >= 0) {
                            single.gradePeriod.singleGradeConfigurations.splice(index, 1);
                        }
                    }
                }
                
                await gradeDataProvider.createOrUpdate(studentCollection);
                await updateMessenger.SendUpdatedStudentCollection(studentCollection);
            }
        });
    }
}