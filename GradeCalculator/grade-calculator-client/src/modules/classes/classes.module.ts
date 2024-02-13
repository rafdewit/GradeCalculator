import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/modules/material/material.module';
import { ClassesPageComponent } from './components/classes-page/classes-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GradeCommonModule } from '../common-module/grade-common.module';
import { ClassConfigurationComponent } from './components/class-configuration/class-configuration.component';
import { PeriodPageComponent } from './components/period-page/period-page.component';
import { ClassScoreComponent } from './components/class-score/class-score.component';
import { PercentagePipe } from 'src/services/pipes/percentage.pipe';
import { StudentScoreComponent } from './components/student-score/student-score.component';
import { SingleScoreComponent } from './components/student-score/single-score/single-score.component';
import { MultiScoreComponent } from './components/student-score/multi-score/multi-score.component';
import { PercentageToHundredPipe } from 'src/services/pipes/percentage-to-hundred.pipe';
import { PercentageRepresentationComponent } from './components/common/percentage-representation/percentage-representation.component';
import { ProgressBarColor } from 'src/services/directives/progress-bar-color';
import { PercentageToColorPipe } from 'src/services/pipes/percentage-to-color.pipe';
import { MarginLeftPipe } from 'src/services/pipes/margin-left.pipe';
import { GradeCategoryPipe } from 'src/services/pipes/grade-category.pipe';
import { CreateClassDialogComponent } from './components/classes-page/create-class-dialog/create-class-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePeriodDialogComponent } from './components/class-configuration/create-period-dialog/create-period-dialog.component';
import { CreateStudentDialogComponent } from './components/class-configuration/create-student-dialog/create-student-dialog.component';
import { ClassScoreTableComponent } from './components/class-score-table/class-score-table.component';
import { ScoreRepresentationComponent } from './components/common/score-representation/score-representation.component';

const routes: Routes = [
  { path: ':classId/score-overview', component: ClassScoreComponent },
  { path: ':classId/score-table', component: ClassScoreTableComponent },
  { path: ':classId/score-overview/:studentId', component: StudentScoreComponent },
  { path: ':classId', component: ClassConfigurationComponent },
  { path: ':classId/periods/:periodId', component: PeriodPageComponent },
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
    CreateClassDialogComponent,
    CreatePeriodDialogComponent,
    CreateStudentDialogComponent,
    ClassScoreTableComponent,
    ScoreRepresentationComponent
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
