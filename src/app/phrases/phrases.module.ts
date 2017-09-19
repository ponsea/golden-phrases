import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PhrasesRoutingModule } from './phrases-routing.module';
import { PhrasesComponent } from './phrases.component';
import { SectionListComponent } from './section-list/section-list.component';
import { SectionComponent } from './section/section.component';
import { ScoresComponent } from './scores/scores.component';

@NgModule({
  imports: [
    SharedModule,
    PhrasesRoutingModule,
  ],
  declarations: [
    PhrasesComponent,
    SectionListComponent,
    SectionComponent,
    ScoresComponent,
  ],
  providers: [
  ]
})
export class PhrasesModule { }
