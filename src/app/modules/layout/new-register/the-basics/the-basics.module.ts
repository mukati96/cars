import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheBasicsRoutingModule } from './the-basics-routing.module';
import { TheBasicsComponent } from './the-basics.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false
};
@NgModule({
  declarations: [
    TheBasicsComponent
  ],
  exports: [
    TheBasicsComponent
  ],
  imports: [
    CommonModule,
    TheBasicsRoutingModule,NgxMaskModule.forRoot(maskConfig),
    NgSelectModule,ReactiveFormsModule
  ]
})
export class TheBasicsModule { }
