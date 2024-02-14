import { StudentCollection } from "app/dtos/student-collection.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IEventClient } from "./event-client";
import { Injectable, NgZone } from "@angular/core";

@Injectable()
export class GradeElectronEventClient extends IEventClient {
    public connectedState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public studentCollectionUpdateEvent$: Observable<StudentCollection>;
    public studentCollectionDeletedEvent$: Observable<string>;

    private studentCollectionUpdateEventSubject$;
    private studentCollectionDeletedEventSubject$;

    constructor(private ngZone: NgZone) {
        super();

        this.studentCollectionUpdateEventSubject$ = new Subject<StudentCollection>();
        this.studentCollectionDeletedEventSubject$ = new Subject<string>();

        this.studentCollectionUpdateEvent$ = this.studentCollectionUpdateEventSubject$;
        this.studentCollectionDeletedEvent$ = this.studentCollectionDeletedEventSubject$;

        (window as any).electron.studentCollectionUpdated(this.handleStudentCollectionUpdated.bind(this));
        (window as any).electron.studentCollectionDeleted(this.handleStudentCollectionDeleted.bind(this));

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
}