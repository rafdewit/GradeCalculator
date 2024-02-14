import { Injectable } from "@angular/core";
import { Observable, from } from 'rxjs';
import { SingleGradesUpdateDto } from "../request/grade-update/single-grades-update";
import { ISingleGradeClient } from "../base/single-grade-client.interface";

@Injectable()
export class SingleGradeElectronClient extends ISingleGradeClient {
    constructor() { 
        super();
    }
    
    public updateSingleGrades(request: SingleGradesUpdateDto): Observable<void> {
        return from((window as any).electron.updateSingleGrades(request)) as Observable<void>;
    }
}
