import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IEventClient } from './event-client';
import { Injectable, NgZone } from '@angular/core';
import { StudentCollection } from 'app/dtos/student-collection.model';

@Injectable()
export class GradeElectronEventClient extends IEventClient {
  public connectedState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public studentCollectionUpdateEvent$: Observable<StudentCollection>;
  public studentCollectionDeletedEvent$: Observable<string>;
  public directoriesUpdatedEvent$: Observable<string[]>;

  private studentCollectionUpdateEventSubject$;
  private studentCollectionDeletedEventSubject$;
  private directoriesUpdatedSubject$;

  constructor(private ngZone: NgZone) {
    super();

    this.studentCollectionUpdateEventSubject$ = new Subject<StudentCollection>();
    this.studentCollectionDeletedEventSubject$ = new Subject<string>();
    this.directoriesUpdatedSubject$ = new Subject<string[]>();

    this.studentCollectionUpdateEvent$ = this.studentCollectionUpdateEventSubject$;
    this.studentCollectionDeletedEvent$ = this.studentCollectionDeletedEventSubject$;
    this.directoriesUpdatedEvent$ = this.directoriesUpdatedSubject$;

    (window as any).electron.studentCollectionUpdated(this.handleStudentCollectionUpdated.bind(this));
    (window as any).electron.studentCollectionDeleted(this.handleStudentCollectionDeleted.bind(this));
    (window as any).electron.directoriesUpdated(this.directoriesUpdated.bind(this));

    this.connectedState$.next(true);
  }

  private handleStudentCollectionUpdated(studentCollection: StudentCollection): void {
    this.ngZone.run(() => {
      this.studentCollectionUpdateEventSubject$.next(studentCollection);
    });
  }

  private handleStudentCollectionDeleted(id: string): void {
    this.ngZone.run(() => {
      this.studentCollectionDeletedEventSubject$.next(id);
    });
  }

  private directoriesUpdated(directories: string[]): void {
    this.ngZone.run(() => {
      this.directoriesUpdatedSubject$.next(directories);
    });
  }
}
