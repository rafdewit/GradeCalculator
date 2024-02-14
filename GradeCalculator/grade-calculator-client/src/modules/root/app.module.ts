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
import { MultiGradeConfigurationWebClient } from 'src/services/communication/api/web-api-clients/multi-grade-configuration-web-client';
import { MultiGradeConfigurationElectronClient } from 'src/services/communication/api/electron-clients/multi-grade-configuration-electron-client';
import { SingleGradeConfigurationWebClient } from 'src/services/communication/api/web-api-clients/single-grade-configuration-web-client';
import { SingleGradeConfigurationElectronClient } from 'src/services/communication/api/electron-clients/single-grade-configuration-electron-client';
import { SingleGradeWebClient } from 'src/services/communication/api/web-api-clients/single-grade-web-client';
import { SingleGradeElectronClient } from 'src/services/communication/api/electron-clients/single-grade-electron-client';
import { StudentWebClient } from 'src/services/communication/api/web-api-clients/student-web-client';
import { StudentElectronClient } from 'src/services/communication/api/electron-clients/student-electron-client';
import { StudentCollectionWebClient } from 'src/services/communication/api/web-api-clients/student-collection-web-client';
import { StudentCollectionElectronClient } from 'src/services/communication/api/electron-clients/student-collection-electron-client';

const routes: Routes = [
  { path: 'classes', loadChildren: () => import('../classes/classes.module').then(m => m.ClassesModule) },
  { path: '**', redirectTo: 'classes' }
];

export const GradePeriod_WebClient = new InjectionToken<string>('GradePeriodWebClient');
export const GradePeriod_ElectronClient = new InjectionToken<string>('GradePeriodElectronClient');

export const MultiGradeConfiguration_WebClient = new InjectionToken<string>('MultiGradeConfiguration_WebClient');
export const MultiGradeConfiguration_ElectronClient = new InjectionToken<string>('MultiGradeConfiguration_ElectronClient');

export const SingleGradeConfiguration_WebClient = new InjectionToken<string>('SingleGradeConfiguration_WebClient');
export const SingleGradeConfiguration_ElectronClient = new InjectionToken<string>('SingleGradeConfiguration_ElectronClient');

export const SingleGrade_WebClient = new InjectionToken<string>('SingleGrade_WebClient');
export const SingleGrade_ElectronClient = new InjectionToken<string>('SingleGrade_ElectronClient');

export const Student_WebClient = new InjectionToken<string>('Student_WebClient');
export const Student_ElectronClient = new InjectionToken<string>('Student_ElectronClient');

export const StudentCollection_WebClient = new InjectionToken<string>('StudentCollection_WebClient');
export const StudentCollection_ElectronClient = new InjectionToken<string>('StudentCollection_ElectronClient');

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
    { provide: GradePeriod_WebClient, useClass: GradePeriodWebClient },
    { provide: GradePeriod_ElectronClient, useClass: GradePeriodElectronClient },
    { provide: IGradePeriodClient, useFactory: createGradePeriodClient, deps: [Injector] },

    { provide: MultiGradeConfiguration_WebClient, useClass: MultiGradeConfigurationWebClient },
    { provide: MultiGradeConfiguration_ElectronClient, useClass: MultiGradeConfigurationElectronClient },
    { provide: IGradePeriodClient, useFactory: createMultiGradeConfigurationClient, deps: [Injector] },

    { provide: SingleGradeConfiguration_WebClient, useClass: SingleGradeConfigurationWebClient },
    { provide: SingleGradeConfiguration_ElectronClient, useClass: SingleGradeConfigurationElectronClient },
    { provide: IGradePeriodClient, useFactory: createSingleGradeConfigurationClient, deps: [Injector] },

    { provide: SingleGrade_WebClient, useClass: SingleGradeWebClient },
    { provide: SingleGrade_ElectronClient, useClass: SingleGradeElectronClient },
    { provide: IGradePeriodClient, useFactory: createSingleGradeClient, deps: [Injector] },

    { provide: Student_WebClient, useClass: StudentWebClient },
    { provide: Student_ElectronClient, useClass: StudentElectronClient },
    { provide: IGradePeriodClient, useFactory: createStudentClient, deps: [Injector] },

    { provide: StudentCollection_WebClient, useClass: StudentCollectionWebClient },
    { provide: StudentCollection_ElectronClient, useClass: StudentCollectionElectronClient },
    { provide: IGradePeriodClient, useFactory: createStudentCollectionClient, deps: [Injector] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createGradePeriodClient(injector: Injector) {
  return environment.electron ? injector.get(GradePeriod_WebClient) : injector.get(GradePeriod_ElectronClient);
}

export function createMultiGradeConfigurationClient(injector: Injector) {
  return environment.electron ? injector.get(MultiGradeConfiguration_WebClient) : injector.get(MultiGradeConfiguration_ElectronClient);
}

export function createSingleGradeConfigurationClient(injector: Injector) {
  return environment.electron ? injector.get(SingleGradeConfiguration_WebClient) : injector.get(SingleGradeConfiguration_ElectronClient);
}

export function createSingleGradeClient(injector: Injector) {
  return environment.electron ? injector.get(SingleGrade_WebClient) : injector.get(SingleGradeConfiguration_ElectronClient);
}

export function createStudentClient(injector: Injector) {
  return environment.electron ? injector.get(Student_WebClient) : injector.get(Student_ElectronClient);
}

export function createStudentCollectionClient(injector: Injector) {
  return environment.electron ? injector.get(StudentCollection_WebClient) : injector.get(StudentCollection_ElectronClient);
}