import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { BarRatingModule } from 'ngx-bar-rating';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgChartjsModule } from 'ng-chartjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WebViewComponent } from './web-view.component';
import { MakeOfferModule } from '../make-offer/make-offer.module';
import { BuyNowModule } from '../buy-now/buy-now.module';
import { NgxMaskModule } from 'ngx-mask';
import { GraphModule } from '../graph/graph.module';
import { LoginModule } from '../login/login.module';
import { FinanceCalculaterModule } from '../finance-calculater/finance-calculater.module';
import { SliderModule } from '../../slider/slider.module';
import { CoreModule } from 'src/app/core/core.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { GalleryWithThumbnailSliderModule } from '../../gallery-with-thumbnail-slider/gallery-with-thumbnail-slider.module';

@NgModule({
  declarations: [
    WebViewComponent
  ],
  exports: [
    WebViewComponent
  ],
  imports: [
    CommonModule,
    NgxSliderModule,
    Ng2SearchPipeModule,
    LazyLoadImageModule,
    BsDropdownModule,
    NgxIntlTelInputModule,
    NgxGalleryModule,
    BarRatingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ImageCropperModule,
    NgxMaterialTimepickerModule,
    NgSelectModule,
    CarouselModule,
    NgChartjsModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    MakeOfferModule,
    BuyNowModule,
    CoreModule,
    NgxMaskModule.forRoot(),
    GraphModule,LoginModule,
    FinanceCalculaterModule,
    SlickCarouselModule,
    RouterModule,
    SliderModule,
    GalleryWithThumbnailSliderModule
  ]
})
export class WebViewModule { }
