import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCollection } from 'src/services/dtos/student-collection.model';
import { GradeStore } from 'src/services/stores/grade.store';
import { CreateClassDialogData } from './create-class-dialog/create-class-dialog.data';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';
import { CreateClassDialogComponent } from './create-class-dialog/create-class-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrl: './classes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesPageComponent {
  constructor(public gradeStore: GradeStore, private router: Router, private activatedRoute: ActivatedRoute, private matDialog: MatDialog) {
    
  }

  public updateClass(studentCollection: StudentCollection): void {
    //
  }

  public downloadClass(studentCollection: StudentCollection): void {
    //
  }

  public copyClass(studentCollection: StudentCollection): void {
    //
  }

  public deleteClass(studentCollection: StudentCollection): void {
    //
  }

  public classClicked(studentCollection: StudentCollection): void {
    this.router.navigate([studentCollection.id, "score-overview"], { relativeTo: this.activatedRoute })
  }

  public editClicked(studentCollection: StudentCollection): void {
    this.router.navigate([studentCollection.id], { relativeTo: this.activatedRoute });
  }

  public async openClassDialog(studentCollection: StudentCollection | null = null): Promise<void> {
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

    const dialogRef = this.matDialog.open<CreateClassDialogComponent, DefaultCrudDialogData<CreateClassDialogData>, DefaultCrudDialogData<CreateClassDialogData>>(CreateClassDialogComponent, input);
    const result = await firstValueFrom(dialogRef.afterClosed());
  }
}
