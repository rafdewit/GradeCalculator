import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreateMultiGradeConfigurationDto } from '../request/multi/create-multi-grade-configuration';
import { UpdateMultiGradeConfigurationDto } from '../request/multi/update-multi-grade-configuration';
import { DeleteMultiGradeConfigurationDto } from '../request/multi/delete-multi-grade-configuration';
import { IMultiGradeConfigurationClient } from '../base/multi-grade-configuration-client';
import { MoveMultiGradeConfigurationDto } from 'src/services/communication/api/request/multi/move-multi-grade-configuration';
import { TargetMoveMultiGradeConfigurationDto } from 'src/services/communication/api/request/multi/target-move-multi-grade-configuration';

@Injectable()
export class MultiGradeConfigurationElectronClient extends IMultiGradeConfigurationClient {
  constructor() {
    super();
  }

  public updateMultiGradeConfiguration(request: UpdateMultiGradeConfigurationDto): Observable<void> {
    (window as any).electron.updateMultiGradeConfiguration(request);
    return of(void 0);
  }

  public createMultiGradeConfiguration(request: CreateMultiGradeConfigurationDto): Observable<void> {
    (window as any).electron.createMultiGradeConfiguration(request);
    return of(void 0);
  }

  public deleteMultiGradeConfiguration(request: DeleteMultiGradeConfigurationDto): Observable<void> {
    (window as any).electron.deleteMultiGradeConfiguration(request);
    return of(void 0);
  }

  public override moveMultiGradeConfiguration(request: MoveMultiGradeConfigurationDto): Observable<void> {
    (window as any).electron.moveMultiGradeConfiguration(request);
    return of(void 0);
  }

  public override targetMoveMultiGradeConfiguration(request: TargetMoveMultiGradeConfigurationDto): Observable<void> {
    (window as any).electron.targetMoveMultiGradeConfiguration(request);
    return of(void 0);
  }
}
