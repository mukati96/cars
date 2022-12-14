import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarMobileV2RoutingModule } from './sidebar-mobile-v2-routing.module';
import { SidebarMobileV2Component } from './sidebar-mobile-v2.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { CoreModule } from 'src/app/core/core.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false
};

@NgModule({
  declarations: [
    SidebarMobileV2Component
  ],
  exports: [
    SidebarMobileV2Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SidebarMobileV2RoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    NgxSliderModule,
    CoreModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class SidebarMobileV2Module { }
