import { CreateSingleGradeConfigurationDto } from '../request/single/create-single-grade-configuration';
import { GradeDataProvider } from '../data-layer/grade-data-provider';
import { UpdateMessenger } from '../data-layer/update-messenger';
import { generateGuid } from '../helpers/helper-methods';
import { ipcMain } from 'electron';
import { UpdateSingleGradeConfigurationDto } from '../request/single/update-single-grade-configuration';
import { DeleteSingleGradeConfigurationDto } from '../request/single/delete-single-grade-configuration';
import { MoveSingleGradeConfigurationDto } from '../request/single/move-single-grade-configuration';
import { GradeConfigFinder } from './grade-config.finder';
import { SingleGradeConfiguration } from '../dtos/grade-config/single-grade-configuration.model';
import { moveItemAndRegenerateOrderId } from '../helpers/sorter-methods';
import { TargetMoveSingleGradeConfigurationDto } from '../request/single/target-move-single-grade-configuration';

export class SingleGradeConfigHandler {
  public static initializeHandlers(gradeDataProvider: GradeDataProvider, updateMessenger: UpdateMessenger): void {
    ipcMain.on('createSingleGradeConfiguration', async (c, arg: CreateSingleGradeConfigurationDto) => {
      const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
      if (!studentCollection) {
        return;
      }

      const single: SingleGradeConfiguration = {
        id: generateGuid(),
        name: arg.name,
        totalScore: arg.totalScore,
        weight: arg.weight,
        orderId: arg.orderId,
      };

      const gradePeriod = studentCollection.gradePeriods.find(g => g.id === arg.gradePeriodId);
      if (gradePeriod) {
        if (arg.multiParentId) {
          const parent = GradeConfigFinder.findMulti(studentCollection, arg.multiParentId);
          if (parent) {
            parent.result.singleGradeConfigurations.push(single);
          }
        } else {
          gradePeriod.singleGradeConfigurations.push(single);
        }
      }

      await gradeDataProvider.createOrUpdate(studentCollection);
      await updateMessenger.SendUpdatedStudentCollection(studentCollection);
    });

    ipcMain.on('moveSingleGradeConfiguration', async (c, arg: MoveSingleGradeConfigurationDto) => {
      const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
      if (studentCollection) {
        const single = GradeConfigFinder.findSingle(studentCollection, arg.singleId);
        if (single) {
          if (single.parent) {
            const index = single.parent.singleGradeConfigurations.findIndex(i => i.id === arg.singleId);
            if (index >= 0) {
              single.parent.singleGradeConfigurations = moveItemAndRegenerateOrderId(single.parent.singleGradeConfigurations, index, arg.left);
            }
          } else {
            const index = single.gradePeriod.singleGradeConfigurations.findIndex(i => i.id === arg.singleId);
            if (index >= 0) {
              single.gradePeriod.singleGradeConfigurations = moveItemAndRegenerateOrderId(single.gradePeriod.singleGradeConfigurations, index, arg.left);
            }
          }
        }

        await gradeDataProvider.createOrUpdate(studentCollection);
        await updateMessenger.SendUpdatedStudentCollection(studentCollection);
      }
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

    ipcMain.on('deleteSingleGradeConfiguration', async (c, arg: DeleteSingleGradeConfigurationDto) => {
      const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
      if (studentCollection) {
        const single = GradeConfigFinder.findSingle(studentCollection, arg.singleId);
        if (single) {
          if (single.parent) {
            single.parent.singleGradeConfigurations = single.parent.singleGradeConfigurations.filter(s => s.id !== arg.singleId);
          } else {
            single.gradePeriod.singleGradeConfigurations = single.gradePeriod.singleGradeConfigurations.filter(s => s.id !== arg.singleId);
          }
        }

        await gradeDataProvider.createOrUpdate(studentCollection);
        await updateMessenger.SendUpdatedStudentCollection(studentCollection);
      }
    });

    ipcMain.on('targetMoveSingleGradeConfiguration', async (c, arg: TargetMoveSingleGradeConfigurationDto) => {
      const studentCollection = await gradeDataProvider.getDeepCopy(arg.studentCollectionId);
      if (studentCollection) {
        const single = GradeConfigFinder.findSingle(studentCollection, arg.id);
        if (single) {
          if (single.parent) {
          } else {
          }
        }

        await gradeDataProvider.createOrUpdate(studentCollection);
        await updateMessenger.SendUpdatedStudentCollection(studentCollection);
      }
    });
  }
}
