import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddExamMasterPageRoutingModule } from './add-exam-master-routing.module';

import { AddExamMasterPage } from './add-exam-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddExamMasterPageRoutingModule
  ],
  declarations: [AddExamMasterPage]
})
export class AddExamMasterPageModule {}
