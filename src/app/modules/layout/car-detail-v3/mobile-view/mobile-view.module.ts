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
import { MobileViewComponent } from './mobile-view.component';
import { RouterModule, Routes } from '@angular/router';
import { BuyNowModule } from '../buy-now/buy-now.module';
import { NgxMaskModule } from 'ngx-mask';
import { LoginModule } from '../login/login.module';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: MobileViewComponent
  }
]

@NgModule({
  declarations: [MobileViewComponent],
  exports: [MobileViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    ReactiveFormsModule,BuyNowModule,
    LoginModule,
    CoreModule,
    NgxMaskModule.forRoot(),
      RouterModule
  ]
})
export class MobileViewModule { }
