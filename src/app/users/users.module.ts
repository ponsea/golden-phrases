import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterConfirmComponent } from './register-confirm/register-confirm.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
  declarations: [
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    RegisterConfirmComponent
  ]
})
export class UsersModule { }
