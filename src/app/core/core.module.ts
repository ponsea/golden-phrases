import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AppInfoService } from './app-info.service';
import { PhrasesService } from './phrases.service';
import { PhraseConversionService } from './phrase-conversion.service';
import { LevelsService } from './levels.service';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  declarations: [
    NavbarComponent
  ],
  providers: [
    AppInfoService,
    PhrasesService,
    PhraseConversionService,
    LevelsService
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
