import { Component,
         OnInit,
         Input,
         ViewChild,
         TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PhraseConversionService } from '../../core/phrase-conversion.service';
import { ScoreService } from '../../core/score.service';
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
  phraseIdx = 0;
  isFailed = false;
  isSaved = false;

  constructor(
    private pcs: PhraseConversionService,
    private modalService: NgbModal,
    private scoreService: ScoreService
  ) { }

  get currentPhrase() { return this.phrases[this.phraseIdx]; }

  scoreAt(id: number): boolean {
    return this.scores.find(s => s[0] === id)[1];
  }

  ngOnInit() {
    this.phrases.sort((a, b) => a.number - b.number);
    this.sectionId = this.phrases[0].sectionId;
    this.saveScore();
  }

  convert(subject: string) {
    return this.pcs.convertBadge(subject);
  }

  openModal(i: number) {
    this.phraseIdx = i;
    this.modalService.open(this.phrasesModal);
  }

  saveScore() {
    if (this.isSaved) return;
    this.isFailed = false;
    this.scoreService.postScore(this.sectionId, this.scores)
      .subscribe(
        res => this.isSaved = true,
        err => this.isFailed = true
      );
  }
}
