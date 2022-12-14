import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountDownRoutingModule } from './count-down-routing.module';
import { CountDownComponent } from './count-down.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CountDownRoutingModule
  ]
})
export class CountDownModule { }
