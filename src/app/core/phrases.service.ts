import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppInfoService } from '../core/app-info.service';
import { Phrase, PhrasesResponse } from './phrase';

@Injectable()
export class PhrasesService {
  private sectionRanges = [
    [1, 2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18],
    [19, 20]
  ];

  constructor(
    private appInfo: AppInfoService,
    private httpClient: HttpClient
  ) { }

  getSectionRange(level: number): number[] {
    return this.sectionRanges[level - 1];
  }

  getSection(sectionId: number): Observable<Phrase[]> {
    let url = this.appInfo.apiUrl + "/phrases";
    let params = new HttpParams().set("section_id", sectionId.toString());
    return this.httpClient.get<PhrasesResponse>(url, {params})
      .map((res) => res.data as Phrase[]);
  }

  shuffle(phrases: Phrase[]): Phrase[] {
    for(var i = phrases.length - 1; i > 0; i--){
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = phrases[i];
      phrases[i] = phrases[r];
      phrases[r] = tmp;
    }
    return phrases;
  }
}
