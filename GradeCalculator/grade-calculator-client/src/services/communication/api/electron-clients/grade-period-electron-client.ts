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
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('updateGradePeriod', request);
        return of();
    }
    
    public copyGradePeriod(request: CopyGradePeriodDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('copyGradePeriod', request);
        return of();
    }
    
    public createGradePeriod(request: CreateGradePeriodDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('createGradePeriod', request);
        return of();
    }

    public deleteGradePeriod(request: DeleteGradePeriodDto): Observable<void> {
        const ipcRenderer  = window.require('electron').ipcRenderer;
        ipcRenderer.send('deleteGradePeriod', request);
        return of();
    }
}
