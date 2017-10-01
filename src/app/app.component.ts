import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from './core/auth.service';
import { AppInfoService } from './core/app-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private title: Title,
    private appInfo: AppInfoService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.appInfo.title);
    this.initializeToken();
  }

  private initializeToken() {
    if (this.authService.userLoginedIn) {
      this.authService.validateToken()
        .subscribe(undefined, err => {
          if (err.status === 401) {
            this.authService.clearCredentials();
          }
        });
    }
  }
}
