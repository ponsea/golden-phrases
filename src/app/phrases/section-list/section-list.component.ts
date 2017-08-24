import { Component, OnInit, Input } from '@angular/core';

import { PhrasesService } from '../phrases.service';
import { Phrase } from '../phrase';

@Component({
  selector: 'gp-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent implements OnInit {
  @Input() level: number;
  sectionRange: number[];

  constructor(private phrasesService: PhrasesService) { }

  ngOnInit() {
    this.sectionRange = this.phrasesService.getSectionRange(this.level);
  }
}
