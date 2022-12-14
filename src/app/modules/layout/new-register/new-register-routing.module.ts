import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRegisterComponent } from './new-register.component';

const routes: Routes = [
  {
    path:'',
    component:NewRegisterComponent,
    children:[
      {
        path:'condition-and-history',
        loadChildren:() => import ('./condition-and-history/condition-and-history.module').then(m => m.ConditionAndHistoryModule)
      },
      {
        path:'header-steps',
        loadChildren:() => import ('./header-steps/header-steps.module').then(m => m.HeaderStepsModule)
      },
      {
        path:'personal-information',
        loadChildren:()=> import ('./personal-information/personal-information.module').then( m =>m.PersonalInformationModule)
      },
      {
        path:'the-basics',
        loadChildren:()=> import ('./the-basics/the-basics.module').then(m =>m.TheBasicsModule)
      },
      {
        path:'vehical-features',
        loadChildren:() => import ('./vehical-features/vehical-features.module').then( m =>m.VehicalFeaturesModule)
      },
      {
        path:'vehical-new-photo',
        loadChildren:() => import ('./vehical-photo-new/vehical-photo-new.module').then(m =>m.VehicalPhotoNewModule)
      }
    ]
  },
  {
    path:'preview',
    loadChildren:() => import ('./car-details/car-details.module').then(m=>m.CarDetailsModule)
  },
  {
    path:'submit',
    loadChildren:() => import('./appraisal-submit/appraisal-submit.module').then (m =>m.AppraisalSubmitModule)
  },
  {
    path:'**',redirectTo:'',pathMatch:'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRegisterRoutingModule { }
