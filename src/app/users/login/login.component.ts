import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'gp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private fromUrl: string;
  email: string;
  password: string;
  submitDisabled = false;
  failureCount = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.fromUrl = params.get('from'));
  }

  onSubmit() {
    this.submitDisabled = true;
    this.authService.signIn(this.email, this.password)
      .subscribe(() => {
        if (this.fromUrl) {
          this.router.navigateByUrl(this.fromUrl);
        } else {
          this.router.navigate(['/phrases']);
        }
      }, err => {
        if (err.status === 401) {
          ++this.failureCount;
        } else {
          alert('エラーが発生しました。しばらくの後、再度お試しください');
        }
        this.submitDisabled = false;
      });
  }
}
