import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  readonly title = "TOEIC対策 金のフレーズ";
  readonly apiUrl = "http://localhost:3000/v1";  // will change
}
