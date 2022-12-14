import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyNowRoutingModule } from './buy-now-routing.module';
import { BuyNowComponent } from './buy-now.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CoreModule } from '../../../../core/core.module';

@NgModule({
  declarations: [BuyNowComponent],
  exports: [BuyNowComponent],
  imports: [
    CommonModule,
    CoreModule,
    BuyNowRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxIntlTelInputModule
  ]
})
export class BuyNowModule { }
