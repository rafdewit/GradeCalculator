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
import { StudentScoreComponent } from './components/student-score/student-score.component';
import { StudentScoreInfoResolver } from 'src/services/resolvers/student-score-info.resolver';
import { SingleScoreComponent } from './components/student-score/single-score/single-score.component';
import { MultiScoreComponent } from './components/student-score/multi-score/multi-score.component';
import { PercentageToHundredPipe } from 'src/services/pipes/percentage-to-hundred.pipe';
import { PercentageRepresentationComponent } from './components/student-score/percentage-representation/percentage-representation.component';
import { ProgressBarColor } from 'src/services/directives/progress-bar-color';
import { PercentageToColorPipe } from 'src/services/pipes/percentage-to-color.pipe';
import { MarginLeftPipe } from 'src/services/pipes/margin-left.pipe';
import { GradeCategoryPipe } from 'src/services/pipes/grade-category.pipe';
import { BlobColorBorderPipe } from 'src/services/pipes/blob-color-border.pipe';
import { CreateClassDialogComponent } from './components/classes-page/create-class-dialog/create-class-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: ':classId/score-overview', component: ClassScoreComponent, resolve: { classScore: ClassScoreInfoResolver } },
  { path: ':classId/score-overview/:studentId', component: StudentScoreComponent, resolve: { classStudentInfo: StudentScoreInfoResolver } },
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
    PercentagePipe,
    PercentageToHundredPipe,
    PercentageToColorPipe,
    MarginLeftPipe,
    GradeCategoryPipe,
    StudentScoreComponent,
    MultiScoreComponent,
    SingleScoreComponent,
    PercentageRepresentationComponent,
    ProgressBarColor,
    CreateClassDialogComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    GradeCommonModule,
    GradeCommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class ClassesModule { }
