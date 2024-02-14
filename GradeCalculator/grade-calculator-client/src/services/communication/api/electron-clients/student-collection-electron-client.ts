import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { StudentCollection } from "../../../dtos/student-collection.model";
import { UpdateStudentCollectionDto } from "../request/student-collection/update-class-request";
import { CreateStudentCollectionDto } from "../request/student-collection/create-class-request";
import { CopyStudentCollectionDto } from "../request/student-collection/copy-class-request";

@Injectable()
export class StudentCollectionElectronClient {
    public getAllClasses(): Observable<StudentCollection[]> {
        return of();
    }

    public getClass(classId: string): Observable<StudentCollection> {
        return of();
    }
    
    public updateClass(request: UpdateStudentCollectionDto): Observable<void> {
        return of();
    }
    
    public copyClass(request: CopyStudentCollectionDto): Observable<void> {
        return of();
    }
    
    public createClass(request: CreateStudentCollectionDto): Observable<void> {
        return of();
    }
    
    public deleteClass(id: string): Observable<void> {
        return of();
    }
    
}
