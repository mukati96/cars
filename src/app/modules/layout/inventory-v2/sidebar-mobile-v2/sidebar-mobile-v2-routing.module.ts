import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarMobileV2Component } from './sidebar-mobile-v2.component';


const routes: Routes = [
  {
    path:'',
    component:SidebarMobileV2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarMobileV2RoutingModule { }
