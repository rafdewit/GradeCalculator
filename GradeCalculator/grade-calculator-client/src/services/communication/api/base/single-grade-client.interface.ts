import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { SingleGradesUpdateDto } from "../request/grade-update/single-grades-update";

@Injectable({
    providedIn: 'root'
})
export abstract class ISingleGradeClient {
    public abstract updateSingleGrades(request: SingleGradesUpdateDto): Observable<void>;
}
