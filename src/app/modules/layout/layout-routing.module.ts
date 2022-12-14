import { CarDetailV3Module } from './car-detail-v3/car-detail-v3.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/modules/loader/loader.component';
import { LayoutComponent } from './layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      // {
      //   path:'car-details',
      //   loadChildren: () => import ('../layout/car-details/car-details.module').then(m =>m.CarDetailsModule)
      // },
      {
        path:'car-details',
        loadChildren: () => import ('../layout/car-detail-v3/car-detail-v3.module').then(m =>m.CarDetailV3Module)
      },
      {
        path: 'about-us',
        loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)
      },
      { path: 'auctions',
        loadChildren: () => import('./auction/auction.module')
        .then(m => m.AuctionModule),
        data: { preload: false },
      },
      //VERSION V1
      // {
      //   path: 'inventory',
      //   loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)
      // },
      // VERSION V2
      {
        path: 'inventory',
        loadChildren: () => import('./inventory-v2/inventory-v2.module').then(m => m.InventoryV2Module)
      },
      {
        path: 'contact-us',
        loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule)
      },
      {
       path :'login',
       loadChildren: () => import ('../auth/login/login.module').then(m => m.LoginModule)  
      },
      {
        path:'privacy-info',
        loadChildren:() => import ('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
      },
      {
        path:'faqs',
        loadChildren: () => import ('./faqs/faqs.module').then(m => m.FaqsModule)
      },
      {
        path:'terms-service',
        loadChildren:() => import('./terms-service/terms-service.module').then(m =>m.TermsServiceModule)
      },
      {
        path:'new-register',
        loadChildren:() => import ('./new-register/new-register.module').then( m => m.NewRegisterModule)
      },
      {
        path:'reset-password/:token',
        loadChildren:() => import ('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {
        path:'forgot-password',
        loadChildren: () => import ('./forget-password/forget-password.module').then(m => m.ForgetPasswordModule)
      } ,
      {
        path:'my-account',
        loadChildren: () => import ('./my-account/my-account.module').then(m => m.MyAccountModule)
      },
      // {
      //   path:'appraisal',
      //   loadChildren:()=>import('./appraisal/appraisal.module').then(m => m.AppraisalModule),
      //   redirectTo: '',
      //   pathMatch: 'full', 
      //   data: { preload: true },
      // }
    ]
  },
  { path: 'not-found', component: PageNotFoundComponent},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
