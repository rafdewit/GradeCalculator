import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrlProvider } from '../base-url.provider';
import { UpdateStudentCollectionDto } from '../request/student-collection/update-class-request';
import { CreateStudentCollectionDto } from '../request/student-collection/create-class-request';
import { CopyStudentCollectionDto } from '../request/student-collection/copy-class-request';
import { IStudentCollectionClient } from '../base/student-collection-client';
import { StudentCollection } from 'app/dtos/student-collection.model';

@Injectable()
export class StudentCollectionWebClient extends IStudentCollectionClient {
  private proxyName: string = 'StudentCollection';

  constructor(private httpClient: HttpClient, private base: BaseUrlProvider) {
    super();
  }

  public override deleteDirectory(directory: string): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/delete-directory`, { directory: directory });
  }

  public override createDirectory(directory: string): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/create-directory`, { directory: directory });
  }

  public override getAllDirectories(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.base.baseUrl + `${this.proxyName}/directories`);
  }

  public getAllClasses(): Observable<StudentCollection[]> {
    return this.httpClient.get<StudentCollection[]>(this.base.baseUrl + `${this.proxyName}`);
  }

  public getClass(classId: string): Observable<StudentCollection> {
    return this.httpClient.get<StudentCollection>(this.base.baseUrl + `${this.proxyName}?id=${classId}`);
  }

  public updateClass(request: UpdateStudentCollectionDto): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/update`, request);
  }

  public copyClass(request: CopyStudentCollectionDto): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}/copy`, request);
  }

  public createClass(request: CreateStudentCollectionDto): Observable<void> {
    return this.httpClient.post<void>(this.base.baseUrl + `${this.proxyName}`, request);
  }

  public deleteClass(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.base.baseUrl + `${this.proxyName}?id=${id}`);
  }
}
