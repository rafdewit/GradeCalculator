import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CreatePeriodDialogData } from './create-period-dialog.data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';

@Component({
  selector: 'app-create-period-dialog',
  templateUrl: './create-period-dialog.component.html',
  styleUrl: './create-period-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePeriodDialogComponent {

  valueFormControl: FormControl<string>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DefaultCrudDialogData<CreatePeriodDialogData>, private dialogRef: MatDialogRef<CreatePeriodDialogComponent>, private formBuilder: NonNullableFormBuilder) { 
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
