import { Injectable } from "@angular/core";
import { Observable, from } from 'rxjs';
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
        return from((window as any).electron.updateStudent(request)) as Observable<void>;
    }

    public createStudent(request: CreateStudentPeriodDto): Observable<void> {
        return from((window as any).electron.createStudent(request)) as Observable<void>;
    }

    public deleteStudent(request: DeleteStudentPeriodDto): Observable<void> {
        return from((window as any).electron.deleteStudent(request)) as Observable<void>;
    }
}
