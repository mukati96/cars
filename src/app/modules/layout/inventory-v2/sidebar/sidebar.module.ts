import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { CoreModule } from './../../../../core/core.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false
};
@NgModule({
  declarations: [
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    ReactiveFormsModule ,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    NgxSliderModule,
    CoreModule,NgxMaskModule.forRoot(maskConfig),
  ]
})
export class SidebarModule { }
