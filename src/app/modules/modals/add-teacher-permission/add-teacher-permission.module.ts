import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTeacherPermissionPageRoutingModule } from './add-teacher-permission-routing.module';

import { AddTeacherPermissionPage } from './add-teacher-permission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTeacherPermissionPageRoutingModule
  ],
  declarations: [AddTeacherPermissionPage]
})
export class AddTeacherPermissionPageModule {}
