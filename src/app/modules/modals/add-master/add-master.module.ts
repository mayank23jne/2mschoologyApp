import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMasterPageRoutingModule } from './add-master-routing.module';

import { AddMasterPage } from './add-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddMasterPageRoutingModule
  ],
  declarations: [AddMasterPage]
})
export class AddMasterPageModule {}
