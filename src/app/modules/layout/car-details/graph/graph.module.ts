import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphRoutingModule } from './graph-routing.module';
import { GraphComponent } from './graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartjsModule } from 'ng-chartjs';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [GraphComponent],
  exports: [GraphComponent],
  imports: [
    CommonModule,
    NgChartjsModule,
    GraphRoutingModule,
    NgApexchartsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class GraphModule { }
