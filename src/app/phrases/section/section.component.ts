import { Component, OnInit, Input, HostListener } from '@angular/core';

import { Phrase } from '../phrase';
import { PhrasesService } from '../phrases.service';

@Component({
  selector: 'gp-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() section: number;
  phrases: Phrase[] = [];
  phraseIdx = 0;

  constructor(private phrasesService: PhrasesService) { }

  ngOnInit() {
    this.phrasesService.getSection(this.section)
      .subscribe(phrases => this.phrases = phrases,
                 err => alert(err.message));
  }

  get currentPhrase() { return this.phrases[this.phraseIdx]; }

  next() {
    if (this.phraseIdx < this.phrases.length - 1) this.phraseIdx++;
  }

  prev() {
    if (this.phraseIdx > 0) this.phraseIdx--;
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    const KEY_LEFT = 37, KEY_RIGHT = 39;
    if (event.keyCode === KEY_LEFT) this.prev();
    if (event.keyCode === KEY_RIGHT) this.next();
  }
}
