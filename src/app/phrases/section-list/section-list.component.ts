import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { PhrasesService } from '../../core/phrases.service';
import { Phrase } from '../../core/phrase';

@Component({
  selector: 'gp-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent implements OnInit {
  @Input() sections: {id: number};
  currentSectionId: number;

  constructor(
    private phrasesService: PhrasesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => this.currentSectionId = +params.get("id"));
  }

  updateUrl(event: NgbPanelChangeEvent) {
    if (event.nextState === true) {
      this.router.navigate(['/phrases', event.panelId], { replaceUrl: true });
    }
  }
}
