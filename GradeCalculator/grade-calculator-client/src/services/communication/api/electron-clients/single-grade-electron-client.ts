import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { SingleGradesUpdateDto } from "../request/grade-update/single-grades-update";
import { ISingleGradeClient } from "../base/single-grade-client.interface";

@Injectable({
    providedIn: 'root'
})
export class SingleGradeElectronClient extends ISingleGradeClient {
    public updateSingleGrades(request: SingleGradesUpdateDto): Observable<void> {
        return of();
    }
}
