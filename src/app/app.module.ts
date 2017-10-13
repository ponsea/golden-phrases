import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { PhrasesModule } from './phrases/phrases.module';
import { PracticeModule } from './practice/practice.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { DescriptionComponent } from './description/description.component';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    UsersModule,
    PhrasesModule,
    PracticeModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    DescriptionComponent,
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
