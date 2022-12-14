import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './my-account.component';

const routes: Routes = [
  {
    path:'',
    component:MyAccountComponent,
    children:[
      {
        path:'account',
        loadChildren:()=> import ('./account/account.module').then( m=> m.AccountModule)
      },
      {
        path:'mycar',
        loadChildren:()=> import('./approval/approval.module').then (m => m.ApprovalModule)
      },
      {
        path:'currunt/:id',
        loadChildren:()=> import('./currunt-top-offer/currunt-top-offer.module').then ( m => m.CurruntTopOfferModule)
      },
      {
        path:'dealer/:id',
        loadChildren:() => import ('./dealer-view/dealer-view.module').then ( m => m.DealerViewModule)
      },
      {
        path:'ratings',
        loadChildren: () => import ('./ratings/ratings.module').then ( m=>m.RatingsModule)
      },
      {
        path: 'favourite',
        loadChildren:() => import ('./favourite-cars/favourite-cars.module').then( m => m.FavouriteCarsModule)
      }
    ]
  },
  { path:'**', redirectTo: 'account', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
