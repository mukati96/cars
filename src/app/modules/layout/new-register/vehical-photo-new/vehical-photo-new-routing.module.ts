import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicalPhotoNewComponent } from './vehical-photo-new.component';

const routes: Routes = [
  {
    path:'',
    component:VehicalPhotoNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicalPhotoNewRoutingModule { }
