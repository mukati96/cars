import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarMobileRoutingModule } from './sidebar-mobile-routing.module';
import { SidebarMobileComponent } from './sidebar-mobile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    SidebarMobileComponent
  ],
  exports: [
    SidebarMobileComponent
  ],
  imports: [
    CommonModule,
    SidebarMobileRoutingModule,
    ReactiveFormsModule, FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    CoreModule,
    NgxSliderModule,
    
  ]
})
export class SidebarMobileModule { }
