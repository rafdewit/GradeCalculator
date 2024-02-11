import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/modules/material/material.module';
import { ClassesPageComponent } from './components/classes-page/classes-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GradeCommonModule } from '../common-module/grade-common.module';
import { ClassConfigurationComponent } from './components/class-configuration/class-configuration.component';
import { ClassResolver } from 'src/services/resolvers/class.resolver';
import { PeriodPageComponent } from './components/period-page/period-page.component';
import { PeriodResolver } from 'src/services/resolvers/period.resolver';
import { ClassScoreComponent } from './components/class-score/class-score.component';
import { ClassScoreInfoResolver } from 'src/services/resolvers/class-score-info.resolver';
import { PercentagePipe } from 'src/services/pipes/percentage.pipe';

const routes: Routes = [
  { path: ':classId/score-overview', component: ClassScoreComponent, resolve: { classScore: ClassScoreInfoResolver } },
  { path: ':classId', component: ClassConfigurationComponent, resolve: { class: ClassResolver } },
  { path: ':classId/periods/:periodId', component: PeriodPageComponent, resolve: { class: ClassResolver, period: PeriodResolver } },
  { path: '**', component: ClassesPageComponent },
];

@NgModule({
  declarations: [
    ClassesPageComponent,
    ClassConfigurationComponent,
    PeriodPageComponent,
    ClassScoreComponent,
    PercentagePipe
  ],
  imports: [
    MaterialModule,
    CommonModule,
    GradeCommonModule,
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class ClassesModule { }
