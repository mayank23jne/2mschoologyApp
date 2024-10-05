import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlanMasterPageRoutingModule } from './add-plan-master-routing.module';

import { AddPlanMasterPage } from './add-plan-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddPlanMasterPageRoutingModule
  ],
  declarations: [AddPlanMasterPage]
})
export class AddPlanMasterPageModule {}
