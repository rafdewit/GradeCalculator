import { StudentCollection } from "app/dtos/student-collection.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IEventClient } from "./event-client";
import { Injectable } from "@angular/core";

@Injectable()
export class GradeElectronEventClient extends IEventClient {
    public connectedState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public studentCollectionUpdateEvent$: Observable<StudentCollection>;
    public studentCollectionDeletedEvent$: Observable<string>;

    private studentCollectionUpdateEventSubject$ = new Subject<StudentCollection>();
    private studentCollectionDeletedEventSubject$ = new Subject<string>();

    constructor() {
        super();

        this.studentCollectionUpdateEvent$ = this.studentCollectionUpdateEventSubject$;
        this.studentCollectionDeletedEvent$ = this.studentCollectionDeletedEventSubject$;

        (window as any).electron.studentCollectionUpdated(this.handleStudentCollectionUpdated);
        (window as any).electron.studentCollectionDeleted(this.handleStudentCollectionDeleted);

        this.connectedState$.next(true);
    }

    private handleStudentCollectionUpdated(studentCollection: StudentCollection): void {
        this.studentCollectionUpdateEventSubject$.next(studentCollection);
    }


    private handleStudentCollectionDeleted(id: string): void {
        this.studentCollectionDeletedEventSubject$.next(id);
    }
}