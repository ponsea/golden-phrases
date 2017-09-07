import { Component,
         OnInit,
         Input,
         ViewChild,
         TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PhraseConversionService } from '../../core/phrase-conversion.service';
import { Phrase } from '../../core/phrase';

@Component({
  selector: 'gp-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @ViewChild('phrasesModal') phrasesModal: TemplateRef<any>;
  @Input() phrases: Phrase[];
  @Input() scores: [number, boolean][];
  sectionId: number;
  soundUrl: string;
  phraseIdx = 0;

  constructor(
    private pcs: PhraseConversionService,
    private modalService: NgbModal
  ) { }

  get currentPhrase() { return this.phrases[this.phraseIdx]; }

  scoreAt(id: number): boolean {
    return this.scores.find(s => s[0] === id)[1];
  }

  ngOnInit() {
    this.phrases.sort((a, b) => a.number - b.number);
    this.sectionId = this.phrases[0].sectionId;
    let num = ('0' + this.sectionId).slice(-2); // zero padding
    this.soundUrl = `assets/sounds/sections/section${num}.mp3`;
    // TODO: saving scores
  }

  convert(subject: string) {
    return this.pcs.convertBadge(subject);
  }

  openModal(i: number) {
    this.phraseIdx = i;
    this.modalService.open(this.phrasesModal);
  }
}
