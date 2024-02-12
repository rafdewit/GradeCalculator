import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, NonNullableFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MultiGradeConfiguration } from 'src/services/dtos/grade-config/multi-grade-configuration.model';
import { SingleGradeConfiguration } from 'src/services/dtos/grade-config/single-grade-configuration.model';
import { DefaultCrudDialogData } from '../default-dialog-crud.data';
import { MultiGradeConfigDialogComponent } from '../multi-grade-config-dialog/multi-grade-config-dialog.component';
import { MultiGradeConfigDialogData } from '../multi-grade-config-dialog/multi-grade-config-dialog.data';
import { SingleGradeConfigDialogData } from './single-grade-config-dialog.data';

@Component({
  selector: 'app-single-grade-config-dialog',
  templateUrl: './single-grade-config-dialog.component.html',
  styleUrl: './single-grade-config-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleGradeConfigDialogComponent {
  public singleGradeConfigFormGroup: FormGroup<{
    id: FormControl<string>,
    name: FormControl<string>,
    totalScore: FormControl<number>,
    weight: FormControl<number>,
  }>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DefaultCrudDialogData<SingleGradeConfigDialogData>, private dialogRef: MatDialogRef<SingleGradeConfigDialogData>, private formBuilder: NonNullableFormBuilder) {
    this.singleGradeConfigFormGroup = this.formBuilder.group({
      id: this.formBuilder.control(''),
      name: this.formBuilder.control(''),
      totalScore: this.formBuilder.control(0),
      weight: this.formBuilder.control(0)
    });
  }

  public acceptChanges(): void {
    this.dialogRef.close(this.singleGradeConfigFormGroup.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public deleteItem(): void {
    this.data.deleteFlag = true;
    this.dialogRef.close();
  }
}
