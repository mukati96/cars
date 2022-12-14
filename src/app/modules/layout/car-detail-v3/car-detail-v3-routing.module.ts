import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailV3Component } from './car-detail-v3.component';
const routes: Routes = [
  {
    path:':id',
    component:CarDetailV3Component,
    children:[
      {
        path:'buy_now',
        loadChildren: () => import ('./latest-prices/latest-prices.module').then(m => m.LatestPricesModule )
      },  
      {
        path:'latest_prices',
        loadChildren: () => import ('./buy-now/buy-now.module').then(m => m.BuyNowModule )
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
export class CarDetailV3RoutingModule { }
