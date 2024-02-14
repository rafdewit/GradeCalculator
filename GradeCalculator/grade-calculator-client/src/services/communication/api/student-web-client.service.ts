import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrlProvider } from "./base-url.provider";
import { CreateStudentPeriodDto } from "./request/students/create-student-period";
import { DeleteStudentPeriodDto } from "./request/students/delete-student-period";
import { UpdateStudentPeriodDto } from "./request/students/update-student-period";

@Injectable({
    providedIn: 'root'
})
export class StudentWebClient {

    private proxyName: string = 'Student';

    constructor(private httpClient: HttpClient, private base: BaseUrlProvider) { }

    public updateStudent(request: UpdateStudentPeriodDto): Observable<void> {
        return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/update`, request);
    }
        
    public createStudent(request: CreateStudentPeriodDto): Observable<void> {
        return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}`, request);
    }

    public deleteStudent(request: DeleteStudentPeriodDto): Observable<void> {
        return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/delete`, request);
    }
}
