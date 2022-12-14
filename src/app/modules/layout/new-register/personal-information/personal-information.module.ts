import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalInformationRoutingModule } from './personal-information-routing.module';
import { PersonalInformationComponent } from './personal-information.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


@NgModule({
  declarations: [
    PersonalInformationComponent
  ],
  exports: [
    PersonalInformationComponent
  ],
  imports: [
    CommonModule,
    PersonalInformationRoutingModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule
  ]
})
export class PersonalInformationModule { }
