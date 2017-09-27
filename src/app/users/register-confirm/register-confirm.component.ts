import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { AuthService } from '../../core/auth.service';
import { AuthData } from '../../core/auth-data';
import { User } from '../../core/user';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss']
})
export class RegisterConfirmComponent implements OnInit {
  isConfirmed = false;
  newUser: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    let params = this.route.snapshot.queryParams;
    if (!this.validParams(params)) {
      this.router.navigate(['/']);
      return;
    }
    if (params['account_confirmation_success'] === 'false') {
      alert('メールアドレスの認証に失敗しました。再度やり直してください。');
      return;
    }

    let authData = new AuthData();
    authData.accessToken = params['token'];
    authData.client = params['client_id'];
    authData.uid = params['uid'];
    authData.expiry = params['expiry'];

    this.authService.updateAuthData(authData);
    this.authService.validateToken()
      .subscribe(user => {
        this.newUser = user;
        this.isConfirmed = true;
      }, err => {
        alert('エラーが発生しました。しばらくの後、再度やり直してください');
        console.error(err);
    });
  }

  private validParams(params: Params) {
    if (params['token'] &&
        params['client_id'] &&
        params['uid'] &&
        params['expiry'] &&
        params['account_confirmation_success']) {
      return true;
    }
    return false;
  }
}
