import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PhrasesRoutingModule } from './phrases-routing.module';
import { PhrasesComponent } from './phrases.component';
import { SectionListComponent } from './section-list/section-list.component';
import { PhrasesService } from './phrases.service';

@NgModule({
  imports: [
    SharedModule,
    PhrasesRoutingModule,
  ],
  declarations: [
    PhrasesComponent,
    SectionListComponent
  ],
  providers: [
    PhrasesService
  ]
})
export class PhrasesModule { }
