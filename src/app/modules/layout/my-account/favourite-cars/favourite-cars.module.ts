import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouriteCarsRoutingModule } from './favourite-cars-routing.module';
import { FavouriteCarsComponent } from './favourite-cars.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [
    FavouriteCarsComponent
  ],
  exports: [
    FavouriteCarsComponent
  ],
  imports: [
    CommonModule,
    FavouriteCarsRoutingModule,
    LazyLoadImageModule
  ]
})
export class FavouriteCarsModule { }
