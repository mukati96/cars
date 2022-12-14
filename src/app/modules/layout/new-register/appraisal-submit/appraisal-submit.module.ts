import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppraisalSubmitRoutingModule } from './appraisal-submit-routing.module';
import { AppraisalSubmitComponent } from './appraisal-submit.component';


@NgModule({
  declarations: [
    AppraisalSubmitComponent
  ],
  exports: [
    AppraisalSubmitComponent
  ],
  imports: [
    CommonModule,
    AppraisalSubmitRoutingModule
  ]
})
export class AppraisalSubmitModule { }
