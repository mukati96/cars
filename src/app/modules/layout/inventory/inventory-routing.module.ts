import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
  {
    path:'',
    component:InventoryComponent,
    children:[
      {
        path:'countdown',
        loadChildren: () => import ('./count-down/count-down.module').then(m => m.CountDownModule)
      },
      {
        path:'dashboard',
        loadChildren: () => import ('./dashboard/dashboard.module').then(m =>m.DashboardModule)
      },
      {
        path:'gridview',
        loadChildren: () => import ('./grid-view/grid-view.module').then (m => m.GridViewModule)
      },
      {
        path:'listview',
        loadChildren: () => import ('./list-view/list-view.module').then (m => m.ListViewModule)
      },
      {
        path:'pagination',
        loadChildren: () => import ('./pagination/pagination.module').then (m => m.PaginationModule)
      },
      {
        path:'sidebar',
        loadChildren: () => import ('./sidebar/sidebar.module').then (m => m.SidebarModule)
      },
      {
        path:'sidebar-mobile',
        loadChildren: () => import ('./sidebar-mobile/sidebar-mobile.module').then (m => m.SidebarMobileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
