import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryWithThumbnailSliderComponent } from './gallery-with-thumbnail-slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';



@NgModule({
  declarations: [GalleryWithThumbnailSliderComponent],
  exports: [GalleryWithThumbnailSliderComponent],
  imports: [
    CommonModule,
    SlickCarouselModule
  ]
})
export class GalleryWithThumbnailSliderModule { }
