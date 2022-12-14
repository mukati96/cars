import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListViewRoutingModule } from './list-view-routing.module';
import { ListViewComponent } from './list-view.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [
    ListViewComponent
  ],
  exports: [
    ListViewComponent
  ],
  imports: [
    CommonModule,
    ListViewRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    LazyLoadImageModule
  ]
})
export class ListViewModule { }
