import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
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
