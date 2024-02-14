import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmationDialogData } from 'src/modules/common-module/dialogs/confirmation-dialog/confirmation-dialog-data';
import { ConfirmationDialogComponent } from 'src/modules/common-module/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';
import { SingleGradeConfigDialogData } from 'src/modules/common-module/dialogs/single-grade-config-dialog/single-grade-config-dialog.data';
import { SingleGradeConfiguration } from '../dtos/grade-config/single-grade-configuration.model';
import { SingleGradeConfigDialogComponent } from 'src/modules/common-module/dialogs/single-grade-config-dialog/single-grade-config-dialog.component';
import { SingleGradeConfigurationData } from '../api/request/grade-configuration/single/single-grade-configuration.data';
import { MultiGradeConfiguration } from '../dtos/grade-config/multi-grade-configuration.model';
import { MultiGradeConfigDialogData } from 'src/modules/common-module/dialogs/multi-grade-config-dialog/multi-grade-config-dialog.data';
import { MultiGradeConfigurationData } from '../api/request/grade-configuration/multi/multi-grade-configuration.data';
import { MultiGradeConfigDialogComponent } from 'src/modules/common-module/dialogs/multi-grade-config-dialog/multi-grade-config-dialog.component';
import { SingleGradeConfigurationWebClient } from '../api/single-grade-configuration-web-client';
import { MultiGradeConfigurationWebClient } from '../api/multi-grade-configuration-web-client';
import { CreateSingleGradeConfigurationDto } from '../api/request/grade-configuration/single/create-single-grade-configuration';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog, 
    private singleGradeConfigurationWebClient: SingleGradeConfigurationWebClient,
    private multiGradeConfigurationWebClient: MultiGradeConfigurationWebClient) { }

  public async openConfirmationDialogDialog(title: string = "", text: string = ""): Promise<boolean | undefined> {
    const data: ConfirmationDialogData = {
      title: title,
      content: text
    }

    const input = new MatDialogConfig<ConfirmationDialogData>();
    input.data = data;
    
    const dialogRef = this.matDialog.open<ConfirmationDialogComponent, ConfirmationDialogData, boolean>(
      ConfirmationDialogComponent, input);
    const result = await dialogRef.afterClosed();
    const promise = firstValueFrom(result);

    const resultAwaited = await promise;
    return resultAwaited;
  }
}
