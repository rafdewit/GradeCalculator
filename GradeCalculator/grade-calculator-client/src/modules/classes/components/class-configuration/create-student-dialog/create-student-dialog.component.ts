import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CreateStudentDialogData } from './create-student-dialog.data';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';

@Component({
  selector: 'app-create-student-dialog',
  templateUrl: './create-student-dialog.component.html',
  styleUrl: './create-student-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateStudentDialogComponent {
  valueFormControl: FormControl<string>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DefaultCrudDialogData<CreateStudentDialogData>, private dialogRef: MatDialogRef<CreateStudentDialogComponent>, private formBuilder: NonNullableFormBuilder) {
    this.valueFormControl = this.formBuilder.control(data.object.name, [Validators.required]);
  }

  public acceptChanges(): void {
    this.dialogRef.close(this.valueFormControl.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public deleteItem(): void {
    this.data.deleteFlag = true;
    this.dialogRef.close();
  }
}
