import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderRoutingModule } from './loader-routing.module';
import { LoaderComponent } from './loader.component';


@NgModule({
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    LoaderRoutingModule
  ]
})
export class LoaderModule { }
