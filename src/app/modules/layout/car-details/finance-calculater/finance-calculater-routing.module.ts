import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceCalculaterComponent } from './finance-calculater.component';

const routes: Routes = [
  {
    path:'',
    component:FinanceCalculaterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceCalculaterRoutingModule { }
