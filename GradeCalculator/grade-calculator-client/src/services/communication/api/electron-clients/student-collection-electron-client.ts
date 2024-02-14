import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { StudentCollection } from "../../../dtos/student-collection.model";
import { UpdateStudentCollectionDto } from "../request/student-collection/update-class-request";
import { CreateStudentCollectionDto } from "../request/student-collection/create-class-request";
import { CopyStudentCollectionDto } from "../request/student-collection/copy-class-request";

@Injectable()
export class StudentCollectionElectronClient {
    public getAllClasses(): Observable<StudentCollection[]> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.invoke('getAllClasses');
        return of();
    }

    public getClass(classId: string): Observable<StudentCollection> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.invoke('getClass', classId);
        return of();
    }
    
    public updateClass(request: UpdateStudentCollectionDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('updateClass', request);
        return of();
    }
    
    public copyClass(request: CopyStudentCollectionDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('copyClass', request);
        return of();
    }
    
    public createClass(request: CreateStudentCollectionDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('createClass', request);
        return of();
    }
    
    public deleteClass(id: string): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('deleteClass', id);
        return of();
    }
    
}
