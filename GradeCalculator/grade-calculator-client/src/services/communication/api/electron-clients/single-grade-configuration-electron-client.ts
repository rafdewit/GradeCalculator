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
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('updateSingleGradeConfiguration', request);
        return of();
    }
        
    public createSingleGradeConfiguration(request: CreateSingleGradeConfigurationDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('createSingleGradeConfiguration', request);
        return of();
    }

    public deleteSingleGradeConfiguration(request: DeleteSingleGradeConfigurationDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('deleteSingleGradeConfiguration', request);
        return of();
    }
}
