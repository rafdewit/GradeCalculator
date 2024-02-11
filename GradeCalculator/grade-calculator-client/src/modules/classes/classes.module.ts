import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/modules/material/material.module';
import { ClassesPageComponent } from './components/classes-page/classes-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GradeCommonModule } from '../common-module/grade-common.module';

const routes: Routes = [
  { path: '**', component: ClassesPageComponent },
];

@NgModule({
  declarations: [
    ClassesPageComponent
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
