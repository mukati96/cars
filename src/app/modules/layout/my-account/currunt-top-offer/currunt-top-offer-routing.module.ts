import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurruntTopOfferComponent } from './currunt-top-offer.component';

const routes: Routes = [
  {
    path:'',
    component:CurruntTopOfferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurruntTopOfferRoutingModule { }
