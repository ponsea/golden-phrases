import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterConfirmComponent } from './register-confirm/register-confirm.component';
import { UnauthGuard } from '../core/unauth-guard.service';

const usersRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [UnauthGuard]
      }, {
        path: 'register/confirm',
        component: RegisterConfirmComponent
      }, {
        path: 'register',
        component: RegisterComponent,
        canActivate: [UnauthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
