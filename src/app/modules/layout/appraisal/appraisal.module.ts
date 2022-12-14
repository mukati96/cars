import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppraisalRoutingModule } from './appraisal-routing.module';
import { AppraisalComponent } from './appraisal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    AppraisalComponent
  ],
  exports: [
    AppraisalComponent
  ],
  imports: [
    CommonModule,
    AppraisalRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    CoreModule
  ]
})
export class AppraisalModule { }
