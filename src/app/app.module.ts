import { NgModule } from '@angular/core';
// import { EffectsModule } from '@ngrx/effects'
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreModule } from './core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics'
import { NgChartjsModule } from 'ng-chartjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpService } from './services/http.service';
import { ToastrServices } from './services/toastr.service';
import { PlyrModule } from 'ngx-plyr'
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BsDropdownModule,
    NgxIntlTelInputModule,
    NgChartjsModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgSelectModule,
    CoreModule,
    PlyrModule,
    NgxSliderModule,
    SlickCarouselModule,
    StoreModule.forRoot({}),
    // EffectsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
    NgxGoogleAnalyticsModule.forRoot('UA-190418670-2'),
  
  ],
  providers: [HttpService, ToastrServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
