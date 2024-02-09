import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'classes-page', loadChildren: () => import('../classes/classes.module').then(m => m.ClassesModule) },
  { path: '**', redirectTo: 'classes-page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
