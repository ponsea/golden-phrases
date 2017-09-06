import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { LevelsService } from '../core/levels.service';
import { Level } from '../core/level';

@Component({
  selector: 'gp-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.scss']
})
export class PhrasesComponent implements OnInit {
  levels: Level[];
  currentLevelId: number;
  private currentSectionId: number;

  constructor(
    private levelsService: LevelsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.levelsService.getLevels()
      .subscribe(levels => {
        this.levels = levels;
        this.setCurrentLevelId();
      });
    this.route.paramMap
      .subscribe(params => {
        this.currentSectionId = +params.get('section_id');
        this.setCurrentLevelId();
      });
  }

  setCurrentLevelId() {
    if (this.currentSectionId === null || !this.levels) {
      this.currentLevelId = null;
      return;
    }

    for (let level of this.levels) {
      for (let section of level.sections) {
        if (section.id == this.currentSectionId) {
          this.currentLevelId = level.id;
          return;
        }
      }
    }
  }
}
