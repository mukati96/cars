
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './car-details.component';

const routes: Routes = [
  {
    path:':id',
    component:CarDetailsComponent,
    children:[
      {
        path:'buy_now',
        loadChildren: () => import ('./buy-now/buy-now.module').then(m => m.BuyNowModule )
      },
      {
        path:'make_offer',
        loadChildren: () => import ('./make-offer/make-offer.module').then(m =>  m.MakeOfferModule)
      },
      {
        path:'finance_calculater',
        loadChildren: () => import ('./finance-calculater/finance-calculater.module').then(m=>  m.FinanceCalculaterModule)
      },
      {
        path:'graph',
        loadChildren: () => import ('./graph/graph.module').then(m =>  m.GraphModule)
      },
      {
        path:'login',
        loadChildren: () => import ('./login/login.module').then(m =>  m.LoginModule)
      },
      {
        path:'mobile_view',
        loadChildren: () => import ('./mobile-view/mobile-view.module').then (m =>  m.MobileViewModule)
      },
      {
        path:'web_view',
        loadChildren: () => import ('./web-view/web-view.module').then (m =>  m.WebViewModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarDetailsRoutingModule { }
