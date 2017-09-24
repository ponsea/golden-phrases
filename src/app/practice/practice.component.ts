import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { AuthService } from '../core/auth.service';
import { PhrasesService } from '../core/phrases.service';
import { Phrase } from '../core/phrase';

@Component({
  selector: 'gp-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit, OnDestroy {
  sectionId: number;
  phrases: Phrase[];
  scores: [number, boolean][];
  phraseIdx: number;
  isEnd: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private phrasesService: PhrasesService,
    private authService: AuthService
  ) { }

  private loginedInSub: Subscription;
  ngOnInit() {
    this.route.paramMap
      .do((params) => {
        this.phraseIdx = 0;
        this.scores = [];
        this.sectionId = +params.get('id');
        this.isEnd = false;
      })
      .switchMap(
        params => this.phrasesService.getSection(this.sectionId)
      )
      .subscribe(
        phrases => this.phrases = this.shuffle(phrases),
        error => alert(error.message)
      );

    // navigate to the home if a user logout
    this.loginedInSub = this.authService.userLoginedInObservation
      .subscribe(logined => logined || this.router.navigate(['/']));
  }

  ngOnDestroy() {
    this.loginedInSub.unsubscribe();
  }



  get currentPhrase() { return this.phrases[this.phraseIdx]; }

  next(decision: [number, boolean]) {
    this.scores.push(decision);
    if (this.phraseIdx < this.phrases.length - 1) {
      this.phraseIdx++;
    } else {
      this.isEnd = true;
    }
  }

  // only for development
  end() {
    let scores: [number, boolean][] = [];
    for (let i = 0; i < this.phrases.length - 1; i++)
      scores.push([this.phrases[i].id, Math.random() > 0.5]);
    this.scores = scores;
    this.phraseIdx = this.phrases.length - 1
    this.next([this.phrases[this.phrases.length - 1].number, Math.random() > 0.5]);
  }

  private shuffle(phrases: Phrase[]): Phrase[] {
    for(let i = phrases.length - 1; i > 0; i--){
      let r = Math.floor(Math.random() * (i + 1));
      [phrases[i], phrases[r]] = [phrases[r], phrases[i]];
    }
    return phrases;
  }
}
