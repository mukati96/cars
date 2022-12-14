import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderRoutingModule } from './slider-routing.module';
import { SliderComponent } from './slider.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    SliderComponent
  ],
  exports: [
    SliderComponent
  ],
  imports: [
    CommonModule,
    SliderRoutingModule,
    RouterModule
  ]
})
export class SliderModule { }
