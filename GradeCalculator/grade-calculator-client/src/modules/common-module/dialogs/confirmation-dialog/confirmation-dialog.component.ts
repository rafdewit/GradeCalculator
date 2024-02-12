import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonDialogData } from 'd:/KION/Dev Git/TiliaLight/TiliaLight/tilia-light-client/src/app/common/dialogs/common.dialog-data';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CommonDialogData) { }
}
