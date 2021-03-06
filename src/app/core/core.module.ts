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
import { AuthGuard } from './auth-guard.service';
import { UnauthGuard } from './unauth-guard.service';
import { ScoreService } from './score.service';
import { AuthInterceptor } from './auth-interceptor.service';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    NavbarComponent,
  ],
  providers: [
    AppInfoService,
    PhrasesService,
    PhraseConversionService,
    LevelsService,
    AuthService,
    AuthGuard,
    UnauthGuard,
    ScoreService,
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
