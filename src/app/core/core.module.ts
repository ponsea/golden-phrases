import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AppInfoService } from './app-info.service';
import { PhrasesService } from './phrases.service';
import { PhraseConversionService } from './phrase-conversion.service';
import { LevelsService } from './levels.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { CoreRoutingModule } from './core-routing.module';
import { AuthGuard } from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './auth-interceptor.service';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    NgbModule.forRoot(),
    CoreRoutingModule
  ],
  declarations: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AppInfoService,
    PhrasesService,
    PhraseConversionService,
    LevelsService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
