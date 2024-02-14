import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, firstValueFrom, map, switchMap } from 'rxjs';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';
import { GradePeriod } from 'src/services/dtos/grade-config/grade-period.model';
import { StudentCollection } from 'src/services/dtos/student-collection.model';
import { Student } from 'src/services/dtos/students/student.model';
import { CreatePeriodDialogData } from './create-period-dialog/create-period-dialog.data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatePeriodDialogComponent } from './create-period-dialog/create-period-dialog.component';
import { DialogService } from 'src/services/angular/dialog/dialog.service';
import { GradeStore } from 'src/services/stores/grade.store';
import { CreateStudentDialogData } from './create-student-dialog/create-student-dialog.data';
import { CreateStudentDialogComponent } from './create-student-dialog/create-student-dialog.component';
import { StudentWebClient } from 'src/services/communication/api/web-api-clients/student-web-client';
import { IGradePeriodClient } from 'src/services/communication/api/base/grade-period-client.interface';

@Component({
  selector: 'app-class-configuration',
  templateUrl: './class-configuration.component.html',
  styleUrl: './class-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassConfigurationComponent { 

  // private class$: Observable<StudentCollection>;
  public info$: Observable<ClassConfigurationInfo>;

  constructor(private activatedRoute: ActivatedRoute, private matDialog: MatDialog, private gradePeriodWebClient: IGradePeriodClient,
    private dialogService: DialogService, private gradeStore: GradeStore, private studentWebClient: StudentWebClient) {
    const class$ = this.activatedRoute.params.pipe(map(p => p['classId'])).pipe(switchMap(i => this.gradeStore.getClass(i)));
    
    this.info$ = class$.pipe(map(c => {
      const result: ClassConfigurationInfo = {
        class: c,
        navigationName: `Configuration(${c?.name})`
      };
      return result;
    }));
  }

  public async openCreatePeriodDialog(studentCollection: StudentCollection): Promise<void> {
    const result = await this.openPeriodDialog("Create Grade Period");
    if (result) {
      await firstValueFrom(this.gradePeriodWebClient.createGradePeriod({ studentCollectionId: studentCollection.id, name: result }));
    }
  }

  public periodClicked(gradePeriod: GradePeriod): void {
    
  }

  public async copyPeriod(gradePeriod: GradePeriod, studentCollection: StudentCollection): Promise<void> {
    const result = await this.openPeriodDialog(`Copy Grade Period: ${gradePeriod.name}`, gradePeriod);
    if (result) {
      await firstValueFrom(this.gradePeriodWebClient.copyGradePeriod({ studentCollectionId: studentCollection.id, name: result, gradePeriodId: gradePeriod.id }));
    }
  }

  public async updatePeriod(gradePeriod: GradePeriod, studentCollection: StudentCollection): Promise<void> {
    const result = await this.openPeriodDialog(`Update Grade Period: ${gradePeriod.name}`, gradePeriod);
    if (result) {
      await firstValueFrom(this.gradePeriodWebClient.updateGradePeriod({ studentCollectionId: studentCollection.id, name: result, gradePeriodId: gradePeriod.id }));
    }
  }

  public async deletePeriod(gradePeriod: GradePeriod, studentCollection: StudentCollection): Promise<void> {
    const dialogResult = await this.dialogService.openConfirmationDialogDialog(`Delete period: ${gradePeriod.name}?`, `Are you sure you want to delete period: ${gradePeriod.name}`);
    if(dialogResult) {
      await firstValueFrom(this.gradePeriodWebClient.deleteGradePeriod({ studentCollectionId: studentCollection.id, gradePeriodId: gradePeriod.id }));
    }
  }

  public async createStudent(studentCollection: StudentCollection): Promise<void> {
    const result = await this.openStudentDialog("Create Student");
    if (result) {
      await firstValueFrom(this.studentWebClient.createStudent({ studentCollectionId: studentCollection.id, name: result }));
    }
  }

  public async updateStudent(student: Student, studentCollection: StudentCollection): Promise<void> {
    const result = await this.openStudentDialog(`Update Student: ${student.name}`, student);
    if (result) {
      await firstValueFrom(this.studentWebClient.updateStudent({ studentCollectionId: studentCollection.id, name: result, studentId: student.id }));
    }
  }

  public async deleteStudent(student: Student, studentCollection: StudentCollection): Promise<void> {
    const dialogResult = await this.dialogService.openConfirmationDialogDialog(`Delete student: ${student.name}?`, `Are you sure you want to delete student: ${student.name}`);
    if(dialogResult) {
      await firstValueFrom(this.studentWebClient.deleteStudent({ studentCollectionId: studentCollection.id, studentId: student.id }));
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

  public async openPeriodDialog(title: string, period: GradePeriod | null = null): Promise<string | null> {
    const data: DefaultCrudDialogData<CreatePeriodDialogData> = {
      object: {
        name: period?.name ?? 'GradePeriodName'
      },
      deleteFlag: false,
      title: title,
      cancelFlag: false,
      isUpdate: period !== null,
    }

    const input = new MatDialogConfig<DefaultCrudDialogData<CreatePeriodDialogData>>();
    input.data = data;

    const dialogRef = this.matDialog.open<CreatePeriodDialogComponent, DefaultCrudDialogData<CreatePeriodDialogData>, string>(CreatePeriodDialogComponent, input);
    return await firstValueFrom(dialogRef.afterClosed()) ?? null;
  }
}

export interface ClassConfigurationInfo {
  class: StudentCollection | null;
  navigationName: string;
}