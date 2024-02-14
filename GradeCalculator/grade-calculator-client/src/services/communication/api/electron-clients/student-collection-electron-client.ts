import { Injectable } from "@angular/core";
import { Observable, from, of } from 'rxjs';
import { StudentCollection } from "../../../dtos/student-collection.model";
import { UpdateStudentCollectionDto } from "../request/student-collection/update-class-request";
import { CreateStudentCollectionDto } from "../request/student-collection/create-class-request";
import { CopyStudentCollectionDto } from "../request/student-collection/copy-class-request";
import { IStudentCollectionClient } from "../base/student-collection-client";


@Injectable()
export class StudentCollectionElectronClient extends IStudentCollectionClient {
    constructor() {
        super();
    }

    public getAllClasses(): Observable<StudentCollection[]> {
        const func = async () => {
            const response = await (window as any).versions.ping()
            console.log(response) // prints out 'pong'
        }
        func();

        const ipcRenderer = window.require('electron').ipcRenderer;
        const promise: Promise<StudentCollection[]> = ipcRenderer.invoke('getAllClasses');
        return from(promise);
    }

    public getClass(classId: string): Observable<StudentCollection> {
        const ipcRenderer = window.require('electron').ipcRenderer;
        const promise: Promise<StudentCollection> = ipcRenderer.invoke('getClass', classId);
        return from(promise);
    }

    public updateClass(request: UpdateStudentCollectionDto): Observable<void> {
        const ipcRenderer = window.require('electron').ipcRenderer;
        ipcRenderer.send('updateClass', request);
        return of();
    }

    public copyClass(request: CopyStudentCollectionDto): Observable<void> {
        const ipcRenderer = window.require('electron').ipcRenderer;
        ipcRenderer.send('copyClass', request);
        return of();
    }

    public createClass(request: CreateStudentCollectionDto): Observable<void> {
        const ipcRenderer = window.require('electron').ipcRenderer;
        ipcRenderer.send('createClass', request);
        return of();
    }

    public deleteClass(id: string): Observable<void> {
        const ipcRenderer = window.require('electron').ipcRenderer;
        ipcRenderer.send('deleteClass', id);
        return of();
    }

}
