import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { CreateStudentPeriodDto } from "../request/students/create-student-period";
import { DeleteStudentPeriodDto } from "../request/students/delete-student-period";
import { UpdateStudentPeriodDto } from "../request/students/update-student-period";
import { IStudentClient } from "../base/student-client";

@Injectable()
export class StudentElectronClient extends IStudentClient {
    constructor() { 
        super();
    }
    
    public updateStudent(request: UpdateStudentPeriodDto): Observable<void> {
        (window as any).electron.updateStudent(request);
        return of(void 0);
    }

    public createStudent(request: CreateStudentPeriodDto): Observable<void> {
        (window as any).electron.createStudent(request);
        return of(void 0);
    }

    public deleteStudent(request: DeleteStudentPeriodDto): Observable<void> {
        (window as any).electron.deleteStudent(request);
        return of(void 0);
    }
}
