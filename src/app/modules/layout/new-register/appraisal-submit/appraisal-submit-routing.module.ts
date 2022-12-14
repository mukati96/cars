import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppraisalSubmitComponent } from './appraisal-submit.component';

const routes: Routes = [
  {
    path:'',
    component:AppraisalSubmitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppraisalSubmitRoutingModule { }
