import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTeacherPageRoutingModule } from './add-teacher-routing.module';

import { AddTeacherPage } from './add-teacher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddTeacherPageRoutingModule
  ],
  declarations: [AddTeacherPage]
})
export class AddTeacherPageModule {}
