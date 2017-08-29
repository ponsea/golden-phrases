import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PracticeRoutingModule } from './practice-routing.module';
import { PracticeComponent } from './practice.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  imports: [
    SharedModule,
    PracticeRoutingModule,
  ],
  declarations: [
    PracticeComponent,
    QuestionComponent,
    ResultComponent,
  ]
})
export class PracticeModule { }
