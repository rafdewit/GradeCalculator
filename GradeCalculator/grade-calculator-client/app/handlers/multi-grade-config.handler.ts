import { GradeDataProvider } from "../data-layer/grade-data-provider";
import { UpdateMessenger } from "../data-layer/update-messenger";
import { generateGuid } from "../helpers/helper-methods";
import { ipcMain } from "electron";
import { GradeConfigFinder } from "./grade-config.finder";
import { MultiGradeConfiguration } from "../dtos/grade-config/multi-grade-configuration.model";
import { CreateMultiGradeConfigurationDto } from "../request/multi/create-multi-grade-configuration";
import { UpdateMultiGradeConfigurationDto } from "../request/multi/update-multi-grade-configuration";
import { DeleteMultiGradeConfigurationDto } from "../request/multi/delete-multi-grade-configuration";

export class StudentHandler {
    public static initializeHandlers(gradeDataProvider: GradeDataProvider, updateMessenger: UpdateMessenger): void {
        ipcMain.on('createMultiGradeConfigurationDto', async (c, arg: CreateMultiGradeConfigurationDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (!studentCollection) {
                return;
            }

            const multi: MultiGradeConfiguration = {
                id: generateGuid(),
                name: arg.name,
                weight: arg.weight,
                multiGradeConfigurations: [],
                singleGradeConfigurations: []
            };

            if (arg.multiParentId) {
                const parent = GradeConfigFinder.findMulti(studentCollection, arg.multiParentId);
                if (parent) {
                    parent.result.multiGradeConfigurations.push(multi);
                }
            } else if (arg.gradePeriodId) {
                const gradePeriod = studentCollection.gradePeriods.find(g => g.id === arg.gradePeriodId);
                if (gradePeriod) {
                    gradePeriod.multiGradeConfigurations.push(multi);
                }
            }

            await gradeDataProvider.createOrUpdate(studentCollection);
            await updateMessenger.SendUpdatedStudentCollection(studentCollection);
        });

        ipcMain.on('updateMultiGradeConfiguration', async (c, arg: UpdateMultiGradeConfigurationDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                const multi = GradeConfigFinder.findMulti(studentCollection, arg.multiId);
                if (multi) {
                    multi.result.name = arg.name;
                    multi.result.weight = arg.weight;
                }

                await gradeDataProvider.createOrUpdate(studentCollection);
                await updateMessenger.SendUpdatedStudentCollection(studentCollection);
            }
        });

        ipcMain.on('deleteMultiGradeConfigurationDto', async (c, arg: DeleteMultiGradeConfigurationDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                const multi = GradeConfigFinder.findMulti(studentCollection, arg.multiId);
                if(multi) {
                    if(multi.parent) {
                        const index = multi.parent.multiGradeConfigurations.findIndex(s => s.id === arg.multiId);
                        if(index >= 0) {
                            multi.parent.multiGradeConfigurations = multi.parent.multiGradeConfigurations.splice(index, 1);
                        }
                    } else {
                        const index = multi.gradePeriod.multiGradeConfigurations.findIndex(s => s.id === arg.multiId);
                        if(index >= 0) {
                            multi.gradePeriod.multiGradeConfigurations.splice(index, 1);
                        }
                    }
                }
                
                await gradeDataProvider.createOrUpdate(studentCollection);
                await updateMessenger.SendUpdatedStudentCollection(studentCollection);
            }
        });
    }
}