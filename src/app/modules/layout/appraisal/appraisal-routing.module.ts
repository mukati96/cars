import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppraisalComponent } from './appraisal.component';

const routes: Routes = [
  {
    path:'',
    component:AppraisalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppraisalRoutingModule { }
