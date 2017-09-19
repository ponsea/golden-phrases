import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppInfoService } from './app-info.service';
import { Score } from './score';

@Injectable()
export class ScoreService {

  constructor(
    private http: HttpClient,
    private appInfo: AppInfoService
  ) { }

  getSectionScores(sectionId: number): Observable<Score[]> {
    let url = this.appInfo.apiUrl + '/scores';
    let params = new HttpParams().set('section_id', sectionId.toString());
    return this.http.get<{data: any[]}>(url, {params, withCredentials: true})
      .map(res => {
        let scores = res.data;
        // convert type of createdAt to Date
        scores.forEach(v => v.createdAt = new Date(v.createdAt));
        return scores as Score[];
      });
  }
}
