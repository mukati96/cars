import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeOfferComponent } from './make-offer.component';

const routes: Routes = [
  {
    path:'',
    component:MakeOfferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakeOfferRoutingModule { }
