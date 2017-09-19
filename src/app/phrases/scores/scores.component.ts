import { Component, OnInit, Input } from '@angular/core';

import { ScoreService } from '../../core/score.service';
import { Phrase } from '../../core/phrase';
import { Score } from '../../core/score';

@Component({
  selector: 'gp-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  readonly NUM_OF_DISP = 3;
  scores: Score[];
  @Input() sectionId: number;
  @Input() phrases: Phrase[];
  isOpened = false;

  constructor(
    private scoreService: ScoreService
  ) { }

  get dispScores() {
    if (this.isOpened) return this.scores;
    return this.scores.slice(0, this.NUM_OF_DISP);
  }

  ngOnInit() {
    this.scoreService.getSectionScores(this.sectionId)
      .subscribe(scores => { // given in order of new
        this.scores = scores;
      });
  }

  private maxScore: Score;
  chooseType(score: Score) {
    if (!this.maxScore) {
      this.maxScore = this.scores
        .reduce((a, b) => a.correctCount >= b.correctCount ? a : b);
    }

    if (score.id == this.maxScore.id) return 'danger';
    return 'primary';
  }
}
