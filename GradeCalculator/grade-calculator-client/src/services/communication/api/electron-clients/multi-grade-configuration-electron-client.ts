import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { CreateMultiGradeConfigurationDto } from "../request/multi/create-multi-grade-configuration";
import { UpdateMultiGradeConfigurationDto } from "../request/multi/update-multi-grade-configuration";
import { DeleteMultiGradeConfigurationDto } from "../request/multi/delete-multi-grade-configuration";
import { IMultiGradeConfigurationClient } from "../base/multi-grade-configuration-client";

@Injectable()
export class MultiGradeConfigurationElectronClient extends IMultiGradeConfigurationClient {
    constructor() { 
        super();
    }

    public updateMultiGradeConfiguration(request: UpdateMultiGradeConfigurationDto): Observable<void> {
        return of();
    }
        
    public createMultiGradeConfiguration(request: CreateMultiGradeConfigurationDto): Observable<void> {
        return of();
    }

    public deleteMultiGradeConfiguration(request: DeleteMultiGradeConfigurationDto): Observable<void> {
        return of();
    }
}
