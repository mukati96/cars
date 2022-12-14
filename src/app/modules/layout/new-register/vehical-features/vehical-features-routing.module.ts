import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicalFeaturesComponent } from './vehical-features.component';

const routes: Routes = [
  {
    path:'',
    component:VehicalFeaturesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicalFeaturesRoutingModule { }
