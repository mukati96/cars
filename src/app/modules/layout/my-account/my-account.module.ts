import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    SidebarModule,
    LazyLoadImageModule,
  ]
})
export class MyAccountModule { }
