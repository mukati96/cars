import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerViewComponent } from './dealer-view.component';

const routes: Routes = [
  {
    path:'',
    component:DealerViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerViewRoutingModule { }
