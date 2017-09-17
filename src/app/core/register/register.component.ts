import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';

@Component({
  selector: 'gp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  submitDisabled = false;
  errors: string[];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  get confirmationValid() {
    return this.password === this.passwordConfirmation;
  }

  onSubmit() {
    this.submitDisabled = true;
    this.authService.registerAccount(this.email, this.name, this.password)
      .subscribe(() => {
          this.router.navigate(['/phrases']);
      }, err => {
        if (err.status === 422) {
          this.errors = err.error.errors.full_messages;
        } else {
          alert('エラーが発生しました。しばらくの後、再度お試しください');
        }
        this.submitDisabled = false;
      });
  }
}
