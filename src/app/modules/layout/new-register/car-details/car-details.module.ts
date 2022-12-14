import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CarDetailsRoutingModule } from './car-details-routing.module';
import { CarDetailsComponent } from './car-details.component';


@NgModule({
  declarations: [
    CarDetailsComponent
  ],
  imports: [
    CommonModule,
    StoreModule,
    CarDetailsRoutingModule
  ]
})
export class CarDetailsModule { }
