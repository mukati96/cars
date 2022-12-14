import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowToUseComponent } from './how-to-use/how-to-use.component';
import { TransactionNotesComponent } from './transaction-notes/transaction-notes.component';
import { PolicyAndUsageComponent } from './policy-and-usage/policy-and-usage.component';
import { TermsAndServicesComponent } from './terms-and-services/terms-and-services.component';
import { PrivacyInformationComponent } from './privacy-information/privacy-information.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'how-to-use', component: HowToUseComponent},
  { path: 'transaction-notes', component: TransactionNotesComponent},
  { path: 'policy-usage', component: PolicyAndUsageComponent},
  { path: 'terms-service', component: TermsAndServicesComponent},
  { path: 'privacy-info', component: PrivacyInformationComponent},
  { path: '**', redirectTo: 'how-to-use' },
];

@NgModule({
  declarations: [
    HowToUseComponent,
    PolicyAndUsageComponent,
    TermsAndServicesComponent,
    TransactionNotesComponent,
    PrivacyInformationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TermsModule { }
