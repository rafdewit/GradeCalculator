import { InjectionToken, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/modules/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GradeCommonModule } from '../common-module/grade-common.module';
import { GradePeriodWebClient } from 'src/services/communication/api/web-api-clients/grade-period-web-client';
import { IGradePeriodClient } from 'src/services/communication/api/base/grade-period-client.interface';
import { GradePeriodElectronClient } from 'src/services/communication/api/electron-clients/grade-period-electron-client';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  { path: 'classes', loadChildren: () => import('../classes/classes.module').then(m => m.ClassesModule) },
  { path: '**', redirectTo: 'classes' }
];

export const GradePeriod_WebClient = new InjectionToken<string>('GradePeriodWebClient');
export const GradePeriod_ElectronClient = new InjectionToken<string>('GradePeriodElectronClient');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GradeCommonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CommonModule
  ],
  providers: [
    { provide: GradePeriod_WebClient, useClass: GradePeriodWebClient}, 
    { provide: GradePeriod_ElectronClient, useClass: GradePeriodElectronClient},
    { provide: IGradePeriodClient, useFactory: createService, deps: [Injector] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createService(injector: Injector) {
  return environment.electron ? injector.get(GradePeriod_WebClient) : injector.get(GradePeriod_ElectronClient);
}
