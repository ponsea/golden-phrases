import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { RouterModule }             from '@angular/router';

import { PhraseComponent } from './phrase/phrase.component';
import { PhrasesViewerComponent } from './phrases-viewer/phrases-viewer.component';
import { SectionSoundComponent } from './section-sound/section-sound.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule
  ],
  declarations: [
    PhraseComponent,
    PhrasesViewerComponent,
    SectionSoundComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    PhraseComponent,
    PhrasesViewerComponent,
    SectionSoundComponent,
  ]
})
export class SharedModule { }
