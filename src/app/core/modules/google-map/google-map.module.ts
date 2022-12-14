import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapComponent } from './google-map.component';


@NgModule({
  declarations: [GoogleMapComponent],
  exports: [GoogleMapComponent],
  imports: [
    CommonModule
  ]
})
export class GoogleMapModule {

}

