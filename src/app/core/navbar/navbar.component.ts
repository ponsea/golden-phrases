import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AppInfoService } from '../app-info.service';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'gp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  title: string;
  userLoginedIn: boolean;
  currentUser: User;

  constructor(
    private appInfo: AppInfoService,
    private authService: AuthService
  ) { }

  private authSub: Subscription;
  private loginedInSub: Subscription;
  ngOnInit() {
    this.title = this.appInfo.title;
    this.authSub = this.authService.userLoginedInObservation
      .subscribe(loginedIn => this.userLoginedIn = loginedIn);
    this.loginedInSub = this.authService.currentUserObservation
      .subscribe(user => this.currentUser = user);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.loginedInSub.unsubscribe();
  }

  logout() {
    this.authService.signOut()
      .subscribe(undefined, err => {
        alert('エラーが発生しました。しばらくの後、再度お試しください。');
      });
  }
}
