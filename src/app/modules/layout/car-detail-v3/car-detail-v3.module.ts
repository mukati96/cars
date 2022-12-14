import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgChartjsModule } from 'ng-chartjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebViewModule } from './web-view/web-view.module';
import { MobileViewModule } from './mobile-view/mobile-view.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarDetailV3RoutingModule } from './car-detail-v3-routing.module';
import { CarDetailV3Component } from './car-detail-v3.component'; 
import { CoreModule } from './../../../core/core.module';


@NgModule({
  declarations: [CarDetailV3Component],
  imports: [
    CommonModule,
    CarDetailV3RoutingModule,
    Ng2SearchPipeModule,
    LazyLoadImageModule,
    BsDropdownModule,
    NgxIntlTelInputModule,
    NgxGalleryModule,
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
    SlickCarouselModule,
    CoreModule
  ]
})
export class CarDetailV3Module { }
