import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GradePeriod } from "app/dtos/grade-config/grade-period.model";
import { StudentCollection } from "app/dtos/student-collection.model";
import { Student } from "app/dtos/students/student.model";
import { firstValueFrom } from "rxjs";
import { DefaultCrudDialogData } from "src/modules/common-module/dialogs/default-dialog-crud.data";
import { CreatePeriodDialogResultData } from "./create-period-dialog/create-period-dialog-result.data";
import { CreatePeriodDialogComponent } from "./create-period-dialog/create-period-dialog.component";
import { CreatePeriodDialogData } from "./create-period-dialog/create-period-dialog.data";
import { CreateStudentDialogComponent } from "./create-student-dialog/create-student-dialog.component";
import { CreateStudentDialogData } from "./create-student-dialog/create-student-dialog.data";
import { DialogService } from "src/services/angular/dialog/dialog.service";
import { IStudentClient } from "src/services/communication/api/base/student-client";

@Injectable({ providedIn: 'root' })
export class StudentConfigurationService {
    constructor(private studentClient: IStudentClient, private dialogService: DialogService, private matDialog: MatDialog) {

    }

    public async createStudent(studentCollection: StudentCollection): Promise<void> {
        const result = await this.openStudentDialog("Create Student");
        if (result) {
            await firstValueFrom(this.studentClient.createStudent({ studentCollectionId: studentCollection.id, name: result }));
        }
    }

    public async updateStudent(student: Student, studentCollection: StudentCollection): Promise<void> {
        const result = await this.openStudentDialog(`Update Student: ${student.name}`, student);
        if (result) {
            await firstValueFrom(this.studentClient.updateStudent({ studentCollectionId: studentCollection.id, name: result, studentId: student.id }));
        }
    }

    public async deleteStudent(student: Student, studentCollection: StudentCollection): Promise<void> {
        const dialogResult = await this.dialogService.openConfirmationDialogDialog(`Delete student: ${student.name}?`, `Are you sure you want to delete student: ${student.name}`);
        if (dialogResult) {
            await firstValueFrom(this.studentClient.deleteStudent({ studentCollectionId: studentCollection.id, studentId: student.id }));
        }
    }

    public async openStudentDialog(title: string, student: Student | null = null): Promise<string | null> {
        const data: DefaultCrudDialogData<CreateStudentDialogData> = {
            object: {
                name: student?.name ?? 'StudentName'
            },
            deleteFlag: false,
            title: title,
            cancelFlag: false,
            isUpdate: student !== null,
        }

        const input = new MatDialogConfig<DefaultCrudDialogData<CreateStudentDialogData>>();
        input.data = data;

        const dialogRef = this.matDialog.open<CreateStudentDialogComponent, DefaultCrudDialogData<CreateStudentDialogData>, string>(CreateStudentDialogComponent, input);
        return await firstValueFrom(dialogRef.afterClosed()) ?? null;
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