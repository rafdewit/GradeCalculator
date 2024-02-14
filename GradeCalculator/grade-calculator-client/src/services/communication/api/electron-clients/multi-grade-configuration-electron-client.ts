import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
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
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('updateMultiGradeConfiguration', request);
        return of();
    }
        
    public createMultiGradeConfiguration(request: CreateMultiGradeConfigurationDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('createMultiGradeConfiguration', request);
        return of();
    }

    public deleteMultiGradeConfiguration(request: DeleteMultiGradeConfigurationDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('deleteMultiGradeConfiguration', request);
        return of();
    }
}
