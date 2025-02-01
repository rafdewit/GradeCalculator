import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CopyGradePeriodDto } from '../request/grade-period/copy-grade-period';
import { CreateGradePeriodDto } from '../request/grade-period/create-grade-period';
import { DeleteGradePeriodDto } from '../request/grade-period/delete-grade-period';
import { UpdateGradePeriodDto } from '../request/grade-period/update-grade-period';
import { IGradePeriodClient } from '../base/grade-period-client.interface';
import { MoveGradePeriodDto } from '../request/grade-period/move-grade-period';

@Injectable()
export class GradePeriodElectronClient extends IGradePeriodClient {
  constructor() {
    super();
  }

  public override moveGradePeriod(request: MoveGradePeriodDto): Observable<void> {
    (window as any).electron.moveGradePeriod(request);
    return of(void 0);
  }

  public updateGradePeriod(request: UpdateGradePeriodDto): Observable<void> {
    (window as any).electron.updateGradePeriod(request);
    return of(void 0);
  }

  public copyGradePeriod(request: CopyGradePeriodDto): Observable<void> {
    (window as any).electron.copyGradePeriod(request);
    return of(void 0);
  }

  public createGradePeriod(request: CreateGradePeriodDto): Observable<void> {
    (window as any).electron.createGradePeriod(request);
    return of(void 0);
  }

  public deleteGradePeriod(request: DeleteGradePeriodDto): Observable<void> {
    (window as any).electron.deleteGradePeriod(request);
    return of(void 0);
  }
}
