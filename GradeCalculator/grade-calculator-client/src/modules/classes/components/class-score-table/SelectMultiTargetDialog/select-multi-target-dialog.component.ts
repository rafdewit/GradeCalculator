import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectMultiTargetDialogData } from 'src/modules/classes/components/class-score-table/SelectMultiTargetDialog/select-multi-target-dialog.data';
import { MultiCollectionTarget } from 'src/services/stores/multi-collection-target.store';

@Component({
  selector: 'app-select-multi-target-dialog',
  templateUrl: './select-multi-target-dialog.component.html',
  styleUrl: './select-multi-target-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMultiTargetDialogComponent {
  multiTargetFormControl: FormControl<MultiCollectionTarget | null>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: SelectMultiTargetDialogData, private dialogRef: MatDialogRef<SelectMultiTargetDialogData>, private formBuilder: NonNullableFormBuilder) {
    this.multiTargetFormControl = this.formBuilder.control<MultiCollectionTarget | null>(null);
  }

  public acceptChanges(): void {
    this.dialogRef.close(this.multiTargetFormControl.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
