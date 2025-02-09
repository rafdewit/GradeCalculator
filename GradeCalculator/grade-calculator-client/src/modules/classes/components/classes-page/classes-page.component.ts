import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeStore } from 'src/services/stores/grade.store';
import { CreateClassDialogData } from './create-class-dialog/create-class-dialog.data';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';
import { CreateClassDialogComponent } from './create-class-dialog/create-class-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom, map } from 'rxjs';
import { saveAs } from 'file-saver';
import { DialogService } from 'src/services/angular/dialog/dialog.service';
import { IStudentCollectionClient } from 'src/services/communication/api/base/student-collection-client';
import { StudentCollection } from 'app/dtos/student-collection.model';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrl: './classes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesPageComponent {
  @ViewChild('uploadclass') uploadClassInput: ElementRef;
  @ViewChild('uploadclasses') uploadClassesInput: ElementRef;

  constructor(
    public gradeStore: GradeStore,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    public studentCollectionClient: IStudentCollectionClient,
    private dialogService: DialogService,
  ) {
    const directories$ = this.activatedRoute.paramMap.pipe(map(p => p.get('directories')));
    //TODO define which directories should be visible on this page on top of classes
  }

  public async updateClass(studentCollection: StudentCollection): Promise<void> {
    const result = await this.openClassDialog();
    if (result) {
      await firstValueFrom(this.studentCollectionClient.updateClass({ id: studentCollection?.id, className: result }));
    }
  }

  public async createClass(): Promise<void> {
    const result = await this.openClassDialog();
    if (result) {
      await firstValueFrom(this.studentCollectionClient.createClass({ className: result, directories: [] }));
    }
  }

  public downloadClass(studentCollection: StudentCollection): void {
    return saveAs(new Blob([JSON.stringify(studentCollection, null, 2)], { type: 'JSON' }), `${studentCollection.name}_backup.json`);
  }

  public downloadClasses(studentCollections: StudentCollection[]): void {
    return saveAs(new Blob([JSON.stringify(studentCollections, null, 2)], { type: 'JSON' }), `all_classes_backup.json`);
  }

  public triggerUploadClasses() {
    this.uploadClassesInput.nativeElement.click();
  }

  public uploadClasses(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const fileReader = new FileReader();
    fileReader.onload = e => {
      const result = JSON.parse(fileReader.result as string) as StudentCollection[];
      if (result) {
        console.log(result);
      }
    };
    fileReader.readAsText(files[0]);
  }

  public triggerUploadClass() {
    this.uploadClassInput.nativeElement.click();
  }

  public async uploadClass(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const fileReader = new FileReader();
    fileReader.onload = e => {
      const result = JSON.parse(fileReader.result as string) as StudentCollection;
      if (result) {
        console.log(result);
      }
    };
    fileReader.readAsText(files[0]);
  }

  public async copyClass(studentCollection: StudentCollection): Promise<void> {
    const result = await this.openClassDialog();
    if (result) {
      await firstValueFrom(this.studentCollectionClient.copyClass({ id: studentCollection?.id, className: result }));
    }
  }

  public async deleteClass(studentCollection: StudentCollection): Promise<void> {
    const dialogResult = await this.dialogService.openConfirmationDialogDialog(`Delete Class: ${studentCollection.name}?`, `Are you sure you want to delete class: ${studentCollection.name}`);
    if (dialogResult) {
      await firstValueFrom(this.studentCollectionClient.deleteClass(studentCollection.id));
    }
  }

  public classClicked(studentCollection: StudentCollection): void {
    this.router.navigate([studentCollection.id, 'score-overview'], { relativeTo: this.activatedRoute });
  }

  public tableClicked(studentCollection: StudentCollection): void {
    this.router.navigate([studentCollection.id, 'score-table'], { relativeTo: this.activatedRoute });
  }

  public editClicked(studentCollection: StudentCollection): void {
    this.router.navigate([studentCollection.id], { relativeTo: this.activatedRoute });
  }

  public async openClassDialog(studentCollection: StudentCollection | null = null): Promise<string | null> {
    const isEdit = studentCollection !== null;
    const data: DefaultCrudDialogData<CreateClassDialogData> = {
      object: {
        name: studentCollection?.name ?? 'ClassName',
      },
      deleteFlag: false,
      title: isEdit ? 'Update Class' : 'Create Class',
      cancelFlag: false,
      isUpdate: isEdit,
    };

    const input = new MatDialogConfig<DefaultCrudDialogData<CreateClassDialogData>>();
    input.data = data;

    const dialogRef = this.matDialog.open<CreateClassDialogComponent, DefaultCrudDialogData<CreateClassDialogData>, string>(CreateClassDialogComponent, input);
    return (await firstValueFrom(dialogRef.afterClosed())) ?? null;
  }
}
