import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakeOfferRoutingModule } from './make-offer-routing.module';
import { MakeOfferComponent } from './make-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
@NgModule({
  declarations: [MakeOfferComponent],
  exports: [MakeOfferComponent],
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule,NgxIntlTelInputModule
  ]
})
export class MakeOfferModule { }
