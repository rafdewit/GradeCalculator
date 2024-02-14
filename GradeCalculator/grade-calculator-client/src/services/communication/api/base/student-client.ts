import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { CreateStudentPeriodDto } from "../request/students/create-student-period";
import { DeleteStudentPeriodDto } from "../request/students/delete-student-period";
import { UpdateStudentPeriodDto } from "../request/students/update-student-period";

@Injectable({
    providedIn: 'root'
})
export abstract class IStudentClient {
    public abstract updateStudent(request: UpdateStudentPeriodDto): Observable<void>;
    public abstract createStudent(request: CreateStudentPeriodDto): Observable<void>;
    public abstract deleteStudent(request: DeleteStudentPeriodDto): Observable<void>;
}
