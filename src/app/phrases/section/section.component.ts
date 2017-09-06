import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Phrase } from '../../core/phrase';
import { PhrasesService } from '../../core/phrases.service';

@Component({
  selector: 'gp-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() sectionId: number;
  phrases: Phrase[] = [];
  phraseIdx = 0;

  constructor(
    private phrasesService: PhrasesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.phrasesService.getSection(this.sectionId)
      .subscribe(phrases => this.phrases = phrases,
                 err => alert(err.message));

    this.route.paramMap
      .subscribe(params => {
        let i = params.get("index"); // maybe "1"-"50" or "" or null
        this.phraseIdx = i ? +i - 1 : 0;
      });
  }

  updateUrl(i: number) {
    let params = { section_id: this.sectionId, index: i + 1 };
    this.router.navigate(['/phrases', params], { replaceUrl: true });
  }
}
