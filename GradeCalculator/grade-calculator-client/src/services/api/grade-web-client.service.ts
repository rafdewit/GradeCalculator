import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseUrlProvider } from "./base-url.provider";
import { StudentCollection } from "../dtos/student-collection.model";

@Injectable({
    providedIn: 'root'
})
export class GradeWebClient {

    private proxyName: string = 'Grade';

    constructor(private httpClient: HttpClient, private base: BaseUrlProvider) { }

    public getAll(): Observable<StudentCollection[]> {
        return this.httpClient.get<StudentCollection[]>(this.base.baseUrl + `${this.proxyName}`);
    }

    public get(classId: string): Observable<StudentCollection> {
        return this.httpClient.get<StudentCollection>(this.base.baseUrl + `${this.proxyName}?id=${classId}`);
    }
}
