import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { CreateStudentPeriodDto } from "../request/students/create-student-period";
import { DeleteStudentPeriodDto } from "../request/students/delete-student-period";
import { UpdateStudentPeriodDto } from "../request/students/update-student-period";
import { IStudentClient } from "../base/student-client";

@Injectable({
    providedIn: 'root'
})
export class StudentElectronClient extends IStudentClient {
    public updateStudent(request: UpdateStudentPeriodDto): Observable<void> {
        return of();
    }
    
    public createStudent(request: CreateStudentPeriodDto): Observable<void> {
        return of();
    }

    public deleteStudent(request: DeleteStudentPeriodDto): Observable<void> {
        return of();
    }
}
