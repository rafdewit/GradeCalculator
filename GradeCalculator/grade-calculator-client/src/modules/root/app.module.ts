import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/modules/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'classes-page', loadChildren: () => import('../classes/classes.module').then(m => m.ClassesModule) },
  { path: '**', redirectTo: 'classes-page' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
