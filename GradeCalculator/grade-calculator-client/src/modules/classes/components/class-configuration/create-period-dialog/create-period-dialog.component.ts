import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CreatePeriodDialogData } from './create-period-dialog.data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';

@Component({
  selector: 'app-create-period-dialog',
  templateUrl: './create-period-dialog.component.html',
  styleUrl: './create-period-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePeriodDialogComponent {

  public valueFormGroup: FormGroup<{
    name: FormControl<string>,
    weight: FormControl<number>
  }>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DefaultCrudDialogData<CreatePeriodDialogData>, private dialogRef: MatDialogRef<CreatePeriodDialogComponent>, private formBuilder: NonNullableFormBuilder) { 
    this.valueFormGroup = this.formBuilder.group({
      name: this.formBuilder.control(data.object.name, [Validators.required]),
      weight: this.formBuilder.control(data.object.weight, [Validators.required])
    });
  }

  public acceptChanges(): void {
    this.dialogRef.close(this.valueFormGroup.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public deleteItem(): void {
    this.data.deleteFlag = true;
    this.dialogRef.close();
  }
}
