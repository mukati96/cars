import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridViewRoutingModule } from './grid-view-routing.module';
import { GridViewComponent } from './grid-view.component';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    GridViewComponent
  ],
  exports: [
    GridViewComponent
  ],
  imports: [
    CommonModule,
    GridViewRoutingModule,
    RouterModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    LazyLoadImageModule
  ]
})
export class GridViewModule { }
