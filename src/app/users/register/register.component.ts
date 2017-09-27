import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'gp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('modal') modal: TemplateRef<any>;
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  submitDisabled = false;
  errors: string[];
  isWaiting = false;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
  ) { }

  get confirmationValid() {
    return this.password === this.passwordConfirmation;
  }

  onSubmit() {
    this.submitDisabled = true;
    this.isWaiting = true;
    let confirmUrl = location.origin + location.pathname + '/confirm';
    this.authService.registerAccount(this.email, this.name, this.password, confirmUrl)
      .subscribe(() => {
        this.modalService.open(this.modal);
        this.isWaiting = false;
      }, err => {
        if (err.status === 422) {
          this.errors = err.error.errors.full_messages;
        } else {
          alert('エラーが発生しました。しばらくの後、再度お試しください');
        }
        this.submitDisabled = false;
        this.isWaiting = false;
      });
  }
}
