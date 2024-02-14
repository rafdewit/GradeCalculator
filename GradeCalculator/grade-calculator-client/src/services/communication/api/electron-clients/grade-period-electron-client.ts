import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { CopyGradePeriodDto } from "../request/grade-period/copy-grade-period";
import { CreateGradePeriodDto } from "../request/grade-period/create-grade-period";
import { DeleteGradePeriodDto } from "../request/grade-period/delete-grade-period";
import { UpdateGradePeriodDto } from "../request/grade-period/update-grade-period";
import { IGradePeriodClient } from "../base/grade-period-client.interface";

@Injectable()
export class GradePeriodElectronClient extends IGradePeriodClient {
    constructor() { 
        super();
    }

    public updateGradePeriod(request: UpdateGradePeriodDto): Observable<void> {
        return of();
    }
    
    public copyGradePeriod(request: CopyGradePeriodDto): Observable<void> {
        return of();
    }
    
    public createGradePeriod(request: CreateGradePeriodDto): Observable<void> {
        return of();
    }

    public deleteGradePeriod(request: DeleteGradePeriodDto): Observable<void> {
        return of();
    }
}
