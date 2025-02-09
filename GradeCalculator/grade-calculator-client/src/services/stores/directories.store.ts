import { Injectable } from '@angular/core';
import { Observable, map, scan, startWith, switchMap } from 'rxjs';
import { bufferOneRef } from '../rxjs/buffer-one-ref';
import { IStudentCollectionClient } from '../communication/api/base/student-collection-client';
import { IEventClient } from '../communication/signalr/event-client';

@Injectable({
  providedIn: 'root',
})
export class DirectoriesStore {
  public directories$: Observable<string[]>;

  constructor(private studentCollectionClient: IStudentCollectionClient, private gradeEventClient: IEventClient) {
    this.directories$ = this.get();
  }

  private get(): Observable<string[]> {
    const initialDirectories$ = this.studentCollectionClient.getAllDirectories();

    const attachCreate$ = initialDirectories$.pipe(
      switchMap(r => {
        return this.gradeEventClient.directoriesUpdatedEvent$.pipe(
          startWith(null),
          scan((acc, value) => {
            if (value) {
              return value;
            }

            return acc;
          }, r),
        );
      }),
    );

    return attachCreate$.pipe(map(i => i.sort((a, b) => (a < b ? -1 : 1)))).pipe(bufferOneRef());
  }
}
