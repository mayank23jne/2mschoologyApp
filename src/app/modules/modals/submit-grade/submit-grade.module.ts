import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitGradePageRoutingModule } from './submit-grade-routing.module';

import { SubmitGradePage } from './submit-grade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SubmitGradePageRoutingModule
  ],
  declarations: [SubmitGradePage]
})
export class SubmitGradePageModule {}
