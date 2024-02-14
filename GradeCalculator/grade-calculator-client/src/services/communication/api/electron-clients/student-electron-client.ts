import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { CreateStudentPeriodDto } from "../request/students/create-student-period";
import { DeleteStudentPeriodDto } from "../request/students/delete-student-period";
import { UpdateStudentPeriodDto } from "../request/students/update-student-period";
import { IStudentClient } from "../base/student-client";

@Injectable()
export class StudentElectronClient extends IStudentClient {
    public updateStudent(request: UpdateStudentPeriodDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('updateStudent', request);
        return of();
    }

    public createStudent(request: CreateStudentPeriodDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('createStudent', request);
        return of();
    }

    public deleteStudent(request: DeleteStudentPeriodDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('deleteStudent', request);
        return of();
    }
}
