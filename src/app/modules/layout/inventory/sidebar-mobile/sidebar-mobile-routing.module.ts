import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarMobileComponent } from './sidebar-mobile.component';

const routes: Routes = [
  {
    path:'',
    component:SidebarMobileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarMobileRoutingModule { }
