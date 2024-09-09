import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAssignmentPageRoutingModule } from './edit-assignment-routing.module';

import { EditAssignmentPage } from './edit-assignment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditAssignmentPageRoutingModule
  ],
  declarations: [EditAssignmentPage]
})
export class EditAssignmentPageModule {}
