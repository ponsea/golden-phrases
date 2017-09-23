import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AppInfoService } from './app-info.service';
import { AuthService } from './auth.service';
import { Score, ScoreHeading } from './score';

@Injectable()
export class ScoreService {
  private scoreHeadings: BehaviorSubject<ScoreHeading[]> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private appInfo: AppInfoService,
    private authService: AuthService) {
    authService.currentUserObservation
      .subscribe(() => this.scoreHeadings.next(null));
  }

  getScoreHeadings(): Observable<ScoreHeading[]> {
    if (this.scoreHeadings.getValue()) return this.scoreHeadings;

    let url = this.appInfo.apiUrl + "/scores";
    let params = new HttpParams().set('max', 'true');
    return this.http.get<{data: ScoreHeading[]}>(url, {params, withCredentials: true})
      .map(response => response.data)
      .do(scoreHeadings => this.scoreHeadings.next(scoreHeadings));
  }

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

  getRecentScore(sectionId: number): Observable<Score> {
    let url = this.appInfo.apiUrl + '/scores';
    let params = new HttpParams().set('section_id', sectionId.toString())
                                 .set('recent', 'true');
    return this.http.get<{data: Score}>(url, {params, withCredentials: true})
      .map(res => res && res.data);
  }
}
