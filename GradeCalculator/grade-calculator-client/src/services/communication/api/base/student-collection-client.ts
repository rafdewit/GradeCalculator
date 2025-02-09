import { Observable } from 'rxjs';
import { UpdateStudentCollectionDto } from '../request/student-collection/update-class-request';
import { CreateStudentCollectionDto } from '../request/student-collection/create-class-request';
import { CopyStudentCollectionDto } from '../request/student-collection/copy-class-request';
import { StudentCollection } from 'app/dtos/student-collection.model';

export abstract class IStudentCollectionClient {
  public abstract getAllDirectories(): Observable<string[]>;
  public abstract getAllClasses(): Observable<StudentCollection[]>;
  public abstract getClass(classId: string): Observable<StudentCollection>;
  public abstract updateClass(request: UpdateStudentCollectionDto): Observable<void>;
  public abstract copyClass(request: CopyStudentCollectionDto): Observable<void>;
  public abstract createClass(request: CreateStudentCollectionDto): Observable<void>;
  public abstract deleteClass(id: string): Observable<void>;
}
