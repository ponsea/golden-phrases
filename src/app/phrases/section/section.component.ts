import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Phrase } from '../../core/phrase';
import { Score } from '../../core/score';
import { ScoreService } from '../../core/score.service';
import { PhrasesService } from '../../core/phrases.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'gp-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() sectionId: number;
  phrases: Phrase[] = [];
  lastScore: Score;
  phraseIdx = 0;
  userLoginedIn: Observable<boolean>;

  constructor(
    private phrasesService: PhrasesService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private scoreService: ScoreService
  ) { }

  get wasIncorrect() {
    if (!this.lastScore) return false;
    let currentPhrase = this.phrases[this.phraseIdx];
    let scoreDetail = this.lastScore.scoreDetails
                      .find(v => v.phraseId == currentPhrase.id);
    return !scoreDetail.correct;
  }

  ngOnInit() {
    this.userLoginedIn = this.authService.userLoginedInObservation;
    this.phrasesService.getSection(this.sectionId)
      .subscribe(phrases => this.phrases = phrases,
                 err => alert(err.message));

    this.route.paramMap
      .subscribe(params => {
        let i = params.get("index"); // maybe "1"-"50" or "" or null
        this.phraseIdx = i ? +i - 1 : 0;
      });

    if (this.authService.userLoginedIn) {
      this.scoreService.getRecentScore(this.sectionId)
        .subscribe(score => this.lastScore = score);
    }
  }

  updateUrl(i: number) {
    let params = { section_id: this.sectionId, index: i + 1 };
    this.router.navigate(['/phrases', params], { replaceUrl: true });
  }

  goToLogin() {
    let params = { from: this.router.url };
    this.router.navigate(['/users/login', params]);
  }

  goToRegister() {
    this.router.navigate(['/users/register']);
  }
}
