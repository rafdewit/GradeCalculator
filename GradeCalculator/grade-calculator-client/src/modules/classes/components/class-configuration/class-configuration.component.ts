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
import { StudentCollectionWebClient } from 'src/services/api/student-collection-web-client.service';
import { GradeOPeriodWebClient as GradePeriodWebClient } from 'src/services/api/grade-period-web-client.service';
import { DialogService } from 'src/services/dialog/dialog.service';

@Component({
  selector: 'app-class-configuration',
  templateUrl: './class-configuration.component.html',
  styleUrl: './class-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassConfigurationComponent { 

  public class$: Observable<StudentCollection>;
  public info$: Observable<ClassConfigurationInfo>;

  constructor(private activatedRoute: ActivatedRoute, private matDialog: MatDialog, private gradePeriodWebClient: GradePeriodWebClient,
    private dialogService: DialogService) {
    this.class$ = this.activatedRoute.data.pipe(map(d => d['class']));
    this.info$ = this.class$.pipe(map(c => {
      const result: ClassConfigurationInfo = {
        class: c,
        navigationName: `Configuration(${c.name})`
      };
      return result;
    }))
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
    const result = await this.openPeriodDialog(`Copy Grade Period: ${gradePeriod.name}`);
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
    const dialogResult = await this.dialogService.openConfirmationDialogDialog(`Delete Class: ${studentCollection.name}?`, `Are you sure you want to delete class: ${studentCollection.name}`);
    if(dialogResult) {
      await firstValueFrom(this.gradePeriodWebClient.deleteGradePeriod({ studentCollectionId: studentCollection.id, gradePeriodId: gradePeriod.id }));
    }
  }

  public openCreateStudentDialog(): void {

  }

  public deleteStudent(student: Student, studentCollection: StudentCollection): void {

  }

  public async openPeriodDialog(title: string, period: GradePeriod | null = null): Promise<string | null> {
    const data: DefaultCrudDialogData<CreatePeriodDialogData> = {
      object: {
        name: period?.name ?? 'GradeName'
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
  class: StudentCollection;
  navigationName: string;
}