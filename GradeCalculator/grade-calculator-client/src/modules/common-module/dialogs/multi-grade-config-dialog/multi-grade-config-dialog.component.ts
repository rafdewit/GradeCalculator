import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MultiGradeConfigDialogData } from './multi-grade-config-dialog.data';
import { DefaultCrudDialogData } from '../default-dialog-crud.data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MultiGradeConfiguration } from 'app/dtos/grade-config/multi-grade-configuration.model';
import { SingleGradeConfiguration } from 'app/dtos/grade-config/single-grade-configuration.model';

@Component({
  selector: 'app-multi-grade-config-dialog',
  templateUrl: './multi-grade-config-dialog.component.html',
  styleUrl: './multi-grade-config-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiGradeConfigDialogComponent {
  public multiGradeConfigFormGroup: FormGroup<{
    name: FormControl<string>;
    weight: FormControl<number>;
    singleGradeConfigurations: FormArray<FormControl<SingleGradeConfiguration>>;
    multiGradeConfigurations: FormArray<FormControl<MultiGradeConfiguration>>;
  }>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DefaultCrudDialogData<MultiGradeConfigDialogData>, private dialogRef: MatDialogRef<MultiGradeConfigDialogComponent>, private formBuilder: NonNullableFormBuilder) {
    this.multiGradeConfigFormGroup = this.formBuilder.group({
      name: this.formBuilder.control(data.object.multi?.name ?? 'GradeCollection'),
      weight: this.formBuilder.control(data.object.multi?.weight ?? 50),
      singleGradeConfigurations: this.formBuilder.array<FormControl<SingleGradeConfiguration>>([]),
      multiGradeConfigurations: this.formBuilder.array<FormControl<MultiGradeConfiguration>>([]),
    });
  }

  public acceptChanges(): void {
    this.dialogRef.close(this.multiGradeConfigFormGroup.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public deleteItem(): void {
    this.data.deleteFlag = true;
    this.dialogRef.close();
  }
}
