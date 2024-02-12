import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCollection } from 'src/services/dtos/student-collection.model';
import { GradeStore } from 'src/services/stores/grade.store';
import { CreateClassDialogData } from './create-class-dialog/create-class-dialog.data';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';
import { CreateClassDialogComponent } from './create-class-dialog/create-class-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { GradeWebClient } from 'src/services/api/grade-web-client.service';
import { saveAs } from 'file-saver';
import { DialogService } from 'src/services/dialog/dialog.service';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrl: './classes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesPageComponent {
  constructor(public gradeStore: GradeStore, private router: Router, private activatedRoute: ActivatedRoute, private matDialog: MatDialog,
    public gradeWebClient: GradeWebClient, private dialogService: DialogService) {

  }

  public async updateClass(studentCollection: StudentCollection): Promise<void> {
    const result = await this.openClassDialog();
    if (result) {
      await firstValueFrom(this.gradeWebClient.updateClass({ id: studentCollection?.id, className: result }));
    }
  }

  public async createClass(): Promise<void> {
    const result = await this.openClassDialog();
    if (result) {
      await firstValueFrom(this.gradeWebClient.createClass({ className: result }));
    }
  }

  public downloadClass(studentCollection: StudentCollection): void {
    return saveAs(
      new Blob([JSON.stringify(studentCollection, null, 2)], { type: 'JSON' }), `${studentCollection.name}_backup.json`
    );
  }

  public downloadClasses(studentCollections: StudentCollection[]): void {
    return saveAs(
      new Blob([JSON.stringify(studentCollections, null, 2)], { type: 'JSON' }), `all_classes_backup.json`
    );
  }

  public async copyClass(studentCollection: StudentCollection): Promise<void> {
    const result = await this.openClassDialog();
    if (result) {
      await firstValueFrom(this.gradeWebClient.copyClass({ id: studentCollection?.id, className: result }));
    }
  }

  public async deleteClass(studentCollection: StudentCollection): Promise<void> {
    const dialogResult = await this.dialogService.openConfirmationDialogDialog(`Delete Class: ${studentCollection.name}?`, `Are you sure you want to delete class: ${studentCollection.name}`);
    if(dialogResult) {
      await firstValueFrom(this.gradeWebClient.deleteClass(studentCollection.id));
    }
  }

  public classClicked(studentCollection: StudentCollection): void {
    this.router.navigate([studentCollection.id, "score-overview"], { relativeTo: this.activatedRoute })
  }

  public editClicked(studentCollection: StudentCollection): void {
    this.router.navigate([studentCollection.id], { relativeTo: this.activatedRoute });
  }

  public async openClassDialog(studentCollection: StudentCollection | null = null): Promise<string | null> {
    const isEdit = studentCollection !== null;
    const data: DefaultCrudDialogData<CreateClassDialogData> = {
      object: {
        name: studentCollection?.name ?? 'ClassName'
      },
      deleteFlag: false,
      title: isEdit ? 'Update Class' : 'Create Class',
      cancelFlag: false,
      isUpdate: isEdit,
    }

    const input = new MatDialogConfig<DefaultCrudDialogData<CreateClassDialogData>>();
    input.data = data;

    const dialogRef = this.matDialog.open<CreateClassDialogComponent, DefaultCrudDialogData<CreateClassDialogData>, string>(CreateClassDialogComponent, input);
    return await firstValueFrom(dialogRef.afterClosed()) ?? null;
  }
}
