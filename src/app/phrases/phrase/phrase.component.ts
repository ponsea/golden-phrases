import { Component, OnChanges, Input } from '@angular/core';

import { Phrase } from '../phrase';
import { PhraseConversionService } from '../phrase-conversion.service';

@Component({
  selector: 'gp-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss']
})
export class PhraseComponent implements OnChanges {
  @Input() phrase: Phrase;
  phraseJa: string;
  phraseEn: string;
  answer: string;
  meanings: string[];
  explanations: string[];

  constructor(private pcs: PhraseConversionService) { }

  ngOnChanges() {
    this.answer = this.phrase.answer;
    this.phraseJa = this.pcs.highlight(this.phrase.phraseJa);
    this.phraseEn = this.pcs.embedAnswer(this.phrase.phraseEn, this.answer);
    this.meanings = this.pcs.splitByBadge(this.phrase.meanings)
      .map(v => this.pcs.convertBadge(v));
    this.explanations = this.pcs.splitByBadge(this.phrase.explanation)
      .map(v => this.pcs.convertBadge(v));
  }
}
