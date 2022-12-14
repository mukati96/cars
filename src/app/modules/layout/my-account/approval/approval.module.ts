import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './approval.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    ApprovalComponent
  ],
  exports: [
    ApprovalComponent
  ],
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    LazyLoadImageModule
  ]
})
export class ApprovalModule { }
