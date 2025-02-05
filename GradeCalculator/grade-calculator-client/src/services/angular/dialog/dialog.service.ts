import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentCollection } from 'app/dtos/student-collection.model';
import { firstValueFrom } from 'rxjs';
import { SelectMultiTargetDialogComponent } from 'src/modules/classes/components/class-score-table/SelectMultiTargetDialog/select-multi-target-dialog.component';
import { SelectMultiTargetDialogData } from 'src/modules/classes/components/class-score-table/SelectMultiTargetDialog/select-multi-target-dialog.data';
import { ConfirmationDialogData } from 'src/modules/common-module/dialogs/confirmation-dialog/confirmation-dialog-data';
import { ConfirmationDialogComponent } from 'src/modules/common-module/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MultiCollectionTarget, MultiCollectionTargetStore } from 'src/services/stores/multi-collection-target.store';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog, private multiCollectionTargetStore: MultiCollectionTargetStore) {}

  public async openConfirmationDialogDialog(title: string = '', text: string = ''): Promise<boolean | undefined> {
    const data: ConfirmationDialogData = {
      title: title,
      content: text,
    };

    const input = new MatDialogConfig<ConfirmationDialogData>();
    input.data = data;

    const dialogRef = this.matDialog.open<ConfirmationDialogComponent, ConfirmationDialogData, boolean>(ConfirmationDialogComponent, input);
    const result = await dialogRef.afterClosed();
    const promise = firstValueFrom(result);

    const resultAwaited = await promise;
    return resultAwaited;
  }

  public async openGradeTargetSelectionDialog(title: string, studentCollection: StudentCollection, multiId: string | null = null): Promise<MultiCollectionTarget | null> {
    const targets: MultiCollectionTarget[] = this.multiCollectionTargetStore.getMultiCollectionTargets(studentCollection);

    const data: SelectMultiTargetDialogData = {
      title: title,
      targets: targets.filter(t => t.type !== 'multi' || t.id !== multiId),
    };

    const input = new MatDialogConfig<SelectMultiTargetDialogData>();
    input.data = data;

    const dialogRef = this.matDialog.open<SelectMultiTargetDialogComponent, SelectMultiTargetDialogData, MultiCollectionTarget>(SelectMultiTargetDialogComponent, input);
    const dialogResult = (await firstValueFrom(dialogRef.afterClosed())) ?? null;
    return dialogResult;
  }
}
