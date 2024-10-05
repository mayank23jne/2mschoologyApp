import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JointMassInvoiceMasterPageRoutingModule } from './joint-mass-invoice-master-routing.module';

import { JointMassInvoiceMasterPage } from './joint-mass-invoice-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    JointMassInvoiceMasterPageRoutingModule
  ],
  declarations: [JointMassInvoiceMasterPage]
})
export class JointMassInvoiceMasterPageModule {}
