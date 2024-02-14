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
        return from((window as any).electron.getAllClasses()) as Observable<StudentCollection[]>;
    }

    public getClass(classId: string): Observable<StudentCollection> {
        return from((window as any).electron.getClass(classId)) as Observable<StudentCollection>;
    }

    public updateClass(request: UpdateStudentCollectionDto): Observable<void> {
        return from((window as any).electron.updateClass(request)) as Observable<void>;
    }

    public copyClass(request: CopyStudentCollectionDto): Observable<void> {
        return from((window as any).electron.copyClass(request)) as Observable<void>;
    }

    public createClass(request: CreateStudentCollectionDto): Observable<void> {
        return from((window as any).electron.createClass(request)) as Observable<void>;
    }

    public deleteClass(id: string): Observable<void> {
        return from((window as any).electron.deleteClass(id)) as Observable<void>;
    }

}
