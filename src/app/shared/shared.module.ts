import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { RouterModule }             from '@angular/router';

import { PhraseComponent } from './phrase/phrase.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule
   ],
  declarations: [
    PhraseComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    PhraseComponent
  ]
})
export class SharedModule { }
