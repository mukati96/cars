import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationRoutingModule } from './pagination-routing.module';
import { PaginationComponent } from './pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    PaginationComponent
  ],
  exports: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    PaginationRoutingModule,
    NgxPaginationModule,
    LazyLoadImageModule
  ]
})
export class PaginationModule { }
