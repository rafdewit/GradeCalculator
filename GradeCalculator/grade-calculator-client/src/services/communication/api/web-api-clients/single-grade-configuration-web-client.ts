import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrlProvider } from '../base-url.provider';
import { CreateSingleGradeConfigurationDto } from '../request/single/create-single-grade-configuration';
import { DeleteSingleGradeConfigurationDto } from '../request/single/delete-single-grade-configuration';
import { UpdateSingleGradeConfigurationDto } from '../request/single/update-single-grade-configuration';
import { ISingleGradeConfigurationClient } from '../base/single-grade-configuration-client';
import { MoveSingleGradeConfigurationDto } from 'src/services/communication/api/request/single/move-single-grade-configuration';
import { TargetMoveSingleGradeConfigurationDto } from 'src/services/communication/api/request/single/target-move-single-grade-configuration';

@Injectable()
export class SingleGradeConfigurationWebClient extends ISingleGradeConfigurationClient {
  private proxyName: string = 'SingleGradeConfiguration';

  constructor(private httpClient: HttpClient, private base: BaseUrlProvider) {
    super();
  }
  public updateSingleGradeConfiguration(request: UpdateSingleGradeConfigurationDto): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/update`, request);
  }

  public createSingleGradeConfiguration(request: CreateSingleGradeConfigurationDto): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}`, request);
  }

  public deleteSingleGradeConfiguration(request: DeleteSingleGradeConfigurationDto): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/delete`, request);
  }

  public override moveSingleGradeConfiguration(request: MoveSingleGradeConfigurationDto): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/move`, request);
  }

  public override targetMoveSingleGradeConfiguration(request: TargetMoveSingleGradeConfigurationDto): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/target-move`, request);
  }
}
