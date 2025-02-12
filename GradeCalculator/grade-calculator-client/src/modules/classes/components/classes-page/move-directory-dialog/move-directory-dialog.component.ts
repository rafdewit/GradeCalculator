import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MoveDirectoryDialogData } from 'src/modules/classes/components/classes-page/move-directory-dialog/move-directory-dialog.data';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';

@Component({
  selector: 'app-move-directory-dialog',
  templateUrl: './move-directory-dialog.component.html',
  styleUrl: './move-directory-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoveDirectoryDialogComponent {
  public valueFormControl: FormControl<DirectoryTempModel>;
  public directoryTempModels: DirectoryTempModel[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: MoveDirectoryDialogData, private dialogRef: MatDialogRef<MoveDirectoryDialogComponent>, private formBuilder: NonNullableFormBuilder) {
    this.directoryTempModels = this.data.directories.map(d => {
      const result: DirectoryTempModel = {
        directory: d.join('\\'),
        directoryParts: d,
      };

      return result;
    });

    this.valueFormControl = this.formBuilder.control(this.directoryTempModels[0], [Validators.required]);
  }

  public acceptChanges(): void {
    this.dialogRef.close(this.valueFormControl.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}

export class DirectoryTempModel {
  directory: string;
  directoryParts: string[];
}
