import { Injectable } from "@angular/core";
import { GradeHubClient } from "../signalr/grade-hub.client";
import { StudentCollection } from "../dtos/student-collection.model";
import { GradeWebClient } from "../api/grade-web-client.service";
import { Observable, map, scan, startWith, switchMap } from "rxjs";
import { bufferOneRef } from "../rxjs/buffer-one-ref";
import { ClassScoreInfo } from "./models/score";
import { convertClass } from "./grade.converter";

@Injectable({
    providedIn: 'root'
})
export class GradeStore {
    public classes$: Observable<StudentCollection[]>;
    public classScoreInfos$: Observable<ClassScoreInfo[]>;

    constructor(private gradeWebClient: GradeWebClient, private gradeHubClient: GradeHubClient) {
        this.classes$ = this.get();
        this.classScoreInfos$ = this.classes$.pipe(map(collection =>  collection.map(item => convertClass(item)))).pipe(bufferOneRef());
    }

    private get(): Observable<StudentCollection[]> {
        const initialClasses$ = this.gradeWebClient.getAllClasses();

        const attachCreate$ = initialClasses$.pipe(switchMap(r => {
            return this.gradeHubClient.studentCollectionUpdateEvent$.pipe(startWith(null), scan((acc, value) => {
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
            return this.gradeHubClient.studentCollectionDeletedEvent$.pipe(startWith(null), scan((acc, id) => {
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