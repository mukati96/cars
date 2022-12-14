import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionComponent } from './auction.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  { path: '', component:  AuctionComponent},
  // { path: '**', redirectTo: 'approval' },
];

@NgModule({
  declarations: [AuctionComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
  ]
})
export class AuctionModule { }
