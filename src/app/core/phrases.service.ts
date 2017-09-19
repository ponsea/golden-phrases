import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppInfoService } from '../core/app-info.service';
import { Phrase, PhrasesResponse } from './phrase';

@Injectable()
export class PhrasesService {

  constructor(
    private appInfo: AppInfoService,
    private httpClient: HttpClient
  ) { }

  getSection(sectionId: number): Observable<Phrase[]> {
    let url = this.appInfo.apiUrl + "/phrases";
    let params = new HttpParams().set("section_id", sectionId.toString());
    return this.httpClient.get<PhrasesResponse>(url, {params})
      .map((res) => res.data as Phrase[]);
  }
}
