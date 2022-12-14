import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderStepsRoutingModule } from './header-steps-routing.module';
import { HeaderStepsComponent } from './header-steps.component';


@NgModule({
  declarations: [
    HeaderStepsComponent
  ],
  exports: [
    HeaderStepsComponent
  ],
  imports: [
    CommonModule,
    HeaderStepsRoutingModule
  ]
})
export class HeaderStepsModule { }
