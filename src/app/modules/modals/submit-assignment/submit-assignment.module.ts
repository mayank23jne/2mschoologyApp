import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitAssignmentPageRoutingModule } from './submit-assignment-routing.module';

import { SubmitAssignmentPage } from './submit-assignment.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitAssignmentPageRoutingModule
  ],
  declarations: [SubmitAssignmentPage]
})
export class SubmitAssignmentPageModule {}
