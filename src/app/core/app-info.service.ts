import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  readonly title = "TOEIC対策 金のフレーズ";
  readonly apiBase = "http://localhost:3000";  // will change
  readonly apiPath = "/v1"
  readonly apiUrl = this.apiBase + this.apiPath;
  readonly author = "ponsea.com";
}
