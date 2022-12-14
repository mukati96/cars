import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    ReactiveFormsModule,
    FormsModule,CoreModule
  ]
})
export class ContactUsModule { }
