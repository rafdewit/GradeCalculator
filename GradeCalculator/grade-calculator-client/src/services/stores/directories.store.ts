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
  public directoryStructure$: Observable<DirectoryModel>;

  constructor(private studentCollectionClient: IStudentCollectionClient, private gradeEventClient: IEventClient) {
    this.directories$ = this.get();

    this.directoryStructure$ = this.directories$.pipe(
      map(directories => {
        const base = directories.map(directoryPath => {
          const parts = directoryPath.split('\\');
          const result: DirectoryModel = {
            directory: directoryPath,
            directoryParts: parts,
            subDirectories: [],
            directoryName: parts[parts.length - 1],
          };

          return result;
        });

        const baseDirectories = base.filter(i => i.directoryParts.length === 1);

        const root: DirectoryModel = {
          directory: '',
          directoryParts: [],
          subDirectories: this.getSub(baseDirectories, base, 2),
          directoryName: '',
        };

        return root;
      }),
    );
  }

  private getSub(layer: DirectoryModel[], base: DirectoryModel[], level: number): DirectoryModel[] {
    layer.forEach(i => {
      const children = base.filter(dir => dir.directoryParts.length === level && dir.directory.startsWith(i.directory));
      i.subDirectories = children.length > 0 ? this.getSub(children, base, level + 1) : [];
    });

    return layer;
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

export interface DirectoryModel {
  directoryParts: string[];
  directory: string;
  directoryName: string;
  subDirectories: DirectoryModel[];
}
