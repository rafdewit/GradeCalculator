import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISingleGradeConfigurationClient } from '../base/single-grade-configuration-client';
import { CreateSingleGradeConfigurationDto } from '../request/single/create-single-grade-configuration';
import { DeleteSingleGradeConfigurationDto } from '../request/single/delete-single-grade-configuration';
import { UpdateSingleGradeConfigurationDto } from '../request/single/update-single-grade-configuration';
import { MoveSingleGradeConfigurationDto } from 'src/services/communication/api/request/single/move-single-grade-configuration';
import { TargetMoveSingleGradeConfigurationDto } from 'src/services/communication/api/request/single/target-move-single-grade-configuration';

@Injectable()
export class SingleGradeConfigurationElectronClient extends ISingleGradeConfigurationClient {
  constructor() {
    super();
  }

  public override moveSingleGradeConfiguration(request: MoveSingleGradeConfigurationDto): Observable<void> {
    (window as any).electron.moveSingleGradeConfiguration(request);
    return of(void 0);
  }

  public updateSingleGradeConfiguration(request: UpdateSingleGradeConfigurationDto): Observable<void> {
    (window as any).electron.updateSingleGradeConfiguration(request);
    return of(void 0);
  }

  public createSingleGradeConfiguration(request: CreateSingleGradeConfigurationDto): Observable<void> {
    (window as any).electron.createSingleGradeConfiguration(request);
    return of(void 0);
  }

  public deleteSingleGradeConfiguration(request: DeleteSingleGradeConfigurationDto): Observable<void> {
    (window as any).electron.deleteSingleGradeConfiguration(request);
    return of(void 0);
  }

  public override targetMoveSingleGradeConfiguration(request: TargetMoveSingleGradeConfigurationDto): Observable<void> {
    (window as any).electron.targetMoveSingleGradeConfiguration(request);
    return of(void 0);
  }
}
