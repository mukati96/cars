import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileViewComponent } from './mobile-view.component';

const routes: Routes = [
  {
    path:'',
    component:MobileViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileViewRoutingModule { }
