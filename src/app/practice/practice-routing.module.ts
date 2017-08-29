import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PracticeComponent } from './practice.component';

const practiceRoutes: Routes = [
  { path: 'practice/:id', component: PracticeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(practiceRoutes)],
  exports: [RouterModule]
})
export class PracticeRoutingModule {}
