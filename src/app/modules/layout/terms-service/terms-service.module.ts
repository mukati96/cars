import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsServiceRoutingModule } from './terms-service-routing.module';
import { TermsServiceComponent } from './terms-service.component';


@NgModule({
  declarations: [
    TermsServiceComponent
  ],
  imports: [
    CommonModule,
    TermsServiceRoutingModule
  ]
})
export class TermsServiceModule { }
