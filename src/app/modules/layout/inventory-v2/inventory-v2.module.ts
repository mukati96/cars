import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryV2RoutingModule } from './inventory-v2-routing.module';
import { InventoryV2Component } from './inventory-v2.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoreModule } from 'src/app/core/core.module';
import { SidebarMobileModule } from './sidebar-mobile/sidebar-mobile.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { PaginationModule } from './pagination/pagination.module';
import { GridViewModule } from './grid-view/grid-view.module';
import { SidebarMobileV2Module } from './sidebar-mobile-v2/sidebar-mobile-v2.module';

const routes: Routes = [
  { path: '', component: InventoryV2Component},
];
@NgModule({
  declarations: [
    InventoryV2Component,
  ],
  imports: [
    CommonModule,
    InventoryV2RoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
    GridViewModule,
    PaginationModule,
    SidebarModule,
    SidebarMobileModule,
    SidebarMobileV2Module,
    NgxPaginationModule,
    LazyLoadImageModule,
    NgxSliderModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    Ng2SearchPipeModule,
    CoreModule,
  ]
})
export class InventoryV2Module { }
