import { Injectable, OnDestroy } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, IRetryPolicy, LogLevel, RetryContext } from '@microsoft/signalr';
import { BehaviorSubject, Observable, Subject, takeUntil, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEventClient } from './event-client';
import { StudentCollection } from 'app/dtos/student-collection.model';

@Injectable()
export class GradeHubClient extends IEventClient implements OnDestroy {
  private onDestroy$ = new Subject<void>();

  public connectedState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public studentCollectionUpdateEvent$: Observable<StudentCollection>;
  public studentCollectionDeletedEvent$: Observable<string>;
  public directoriesUpdatedEvent$: Observable<string[]>;

  constructor() {
    super();

    const connection: HubConnection = new HubConnectionBuilder()
      .withAutomaticReconnect(new RetryEveryFiveSeconds())
      .configureLogging(LogLevel.None)
      .withUrl(environment.baseUrl + `hubs/grades`)
      .build();

    connection.onreconnected(() => {
      console.log('reconnected SignalR');
      this.connectedState$.next(true);
    });

    timer(0, 1000)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        if (connection.state !== HubConnectionState.Connected) {
          this.connectedState$.next(false);
        }

        if (connection.state === HubConnectionState.Disconnected) {
          connection
            .start()
            .then(() => {
              console.log('connected SignalR');
              this.connectedState$.next(true);
            })
            .catch(err => {
              this.connectedState$.next(false);
              console.error(err.toString());
              return;
            });
        }
      });

    this.studentCollectionUpdateEvent$ = signalRObservable('studentcollectionupdated', connection);
    this.studentCollectionDeletedEvent$ = signalRObservable('studentcollectiondeleted', connection);
    this.directoriesUpdatedEvent$ = signalRObservable('directoriesupdated', connection);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

export class RetryEveryFiveSeconds implements IRetryPolicy {
  nextRetryDelayInMilliseconds(retryContext: RetryContext): number | null {
    if (retryContext.previousRetryCount < 5) {
      return 1000;
    } else if (retryContext.previousRetryCount < 10) {
      return 2500;
    } else {
      return 10000;
    }
  }
}

export function signalRObservable<T>(method: string, conn: HubConnection): Observable<T> {
  const subject: Subject<T> = new Subject<T>();

  conn.on(method, (args: T) => {
    subject.next(args);
  });

  return subject;
}
