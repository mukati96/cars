import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppraisalModule } from '../appraisal/appraisal.module';
import { SliderModule } from '../slider/slider.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlyrModule } from 'ngx-plyr'

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    AppraisalModule,
    SliderModule,
    PlyrModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
