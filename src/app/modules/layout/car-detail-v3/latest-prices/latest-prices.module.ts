import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestPricesComponent } from './latest-prices.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LatestPricesComponent],
  exports: [LatestPricesComponent],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule
  ]
})

export class LatestPricesModule { }
