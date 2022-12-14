import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConditionAndHistoryComponent } from './condition-and-history.component';

const routes: Routes = [
  {
    path:'',
    component:ConditionAndHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConditionAndHistoryRoutingModule { }
