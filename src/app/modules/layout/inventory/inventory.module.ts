import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
import { CountDownComponent } from './count-down/count-down.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';
import { GridViewModule } from './grid-view/grid-view.module';
import { ListViewModule } from './list-view/list-view.module';
import { PaginationModule } from './pagination/pagination.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { SidebarMobileModule } from './sidebar-mobile/sidebar-mobile.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule} from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  { path: '', component: InventoryComponent},
];

@NgModule({
  declarations: [
    InventoryComponent,
    
    CountDownComponent,
  ],
  exports :[
    CountDownComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
    DashboardModule,
    GridViewModule,
    ListViewModule,
    PaginationModule,
    SidebarModule,
    SidebarMobileModule,
    NgxPaginationModule,
    LazyLoadImageModule,
    NgxSliderModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    Ng2SearchPipeModule,
    CoreModule
    
  ]
})
export class InventoryModule { }
