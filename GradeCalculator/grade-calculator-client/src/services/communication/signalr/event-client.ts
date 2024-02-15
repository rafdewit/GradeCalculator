import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { StudentCollection } from "src/services/dtos/student-collection.model";

export abstract class IEventClient {
    public abstract connectedState$: BehaviorSubject<boolean>;
    public abstract studentCollectionUpdateEvent$: Observable<StudentCollection>;
    public abstract studentCollectionDeletedEvent$: Observable<string>;
}