import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefaultCrudDialogData } from '../default-dialog-crud.data';
import { SingleGradeConfigDialogData } from './single-grade-config-dialog.data';

@Component({
  selector: 'app-single-grade-config-dialog',
  templateUrl: './single-grade-config-dialog.component.html',
  styleUrl: './single-grade-config-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleGradeConfigDialogComponent {
  public singleGradeConfigFormGroup: FormGroup<{
    name: FormControl<string>,
    totalScore: FormControl<number>,
    weight: FormControl<number>,
  }>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DefaultCrudDialogData<SingleGradeConfigDialogData>, private dialogRef: MatDialogRef<SingleGradeConfigDialogData>, private formBuilder: NonNullableFormBuilder) {
    this.singleGradeConfigFormGroup = this.formBuilder.group({
      name: this.formBuilder.control(data.object.single?.name ?? 'Grade', [Validators.required]),
      totalScore: this.formBuilder.control(data.object.single?.totalScore ?? 20),
      weight: this.formBuilder.control(data.object.single?.weight ?? 10)
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
