import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingsRoutingModule } from './ratings-routing.module';
import { RatingsComponent } from './ratings.component';


@NgModule({
  declarations: [
    RatingsComponent
  ],
  exports: [
    RatingsComponent
  ],
  imports: [
    CommonModule,
    RatingsRoutingModule
  ]
})
export class RatingsModule { }
