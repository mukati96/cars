import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicalFeaturesRoutingModule } from './vehical-features-routing.module';
import { VehicalFeaturesComponent } from './vehical-features.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VehicalFeaturesComponent
  ],
  exports: [
    VehicalFeaturesComponent
  ],
  imports: [
    CommonModule,
    VehicalFeaturesRoutingModule,
    ReactiveFormsModule
  ]
})
export class VehicalFeaturesModule { }
