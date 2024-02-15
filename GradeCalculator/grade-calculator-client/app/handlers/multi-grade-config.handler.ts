import { GradeDataProvider } from "../data-layer/grade-data-provider";
import { UpdateMessenger } from "../data-layer/update-messenger";
import { generateGuid } from "../helpers/helper-methods";
import { ipcMain } from "electron";
import { GradeConfigFinder } from "./grade-config.finder";
import { MultiGradeConfiguration } from "../dtos/grade-config/multi-grade-configuration.model";
import { CreateMultiGradeConfigurationDto } from "../request/multi/create-multi-grade-configuration";
import { UpdateMultiGradeConfigurationDto } from "../request/multi/update-multi-grade-configuration";
import { DeleteMultiGradeConfigurationDto } from "../request/multi/delete-multi-grade-configuration";

export class MultiGradeConfigHandler {
    public static initializeHandlers(gradeDataProvider: GradeDataProvider, updateMessenger: UpdateMessenger): void {
        ipcMain.on('createMultiGradeConfiguration', async (c, arg: CreateMultiGradeConfigurationDto) => {
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

            const gradePeriod = studentCollection.gradePeriods.find(g => g.id === arg.gradePeriodId);
            if (gradePeriod) {
                if (arg.multiParentId) {
                    const parent = GradeConfigFinder.findMulti(studentCollection, arg.multiParentId);
                    if (parent) {
                        parent.result.multiGradeConfigurations.push(multi);
                    }
                } else {
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

        ipcMain.on('deleteMultiGradeConfiguration', async (c, arg: DeleteMultiGradeConfigurationDto) => {
            const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
            if (studentCollection) {
                const multi = GradeConfigFinder.findMulti(studentCollection, arg.multiId);
                if(multi) {
                    if(multi.parent) {
                        multi.parent.multiGradeConfigurations = multi.parent.multiGradeConfigurations.filter(m => m.id !== arg.multiId);
                    } else {
                        multi.gradePeriod.multiGradeConfigurations = multi.gradePeriod.multiGradeConfigurations.filter(m => m.id !== arg.multiId);
                    }
                }
                
                await gradeDataProvider.createOrUpdate(studentCollection);
                await updateMessenger.SendUpdatedStudentCollection(studentCollection);
            }
        });
    }
}