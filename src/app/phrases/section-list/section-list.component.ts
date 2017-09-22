import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../core/auth.service';
import { ScoreService } from '../../core/score.service';
import { ScoreHeading } from '../../core/score';

@Component({
  selector: 'gp-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent implements OnInit {
  @Input() sections: {id: number};
  currentSectionId: number;
  userLoginedIn: Observable<boolean>;
  private scoreHeadings: ScoreHeading[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private scoreService: ScoreService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => this.currentSectionId = +params.get("section_id"));

    if (this.authService.userLoginedIn) {
      this.userLoginedIn = this.authService.userLoginedInObservation;
      this.scoreService.getScoreHeadings()
        .subscribe(sh => this.scoreHeadings = sh);
    }
  }

  updateUrl(event: NgbPanelChangeEvent) {
    if (event.nextState === true) {
      this.router.navigate(['/phrases', { section_id: event.panelId }], { replaceUrl: true });
    }
  }

  getScoreHeading(sectionId: number){
    if (!this.scoreHeadings) return null;
    return this.scoreHeadings.find(v => v.sectionId == sectionId);
  }
}
