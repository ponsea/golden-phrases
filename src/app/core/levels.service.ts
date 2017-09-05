import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Level, LevelsResponse } from './level';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AppInfoService } from './app-info.service';

@Injectable()
export class LevelsService {
  private levelsCach: BehaviorSubject<Level[]> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private appInfo: AppInfoService
  ) { }

  getLevels(): Observable<Level[]> {
    if (this.levelsCach.getValue() == null) {
      let url = this.appInfo.apiUrl + "/levels"
      return this.http.get<LevelsResponse>(url)
        .map(response => response.data as Level[])
        .do(levels => this.levelsCach.next(levels));
    } else {
      return this.levelsCach;
    }
  }
}
