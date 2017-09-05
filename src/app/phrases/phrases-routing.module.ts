import { NgModule }            from '@angular/core';
import { RouterModule, Routes }        from '@angular/router';

import { PhrasesComponent } from './phrases.component';

const phrasesRoutes: Routes = [
  { path: 'phrases/:id', component: PhrasesComponent },
  { path: 'phrases', component: PhrasesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(phrasesRoutes)],
  exports: [RouterModule]
})
export class PhrasesRoutingModule {}
