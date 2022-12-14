import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceCalculaterRoutingModule } from './finance-calculater-routing.module';
import { FinanceCalculaterComponent } from './finance-calculater.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    FinanceCalculaterComponent
  ],
  exports :[FinanceCalculaterComponent],
  imports: [
    CommonModule,
    FinanceCalculaterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class FinanceCalculaterModule { }
