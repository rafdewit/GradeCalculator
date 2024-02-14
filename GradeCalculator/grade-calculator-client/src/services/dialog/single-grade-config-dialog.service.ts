import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';
import { SingleGradeConfigDialogData } from 'src/modules/common-module/dialogs/single-grade-config-dialog/single-grade-config-dialog.data';
import { SingleGradeConfiguration } from '../dtos/grade-config/single-grade-configuration.model';
import { SingleGradeConfigDialogComponent } from 'src/modules/common-module/dialogs/single-grade-config-dialog/single-grade-config-dialog.component';
import { SingleGradeConfigurationData } from '../api/request/grade-configuration/single/single-grade-configuration.data';
import { MultiGradeConfiguration } from '../dtos/grade-config/multi-grade-configuration.model';
import { MultiGradeConfigDialogData } from 'src/modules/common-module/dialogs/multi-grade-config-dialog/multi-grade-config-dialog.data';
import { MultiGradeConfigurationData } from '../api/request/grade-configuration/multi/multi-grade-configuration.data';
import { MultiGradeConfigDialogComponent } from 'src/modules/common-module/dialogs/multi-grade-config-dialog/multi-grade-config-dialog.component';
import { SingleGradeConfigurationWebClient } from '../api/single-grade-configuration-web-client';
import { MultiGradeConfigurationWebClient } from '../api/multi-grade-configuration-web-client';
import { CreateSingleGradeConfigurationDto } from '../api/request/grade-configuration/single/create-single-grade-configuration';
import { UpdateSingleGradeConfigurationDto } from '../api/request/grade-configuration/single/update-single-grade-configuration';
import { DialogService } from './dialog.service';
import { DeleteSingleGradeConfigurationDto } from '../api/request/grade-configuration/single/delete-single-grade-configuration';

@Injectable({
    providedIn: 'root'
})
export class SingleGradeConfigDialogService {

    constructor(private matDialog: MatDialog, private dialogService: DialogService,
        private singleGradeConfigurationWebClient: SingleGradeConfigurationWebClient,
        private multiGradeConfigurationWebClient: MultiGradeConfigurationWebClient) { }

    public async createSingleGrade(studentCollectionId: string, gradePeriodId: string, multiParentId: string): Promise<void> {
        const dialogResult = await this.openSingleGradeConfigDialog("Create Single Grade");
        if (!dialogResult) {
            return;
        }

        const request: CreateSingleGradeConfigurationDto = {
            studentCollectionId: studentCollectionId,
            gradePeriodId: gradePeriodId,
            multiParentId: multiParentId,

            name: dialogResult.name,
            totalScore: dialogResult.totalScore,
            weight: dialogResult.weight,
        };

        await firstValueFrom(this.singleGradeConfigurationWebClient.createSingleGradeConfiguration(request));
    }

    public async updateSingleGrade(studentCollectionId: string, single: SingleGradeConfiguration): Promise<void> {
        const dialogResult = await this.openSingleGradeConfigDialog(`Update Single Grade: ${single.name}`, single);
        if (!dialogResult) {
            return;
        }

        const request: UpdateSingleGradeConfigurationDto = {
            studentCollectionId: studentCollectionId,
            singleId: single.id,

            name: dialogResult.name,
            totalScore: dialogResult.totalScore,
            weight: dialogResult.weight,
        };

        await firstValueFrom(this.singleGradeConfigurationWebClient.updateSingleGradeConfiguration(request));
    }

    public async deleteSingleGrade(studentCollectionId: string, single: SingleGradeConfiguration): Promise<void> {
        const dialogResult = await this.dialogService.openConfirmationDialogDialog(`Delete Single Grade: ${single.name}?`, `Are you sure you want to single grade: ${single.name}`);
        if (dialogResult) {
            const request: DeleteSingleGradeConfigurationDto = {
                studentCollectionId: studentCollectionId,
                singleId: single.id,
            };

            firstValueFrom(this.singleGradeConfigurationWebClient.deleteSingleGradeConfiguration(request));
        }
    }

    private async openSingleGradeConfigDialog(title: string, single: SingleGradeConfiguration | null = null): Promise<SingleGradeConfigurationData | null> {
        const data: DefaultCrudDialogData<SingleGradeConfigDialogData> = {
            object: {
                single: single
            },
            deleteFlag: false,
            title: title,
            cancelFlag: false,
            isUpdate: single !== null,
        }

        const input = new MatDialogConfig<DefaultCrudDialogData<SingleGradeConfigDialogData>>();
        input.data = data;

        const dialogRef = this.matDialog.open<SingleGradeConfigDialogComponent, DefaultCrudDialogData<SingleGradeConfigDialogData>, SingleGradeConfigurationData>(SingleGradeConfigDialogComponent, input);
        const dialogResult = await firstValueFrom(dialogRef.afterClosed()) ?? null;
        return dialogResult;
    }
}
