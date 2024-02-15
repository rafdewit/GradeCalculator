import { Injectable } from "@angular/core";
import { Observable, map, scan, startWith, switchMap } from "rxjs";
import { bufferOneRef } from "../rxjs/buffer-one-ref";
import { ClassScoreInfo } from "./models/score";
import { convertClass } from "./grade.converter";
import { IStudentCollectionClient } from "../communication/api/base/student-collection-client";
import { IEventClient } from "../communication/signalr/event-client";
import { StudentCollection } from "../dtos/student-collection.model";

@Injectable({
    providedIn: 'root'
})
export class GradeStore {
    public classes$: Observable<StudentCollection[]>;
    public classScoreInfos$: Observable<ClassScoreInfo[]>;

    constructor(private studentCollectionClient: IStudentCollectionClient, private gradeEventClient: IEventClient) {
        this.classes$ = this.get();
        this.classScoreInfos$ = this.classes$.pipe(map(collection =>  collection.map(item => convertClass(item)))).pipe(bufferOneRef());
    }

    public getClass(id: string): Observable<StudentCollection | null> {
        return this.classes$.pipe(map(classes => classes.find(c => c.id === id) ?? null));
    }

    private get(): Observable<StudentCollection[]> {
        const initialClasses$ = this.studentCollectionClient.getAllClasses();

        const attachCreate$ = initialClasses$.pipe(switchMap(r => {
            return this.gradeEventClient.studentCollectionUpdateEvent$.pipe(startWith(null), scan((acc, value) => {

                if (value) {
                    const index = acc.findIndex(i => i.id === value.id);
                    if (index >= 0) {
                        acc.splice(index, 1, value);
                    } else {
                        acc.push(value);
                    }
                }
                
                return acc;
            }, r))
        }));

        const attachDelete$ = attachCreate$.pipe(switchMap(r => {
            return this.gradeEventClient.studentCollectionDeletedEvent$.pipe(startWith(null), scan((acc, id) => {
                if (id) {
                    const index = acc.findIndex(i => i.id === id);
                    if (index >= 0) {
                        acc.splice(index, 1);
                    }
                }

                return acc;
            }, r))
        }));
        
        return attachDelete$.pipe(bufferOneRef());
    }
}