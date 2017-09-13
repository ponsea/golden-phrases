import { Component, OnInit } from '@angular/core';

import { AppInfoService } from '../app-info.service';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'gp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title: string;
  userLoginedIn: boolean;
  currentUser: User;

  constructor(
    private appInfo: AppInfoService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.title = this.appInfo.title;
    this.authService.userLoginedInObservation
      .subscribe(loginedIn => this.userLoginedIn = loginedIn);
    this.authService.currentUserObservation
      .subscribe(user => this.currentUser = user);
  }

  logout() {
    this.authService.signOut()
      .subscribe(undefined, err => {
        alert('エラーが発生しました。しばらくの後、再度お試しください。');
      });
  }
}
