import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicalPhotoNewRoutingModule } from './vehical-photo-new-routing.module';
import { VehicalPhotoNewComponent } from './vehical-photo-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    VehicalPhotoNewComponent
  ],
  exports: [
    VehicalPhotoNewComponent
  ],
  imports: [
    CommonModule,
    VehicalPhotoNewRoutingModule,ReactiveFormsModule,DragDropModule
  ]
})
export class VehicalPhotoNewModule { }
