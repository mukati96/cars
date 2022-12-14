// import { GoogleMapModule } from './../../../../shared/modules/google-map/google-map.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { BarRatingModule } from 'ngx-bar-rating';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgChartjsModule } from 'ng-chartjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WebViewComponent } from './web-view.component';
import { BuyNowModule } from '../buy-now/buy-now.module';
import { NgxMaskModule } from 'ngx-mask';
import { LoginModule } from '../login/login.module';
import { SliderModule } from '../../slider/slider.module';
import { CoreModule } from 'src/app/core/core.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LatestPricesModule } from '../latest-prices/latest-prices.module';
import { GoogleMapModule } from 'src/app/core/modules/google-map/google-map.module';
import { GalleryWithThumbnailSliderModule } from 'src/app/core/modules/gallery-with-thumbnail-slider/gallery-with-thumbnail-slider.module';
@NgModule({
  declarations: [
    WebViewComponent
  ],
  exports: [
    WebViewComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgxSliderModule,
    Ng2SearchPipeModule,
    LazyLoadImageModule,
    BsDropdownModule,
    NgxIntlTelInputModule,
    NgxGalleryModule,
    BarRatingModule,
    GoogleMapModule,
    ImageCropperModule,
    NgxMaterialTimepickerModule,
    NgSelectModule,
    CarouselModule,
    NgChartjsModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    BuyNowModule,
    CoreModule,
    NgxMaskModule.forRoot(),LoginModule,
    SlickCarouselModule,
    RouterModule,
    SliderModule,
    GalleryWithThumbnailSliderModule,
    LatestPricesModule
  ]
})
export class WebViewModule { }
