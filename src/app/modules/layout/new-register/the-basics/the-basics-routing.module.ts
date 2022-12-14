import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TheBasicsComponent } from './the-basics.component';

const routes: Routes = [
  {
    path:'',
    component:TheBasicsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheBasicsRoutingModule { }
