import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentEditPageRoutingModule } from './student-edit-routing.module';

import { StudentEditPage } from './student-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StudentEditPageRoutingModule
  ],
  declarations: [StudentEditPage]
})
export class StudentEditPageModule {}
