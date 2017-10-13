import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DescriptionComponent } from './description/description.component';
import { NotFoundComponent } from './not-found.component';


const appRoutes: Routes = [
  { path: '',   redirectTo: '/phrases', pathMatch: 'full' },
  { path: 'description', component: DescriptionComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
