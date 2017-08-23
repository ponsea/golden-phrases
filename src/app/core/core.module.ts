import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AppInfoService } from './app-info.service';

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
    AppInfoService
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
