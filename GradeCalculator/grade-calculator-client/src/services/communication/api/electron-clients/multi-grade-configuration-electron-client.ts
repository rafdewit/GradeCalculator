import { Injectable } from "@angular/core";
import { Observable, from, of } from 'rxjs';
import { CreateMultiGradeConfigurationDto } from "../request/multi/create-multi-grade-configuration";
import { UpdateMultiGradeConfigurationDto } from "../request/multi/update-multi-grade-configuration";
import { DeleteMultiGradeConfigurationDto } from "../request/multi/delete-multi-grade-configuration";
import { IMultiGradeConfigurationClient } from "../base/multi-grade-configuration-client";
import { ipcRenderer } from "electron";

@Injectable()
export class MultiGradeConfigurationElectronClient extends IMultiGradeConfigurationClient {
    constructor() { 
        super();
    }

    public updateMultiGradeConfiguration(request: UpdateMultiGradeConfigurationDto): Observable<void> {
        return from((window as any).electron.updateMultiGradeConfiguration(request)) as Observable<void>;
    }
        
    public createMultiGradeConfiguration(request: CreateMultiGradeConfigurationDto): Observable<void> {
        return from((window as any).electron.createMultiGradeConfiguration(request)) as Observable<void>;
    }

    public deleteMultiGradeConfiguration(request: DeleteMultiGradeConfigurationDto): Observable<void> {
        return from((window as any).electron.deleteMultiGradeConfiguration(request)) as Observable<void>;
    }
}
