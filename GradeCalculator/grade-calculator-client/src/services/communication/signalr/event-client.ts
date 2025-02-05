import { StudentCollection } from 'app/dtos/student-collection.model';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export abstract class IEventClient {
  public abstract connectedState$: BehaviorSubject<boolean>;
  public abstract studentCollectionUpdateEvent$: Observable<StudentCollection>;
  public abstract studentCollectionDeletedEvent$: Observable<string>;
}
