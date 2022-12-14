import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderModule } from 'src/app/shared/modules/header/header.module';
import { FooterModule } from '../../shared/modules/footer/footer.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgChartjsModule } from 'ng-chartjs';
import { LoaderModule } from 'src/app/shared/modules/loader/loader.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HeaderModule,
    FooterModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgChartjsModule,
    LoaderModule,
  
  ]
})
export class LayoutModule { }
