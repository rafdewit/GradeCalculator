import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmationDialogData } from 'src/modules/common-module/dialogs/confirmation-dialog/confirmation-dialog-data';
import { ConfirmationDialogComponent } from 'src/modules/common-module/dialogs/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public async openConfirmationDialogDialog(title: string = "", text: string = ""): Promise<boolean | undefined> {
    const data: ConfirmationDialogData = {
      title: title,
      content: text
    }

    const input = new MatDialogConfig<ConfirmationDialogData>();
    input.data = data;
    
    const dialogRef = this.dialog.open<ConfirmationDialogComponent, ConfirmationDialogData, boolean>(
      ConfirmationDialogComponent, input);
    const result = await dialogRef.afterClosed();
    const promise = firstValueFrom(result);

    const resultAwaited = await promise;
    return resultAwaited;
  }
}
