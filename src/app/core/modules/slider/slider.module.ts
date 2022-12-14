import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [SliderComponent],
  exports: [SliderComponent,RouterModule],
  imports: [
    CommonModule,
    CarouselModule,
    AppRoutingModule,
  ]
})
export class SliderModule { }
