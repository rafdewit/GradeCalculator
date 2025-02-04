import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';
import { MultiGradeConfiguration } from '../../dtos/grade-config/multi-grade-configuration.model';
import { MultiGradeConfigDialogData } from 'src/modules/common-module/dialogs/multi-grade-config-dialog/multi-grade-config-dialog.data';
import { MultiGradeConfigurationData } from '../../communication/api/request/multi/multi-grade-configuration.data';
import { MultiGradeConfigDialogComponent } from 'src/modules/common-module/dialogs/multi-grade-config-dialog/multi-grade-config-dialog.component';
import { DialogService } from './dialog.service';
import { CreateMultiGradeConfigurationDto } from '../../communication/api/request/multi/create-multi-grade-configuration';
import { UpdateMultiGradeConfigurationDto } from '../../communication/api/request/multi/update-multi-grade-configuration';
import { DeleteMultiGradeConfigurationDto } from '../../communication/api/request/multi/delete-multi-grade-configuration';
import { IMultiGradeConfigurationClient } from 'src/services/communication/api/base/multi-grade-configuration-client';
import { MoveMultiGradeConfigurationDto } from 'src/services/communication/api/request/multi/move-multi-grade-configuration';
import { SelectMultiTargetDialogData } from 'src/modules/classes/components/class-score-table/SelectMultiTargetDialog/select-multi-target-dialog.data';
import { SelectMultiTargetDialogComponent } from 'src/modules/classes/components/class-score-table/SelectMultiTargetDialog/select-multi-target-dialog.component';
import { MultiCollectionTarget, MultiCollectionTargetStore } from 'src/services/stores/multi-collection-target.store';
import { StudentCollection } from 'src/services/dtos/student-collection.model';
import { TargetMoveMultiGradeConfigurationDto } from 'src/services/communication/api/request/multi/target-move-multi-grade-configuration';

@Injectable({
  providedIn: 'root',
})
export class MultiGradeConfigDialogService {
  constructor(private matDialog: MatDialog, private dialogService: DialogService, private multiGradeConfigurationClient: IMultiGradeConfigurationClient, private multiCollectionTargetStore: MultiCollectionTargetStore) {}

  public async moveMulti(studentCollectionId: string, multi: MultiGradeConfiguration, left: boolean): Promise<void> {
    const request: MoveMultiGradeConfigurationDto = {
      studentCollectionId: studentCollectionId,
      multiId: multi.id,
      left: left,
    };

    await firstValueFrom(this.multiGradeConfigurationClient.moveMultiGradeConfiguration(request));
  }

  public async createMultiGrade(studentCollectionId: string, gradePeriodId: string, multiParentId: string | null = null): Promise<void> {
    const dialogResult = await this.openMultiGradeConfigDialog('Create Multi Grade');
    if (!dialogResult) {
      return;
    }

    const request: CreateMultiGradeConfigurationDto = {
      studentCollectionId: studentCollectionId,
      gradePeriodId: gradePeriodId,
      multiParentId: multiParentId,

      name: dialogResult.name,
      weight: dialogResult.weight,
    };

    await firstValueFrom(this.multiGradeConfigurationClient.createMultiGradeConfiguration(request));
  }

  public async updateMultiGrade(studentCollectionId: string, multi: MultiGradeConfiguration): Promise<void> {
    const dialogResult = await this.openMultiGradeConfigDialog(`Update Multi Grade: ${multi.name}`, multi);
    if (!dialogResult) {
      return;
    }

    const request: UpdateMultiGradeConfigurationDto = {
      studentCollectionId: studentCollectionId,
      multiId: multi.id,

      name: dialogResult.name,
      weight: dialogResult.weight,
    };

    await firstValueFrom(this.multiGradeConfigurationClient.updateMultiGradeConfiguration(request));
  }

  public async deleteMultiGrade(studentCollectionId: string, multi: MultiGradeConfiguration): Promise<void> {
    const dialogResult = await this.dialogService.openConfirmationDialogDialog(`Delete Multi Grade: ${multi.name}?`, `Are you sure you want to multi grade: ${multi.name}`);
    if (dialogResult) {
      const request: DeleteMultiGradeConfigurationDto = {
        studentCollectionId: studentCollectionId,
        multiId: multi.id,
      };

      firstValueFrom(this.multiGradeConfigurationClient.deleteMultiGradeConfiguration(request));
    }
  }

  private async openMultiGradeConfigDialog(title: string, multi: MultiGradeConfiguration | null = null): Promise<MultiGradeConfigurationData | null> {
    const data: DefaultCrudDialogData<MultiGradeConfigDialogData> = {
      object: {
        multi: multi,
      },
      deleteFlag: false,
      title: title,
      cancelFlag: false,
      isUpdate: multi !== null,
    };

    const input = new MatDialogConfig<DefaultCrudDialogData<MultiGradeConfigDialogData>>();
    input.data = data;

    const dialogRef = this.matDialog.open<MultiGradeConfigDialogComponent, DefaultCrudDialogData<MultiGradeConfigDialogData>, MultiGradeConfigurationData>(MultiGradeConfigDialogComponent, input);
    const dialogResult = (await firstValueFrom(dialogRef.afterClosed())) ?? null;
    return dialogResult;
  }

  public async targetMoveMulti(studentCollection: StudentCollection, multi: MultiGradeConfiguration): Promise<void> {
    const target = await this.dialogService.openGradeTargetSelectionDialog('Select a new target for this grade collection', studentCollection, multi.id);
    if (target) {
      const request: TargetMoveMultiGradeConfigurationDto = {
        studentCollectionId: studentCollection.id,
        id: multi.id,
        targetType: target.type,
        targetId: target.id,
      };
      await firstValueFrom(this.multiGradeConfigurationClient.targetMoveMultiGradeConfiguration(request));
    }
  }
}
