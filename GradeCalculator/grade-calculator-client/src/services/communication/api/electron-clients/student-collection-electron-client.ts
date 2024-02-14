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
        (window as any).electron.updateClass(request);
        return of(void 0);
    }

    public copyClass(request: CopyStudentCollectionDto): Observable<void> {
        (window as any).electron.copyClass(request);
        return of(void 0);
    }

    public createClass(request: CreateStudentCollectionDto): Observable<void> {
        (window as any).electron.createClass(request);
        return of(void 0);
    }

    public deleteClass(id: string): Observable<void> {
        (window as any).electron.deleteClass(id);
        return of(void 0);
    }

}
