import { Component, OnInit, Input, HostListener } from '@angular/core';

import { Phrase } from '../../core/phrase';
import { PhrasesService } from '../../core/phrases.service';

@Component({
  selector: 'gp-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() section: number;
  phrases: Phrase[] = [];

  constructor(private phrasesService: PhrasesService) { }

  ngOnInit() {
    this.phrasesService.getSection(this.section)
      .subscribe(phrases => this.phrases = phrases,
                 err => alert(err.message));
  }
}
