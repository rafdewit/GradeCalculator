import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrlProvider } from "./base-url.provider";
import { CopyGradePeriodDto } from "./request/grade-period/copy-grade-period";
import { CreateGradePeriodDto } from "./request/grade-period/create-grade-period";
import { DeleteGradePeriodDto } from "./request/grade-period/delete-grade-period";
import { UpdateGradePeriodDto } from "./request/grade-period/update-grade-period";

@Injectable({
    providedIn: 'root'
})
export class GradeOPeriodWebClient {

    private proxyName: string = 'GradePeriod';

    constructor(private httpClient: HttpClient, private base: BaseUrlProvider) { }

    public updateGradePeriod(request: UpdateGradePeriodDto): Observable<void> {
        return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/update`, request);
    }
    
    public copyGradePeriod(request: CopyGradePeriodDto): Observable<void> {
        return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/copy`, request);
    }
    
    public createGradePeriod(request: CreateGradePeriodDto): Observable<void> {
        return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}`, request);
    }

    public deleteGradePeriod(request: DeleteGradePeriodDto): Observable<void> {
        return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/delete`, request);
    }
}
