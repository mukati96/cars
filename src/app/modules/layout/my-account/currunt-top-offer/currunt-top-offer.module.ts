import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurruntTopOfferRoutingModule } from './currunt-top-offer-routing.module';
import { CurruntTopOfferComponent } from './currunt-top-offer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    CurruntTopOfferComponent
  ],
  imports: [
    CommonModule,
    CurruntTopOfferRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    NgxGalleryModule,
    NgApexchartsModule,
    NgxMaterialTimepickerModule
  ]
})
export class CurruntTopOfferModule { }
