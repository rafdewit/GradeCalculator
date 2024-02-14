import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';
import { MultiGradeConfiguration } from '../dtos/grade-config/multi-grade-configuration.model';
import { MultiGradeConfigDialogData } from 'src/modules/common-module/dialogs/multi-grade-config-dialog/multi-grade-config-dialog.data';
import { MultiGradeConfigurationData } from '../api/request/grade-configuration/multi/multi-grade-configuration.data';
import { MultiGradeConfigDialogComponent } from 'src/modules/common-module/dialogs/multi-grade-config-dialog/multi-grade-config-dialog.component';
import { MultiGradeConfigurationWebClient } from '../api/multi-grade-configuration-web-client';
import { DialogService } from './dialog.service';
import { CreateMultiGradeConfigurationDto } from '../api/request/grade-configuration/multi/create-multi-grade-configuration';
import { UpdateMultiGradeConfigurationDto } from '../api/request/grade-configuration/multi/update-multi-grade-configuration';
import { DeleteMultiGradeConfigurationDto } from '../api/request/grade-configuration/multi/delete-multi-grade-configuration';

@Injectable({
    providedIn: 'root'
})
export class MultiGradeConfigDialogService {

    constructor(private matDialog: MatDialog, private dialogService: DialogService,
        private multiGradeConfigurationWebClient: MultiGradeConfigurationWebClient) { }

    public async createMultiGrade(studentCollectionId: string, gradePeriodId: string, multiParentId: string): Promise<void> {
        const dialogResult = await this.openMultiGradeConfigDialog("Create Multi Grade");
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

        await firstValueFrom(this.multiGradeConfigurationWebClient.createMultiGradeConfiguration(request));
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

        await firstValueFrom(this.multiGradeConfigurationWebClient.updateMultiGradeConfiguration(request));
    }

    public async deleteMultiGrade(studentCollectionId: string, multi: MultiGradeConfiguration): Promise<void> {
        const dialogResult = await this.dialogService.openConfirmationDialogDialog(`Delete Multi Grade: ${multi.name}?`, `Are you sure you want to multi grade: ${multi.name}`);
        if (dialogResult) {
            const request: DeleteMultiGradeConfigurationDto = {
                studentCollectionId: studentCollectionId,
                multiId: multi.id,
            };

            firstValueFrom(this.multiGradeConfigurationWebClient.deleteMultiGradeConfiguration(request));
        }
    }

    private async openMultiGradeConfigDialog(title: string, multi: MultiGradeConfiguration | null = null): Promise<MultiGradeConfigurationData | null> {
        const data: DefaultCrudDialogData<MultiGradeConfigDialogData> = {
            object: {
                multi: multi
            },
            deleteFlag: false,
            title: title,
            cancelFlag: false,
            isUpdate: multi !== null,
        }

        const input = new MatDialogConfig<DefaultCrudDialogData<MultiGradeConfigDialogData>>();
        input.data = data;

        const dialogRef = this.matDialog.open<MultiGradeConfigDialogComponent, DefaultCrudDialogData<MultiGradeConfigDialogData>, MultiGradeConfigurationData>(MultiGradeConfigDialogComponent, input);
        const dialogResult = await firstValueFrom(dialogRef.afterClosed()) ?? null;
        return dialogResult;
    }
}
