import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderStepsComponent } from './header-steps.component';

const routes: Routes = [
  {
    path:'',
    component:HeaderStepsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderStepsRoutingModule { }
