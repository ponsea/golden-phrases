import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { RouterModule }             from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule
   ],
  declarations: [ ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule
  ]
})
export class SharedModule { }
