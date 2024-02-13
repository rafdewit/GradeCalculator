import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrlProvider } from "./base-url.provider";
import { SingleGradesUpdateDto } from "./request/grade-update/single-grades-update";

@Injectable({
    providedIn: 'root'
})
export class SingleGradeWebClient {

    private proxyName: string = 'SingleGrade';

    constructor(private httpClient: HttpClient, private base: BaseUrlProvider) { }

    public updateSingleGrades(request: SingleGradesUpdateDto): Observable<void> {
        return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}`, request);
    }
}
