import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryV2Component } from './inventory-v2.component';
const routes: Routes = [
  {
    path:'',
    component:InventoryV2Component,
    children:[
     
      {
        path:'gridview',
        loadChildren: () => import ('./grid-view/grid-view.module').then (m => m.GridViewModule)
      },
     
      {
        path:'pagination',
        loadChildren: () => import ('./pagination/pagination.module').then (m => m.PaginationModule)
      },
      {
        path:'sidebar',
        loadChildren: () => import ('./sidebar/sidebar.module').then (m => m.SidebarModule)
      },
      // {
      //   path:'sidebar-mobile',
      //   loadChildren: () => import ('./sidebar-mobile/sidebar-mobile.module').then (m => m.SidebarMobileModule)
      // }
      {
          path:'sidebar-mobile',
          loadChildren: () => import ('./sidebar-mobile-v2/sidebar-mobile-v2.module').then (m => m.SidebarMobileV2Module)
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryV2RoutingModule { }
