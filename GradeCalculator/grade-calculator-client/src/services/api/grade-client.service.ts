import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BaseUrlProvider } from "./base-url.provider";
import { StudentCollection } from "../dtos/student-collection.model";

@Injectable({
    providedIn: 'root'
})
export class AlgorithmClient {

    private proxyName: string = 'grade';

    constructor(private httpClient: HttpClient, private base: BaseUrlProvider) { }

    public getAll(): Promise<StudentCollection[]> {
        return firstValueFrom(this.httpClient.get<StudentCollection[]>(this.base.baseUrl + `api/${this.proxyName}/get`));
    }

    public get(classId: string): Promise<StudentCollection> {
        return firstValueFrom(this.httpClient.get<StudentCollection>(this.base.baseUrl + `api/${this.proxyName}/get?id=${classId}`));
    }
}
