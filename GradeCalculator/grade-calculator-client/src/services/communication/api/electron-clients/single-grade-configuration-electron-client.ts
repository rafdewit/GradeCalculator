import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { ISingleGradeConfigurationClient } from "../base/single-grade-configuration-client";
import { CreateSingleGradeConfigurationDto } from "../request/single/create-single-grade-configuration";
import { DeleteSingleGradeConfigurationDto } from "../request/single/delete-single-grade-configuration";
import { UpdateSingleGradeConfigurationDto } from "../request/single/update-single-grade-configuration";

@Injectable()
export class SingleGradeConfigurationElectronClient extends ISingleGradeConfigurationClient {
    constructor() { 
        super();
    }

    public updateSingleGradeConfiguration(request: UpdateSingleGradeConfigurationDto): Observable<void> {
        return of();
    }
        
    public createSingleGradeConfiguration(request: CreateSingleGradeConfigurationDto): Observable<void> {
        return of();
    }

    public deleteSingleGradeConfiguration(request: DeleteSingleGradeConfigurationDto): Observable<void> {
        return of();
    }
}
