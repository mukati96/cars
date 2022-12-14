import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConditionAndHistoryRoutingModule } from './condition-and-history-routing.module';
import { ConditionAndHistoryComponent } from './condition-and-history.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConditionAndHistoryComponent
  ],
  exports: [
    ConditionAndHistoryComponent
  ],
  imports: [
    CommonModule,
    ConditionAndHistoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class ConditionAndHistoryModule { }
