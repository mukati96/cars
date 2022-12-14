import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRegisterComponent } from './new-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropDirective } from 'src/app/_helper/drag-drop.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConditionAndHistoryModule } from './condition-and-history/condition-and-history.module';
import { NewRegisterRoutingModule } from './new-register-routing.module';
import { PersonalInformationModule } from './personal-information/personal-information.module';
import { TheBasicsModule } from './the-basics/the-basics.module';
import { HeaderStepsModule } from './header-steps/header-steps.module';
import { VehicalFeaturesModule } from './vehical-features/vehical-features.module';
import { AppraisalModule } from '../appraisal/appraisal.module';
import { RouterModule, Routes } from '@angular/router';
const maskConfig: Partial<IConfig> = {
  validation: false
};

@NgModule({
  declarations: [
    NewRegisterComponent,
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(maskConfig),
    DragDropModule,
    NgxIntlTelInputModule,
    BsDropdownModule,
    NewRegisterRoutingModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    FormsModule,
    PersonalInformationModule,
    ConditionAndHistoryModule,
    TheBasicsModule,
    HeaderStepsModule,
    VehicalFeaturesModule,
    NgSelectModule,
    AppraisalModule
  ],
  providers: []
})
export class NewRegisterModule {}
