import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminMasterPageRoutingModule } from './admin-master-routing.module';

import { AdminMasterPage } from './admin-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AdminMasterPageRoutingModule
  ],
  declarations: [AdminMasterPage]
})
export class AdminMasterPageModule {}
