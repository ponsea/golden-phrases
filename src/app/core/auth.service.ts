import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AppInfoService } from './app-info.service';
import { AuthData } from './auth-data';
import { User } from './user';

@Injectable()
export class AuthService {
  private _currentUser: User;
  private _authData: AuthData;

  constructor(
    private http: HttpClient,
    private appInfo: AppInfoService) {
    this._currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._authData =  JSON.parse(localStorage.getItem('authData'));
  }

  get currentUser() { return this._currentUser; }
  get authData() { return this._authData; }

  get userLoginedIn(): boolean {
    let authData = this.authData;
    if (authData && Date.now() < authData.expiry * 1000)
      return true;
    return false;
  }

  signIn(email: string, password: string): Observable<User> {
    let url = this.appInfo.apiUrl + '/auth/sign_in';
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let body = {email, password};
    return this.http.post<{data: User}>(url, body, {headers, observe: 'response'})
      .do(response => {
        console.log(response);
        this.updateAuthData(response.headers);
        this.updateCurrentUser(response.body.data);
      })
      .map(response => response.body.data);
  }

  validateToken(): Observable<User> {
    if (this.userLoginedIn) {
      let url = this.appInfo.apiUrl + '/auth/validate_token';
      let authData = this.authData;
      let headers = this.getAuthHeaders();
      return this.http.get<{data: User}>(url, {headers, observe: 'response'})
        .do(response => {
          this.updateAuthData(response.headers);
          this.updateCurrentUser(response.body.data);
        })
        .map(response => response.body.data);
    }
    return Observable.throw("Don't have a valid token");
  }

  signOut() {
    let url = this.appInfo.apiUrl + '/auth/sign_out';
    let headers = this.getAuthHeaders();
    return this.http.delete(url, {headers})
      .do(() => {
        localStorage.removeItem('authData');
        localStorage.removeItem('currentUser');
        this._authData = null;
        this._currentUser = null;
      });
  }

  private getAuthHeaders(): HttpHeaders {
      let authData = this.authData;
      return new HttpHeaders().set('access-token', authData.accessToken)
                              .set('client', authData.client)
                              .set('uid', authData.uid);
  }

  private updateAuthData(headers: HttpHeaders) {
    let authData: AuthData = {
      accessToken: headers.get('access-token'),
      client: headers.get('client'),
      uid: headers.get('uid'),
      expiry: +headers.get('expiry')
    };
    localStorage.setItem('authData', JSON.stringify(authData));
    this._authData = authData;
  }

  private updateCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this._currentUser = user;
  }
}
