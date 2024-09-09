import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUserMasterPageRoutingModule } from './add-user-master-routing.module';

import { AddUserMasterPage } from './add-user-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddUserMasterPageRoutingModule
  ],
  declarations: [AddUserMasterPage]
})
export class AddUserMasterPageModule {}
