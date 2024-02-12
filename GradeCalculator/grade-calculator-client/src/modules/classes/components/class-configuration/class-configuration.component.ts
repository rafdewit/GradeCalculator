import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, firstValueFrom, map } from 'rxjs';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';
import { GradePeriod } from 'src/services/dtos/grade-config/grade-period.model';
import { StudentCollection } from 'src/services/dtos/student-collection.model';
import { Student } from 'src/services/dtos/students/student.model';
import { CreatePeriodDialogData } from './create-period-dialog/create-period-dialog.data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatePeriodDialogComponent } from './create-period-dialog/create-period-dialog.component';
import { GradeWebClient } from 'src/services/api/grade-web-client.service';

@Component({
  selector: 'app-class-configuration',
  templateUrl: './class-configuration.component.html',
  styleUrl: './class-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassConfigurationComponent { 

  public class$: Observable<StudentCollection>;
  public info$: Observable<ClassConfigurationInfo>;

  constructor(private activatedRoute: ActivatedRoute, private matDialog: MatDialog, private gradeWebClient: GradeWebClient) {
    this.class$ = this.activatedRoute.data.pipe(map(d => d['class']));
    this.info$ = this.class$.pipe(map(c => {
      const result: ClassConfigurationInfo = {
        class: c,
        navigationName: `Configuration(${c.name})`
      };
      return result;
    }))
  }

  public async openCreatePeriodDialog(): Promise<void> {
    const result = await this.openPeriodDialog();
    if (result) {
      await firstValueFrom(this.gradeWebClient.createClass({ className: result }));
    }
  }

  public periodClicked(gradePeriod: GradePeriod): void {

  }

  public copyPeriod(gradePeriod: GradePeriod, studentCollection: StudentCollection): void {

  }

  public deletePeriod(gradePeriod: GradePeriod, studentCollection: StudentCollection): void {

  }

  public openCreateStudentDialog(): void {

  }

  public deleteStudent(student: Student, studentCollection: StudentCollection): void {

  }

  public async openPeriodDialog(period: GradePeriod | null = null): Promise<string | null> {
    const isEdit = period !== null;
    const data: DefaultCrudDialogData<CreatePeriodDialogData> = {
      object: {
        name: period?.name ?? 'GradeName'
      },
      deleteFlag: false,
      title: isEdit ? 'Update GradePeriod' : 'Create GradePeriod',
      cancelFlag: false,
      isUpdate: isEdit,
    }

    const input = new MatDialogConfig<DefaultCrudDialogData<CreatePeriodDialogData>>();
    input.data = data;

    const dialogRef = this.matDialog.open<CreatePeriodDialogComponent, DefaultCrudDialogData<CreatePeriodDialogData>, string>(CreatePeriodDialogComponent, input);
    return await firstValueFrom(dialogRef.afterClosed()) ?? null;
  }
}

export interface ClassConfigurationInfo {
  class: StudentCollection;
  navigationName: string;
}