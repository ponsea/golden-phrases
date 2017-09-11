import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PracticeComponent } from './practice.component';
import { AuthGuard } from '../core/auth-guard.service';

const practiceRoutes: Routes = [
  { path: 'practice/:id', component: PracticeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(practiceRoutes)],
  exports: [RouterModule]
})
export class PracticeRoutingModule {}
