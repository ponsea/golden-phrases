import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PhrasesRoutingModule } from './phrases-routing.module';
import { PhrasesComponent } from './phrases.component';
import { SectionListComponent } from './section-list/section-list.component';
import { PhrasesService } from './phrases.service';
import { PhraseConversionService } from './phrase-conversion.service';
import { SectionComponent } from './section/section.component';
import { PhraseComponent } from './phrase/phrase.component';

@NgModule({
  imports: [
    SharedModule,
    PhrasesRoutingModule,
  ],
  declarations: [
    PhrasesComponent,
    SectionListComponent,
    SectionComponent,
    PhraseComponent
  ],
  providers: [
    PhrasesService,
    PhraseConversionService
  ]
})
export class PhrasesModule { }
