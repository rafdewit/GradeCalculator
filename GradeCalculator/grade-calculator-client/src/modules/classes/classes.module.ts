import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/modules/material/material.module';
import { ClassesPageComponent } from './components/classes-page/classes-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GradeCommonModule } from '../common-module/grade-common.module';
import { ClassConfigurationComponent } from './components/class-configuration/class-configuration.component';
import { ClassResolver } from 'src/services/resolvers/class.resolver';

const routes: Routes = [
  { path: ':classId', component: ClassConfigurationComponent, resolve: { class: ClassResolver } },
  { path: '**', component: ClassesPageComponent },
];

@NgModule({
  declarations: [
    ClassesPageComponent,
    ClassConfigurationComponent
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
