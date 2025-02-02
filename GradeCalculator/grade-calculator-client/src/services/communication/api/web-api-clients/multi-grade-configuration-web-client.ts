import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrlProvider } from '../base-url.provider';
import { CreateMultiGradeConfigurationDto } from '../request/multi/create-multi-grade-configuration';
import { UpdateMultiGradeConfigurationDto } from '../request/multi/update-multi-grade-configuration';
import { DeleteMultiGradeConfigurationDto } from '../request/multi/delete-multi-grade-configuration';
import { IMultiGradeConfigurationClient } from '../base/multi-grade-configuration-client';
import { MoveMultiGradeConfigurationDto } from 'src/services/communication/api/request/multi/move-multi-grade-configuration';

@Injectable()
export class MultiGradeConfigurationWebClient extends IMultiGradeConfigurationClient {
  private proxyName: string = 'MultiGradeConfiguration';

  constructor(private httpClient: HttpClient, private base: BaseUrlProvider) {
    super();
  }

  public updateMultiGradeConfiguration(request: UpdateMultiGradeConfigurationDto): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/update`, request);
  }

  public createMultiGradeConfiguration(request: CreateMultiGradeConfigurationDto): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}`, request);
  }

  public deleteMultiGradeConfiguration(request: DeleteMultiGradeConfigurationDto): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/delete`, request);
  }

  public override moveMultiGradeConfiguration(request: MoveMultiGradeConfigurationDto): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/move`, request);
  }
}
