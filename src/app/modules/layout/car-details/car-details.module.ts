import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarDetailsRoutingModule } from './car-details-routing.module';
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
import { CarDetailsComponent } from './car-details.component';
import { WebViewModule } from './web-view/web-view.module';
import { MobileViewModule } from './mobile-view/mobile-view.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CoreModule } from '../../../core/core.module';



@NgModule({
  declarations: [
    CarDetailsComponent
  ],
  imports: [
    CommonModule,
    CarDetailsRoutingModule,
    Ng2SearchPipeModule,
    LazyLoadImageModule,
    BsDropdownModule,
    NgxIntlTelInputModule,
    NgxGalleryModule,
    BarRatingModule,
    ImageCropperModule,
    NgxMaterialTimepickerModule,
    NgSelectModule,
    CarouselModule,
    NgChartjsModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    WebViewModule,
    MobileViewModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    SlickCarouselModule,
    CoreModule
    // NumberOnlyModule
  ]
})
export class CarDetailsModule { }
