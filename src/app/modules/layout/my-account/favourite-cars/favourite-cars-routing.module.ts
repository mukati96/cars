import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteCarsComponent } from './favourite-cars.component';

const routes: Routes = [
  {
    path:'',
    component:FavouriteCarsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouriteCarsRoutingModule { }
