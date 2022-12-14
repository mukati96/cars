import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealerViewRoutingModule } from './dealer-view-routing.module';
import { DealerViewComponent } from './dealer-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RatingsModule } from '../ratings/ratings.module';


@NgModule({
  declarations: [
    DealerViewComponent
  ],
  exports: [
    DealerViewComponent
  ],
  imports: [
    CommonModule,
    DealerViewRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RatingsModule
  ]
})
export class DealerViewModule { }
