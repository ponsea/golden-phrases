import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PhrasesRoutingModule } from './phrases-routing.module';
import { PhrasesComponent } from './phrases.component';

@NgModule({
  imports: [
    SharedModule,
    PhrasesRoutingModule,
  ],
  declarations: [PhrasesComponent]
})
export class PhrasesModule { }
