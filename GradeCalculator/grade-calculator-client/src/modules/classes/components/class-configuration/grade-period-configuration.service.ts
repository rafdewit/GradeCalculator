import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GradePeriod } from "app/dtos/grade-config/grade-period.model";
import { StudentCollection } from "app/dtos/student-collection.model";
import { firstValueFrom } from "rxjs";
import { DefaultCrudDialogData } from "src/modules/common-module/dialogs/default-dialog-crud.data";
import { CreatePeriodDialogResultData } from "./create-period-dialog/create-period-dialog-result.data";
import { CreatePeriodDialogComponent } from "./create-period-dialog/create-period-dialog.component";
import { CreatePeriodDialogData } from "./create-period-dialog/create-period-dialog.data";
import { IGradePeriodClient } from "src/services/communication/api/base/grade-period-client.interface";
import { DialogService } from "src/services/angular/dialog/dialog.service";

@Injectable({ providedIn: 'root' })
export class GradePeriodConfigurationService {
    constructor(private gradePeriodClient: IGradePeriodClient, private dialogService: DialogService, private matDialog: MatDialog) {

    }

    public async openCreatePeriodDialog(studentCollection: StudentCollection): Promise<void> {
        const result = await this.openPeriodDialog("Create Grade Period");
        if (result) {
            await firstValueFrom(this.gradePeriodClient.createGradePeriod({ studentCollectionId: studentCollection.id, name: result.name, weight: result.weight }));
        }
    }

    public async copyPeriod(gradePeriod: GradePeriod, studentCollection: StudentCollection): Promise<void> {
        const result = await this.openPeriodDialog(`Copy Grade Period: ${gradePeriod.name}`, gradePeriod);
        if (result) {
            await firstValueFrom(this.gradePeriodClient.copyGradePeriod({ studentCollectionId: studentCollection.id, name: result.name, weight: result.weight, gradePeriodId: gradePeriod.id }));
        }
    }

    public async updatePeriod(gradePeriod: GradePeriod, studentCollection: StudentCollection): Promise<void> {
        const result = await this.openPeriodDialog(`Update Grade Period: ${gradePeriod.name}`, gradePeriod);
        if (result) {
            await firstValueFrom(this.gradePeriodClient.updateGradePeriod({ studentCollectionId: studentCollection.id, name: result.name, weight: result.weight, gradePeriodId: gradePeriod.id }));
        }
    }

    public async deletePeriod(gradePeriod: GradePeriod, studentCollection: StudentCollection): Promise<void> {
        const dialogResult = await this.dialogService.openConfirmationDialogDialog(`Delete period: ${gradePeriod.name}?`, `Are you sure you want to delete period: ${gradePeriod.name}`);
        if (dialogResult) {
            await firstValueFrom(this.gradePeriodClient.deleteGradePeriod({ studentCollectionId: studentCollection.id, gradePeriodId: gradePeriod.id }));
        }
    }

    public async openPeriodDialog(title: string, period: GradePeriod | null = null): Promise<CreatePeriodDialogResultData | null> {
        const data: DefaultCrudDialogData<CreatePeriodDialogData> = {
            object: {
                name: period?.name ?? 'GradePeriodName',
                weight: period?.weight ?? 50
            },
            deleteFlag: false,
            title: title,
            cancelFlag: false,
            isUpdate: period !== null,
        }

        const input = new MatDialogConfig<DefaultCrudDialogData<CreatePeriodDialogData>>();
        input.data = data;

        const dialogRef = this.matDialog.open<CreatePeriodDialogComponent, DefaultCrudDialogData<CreatePeriodDialogData>, CreatePeriodDialogResultData>(CreatePeriodDialogComponent, input);
        return await firstValueFrom(dialogRef.afterClosed()) ?? null;
    }
}