import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JointInvoiceMasterPageRoutingModule } from './joint-invoice-master-routing.module';

import { JointInvoiceMasterPage } from './joint-invoice-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    JointInvoiceMasterPageRoutingModule
  ],
  declarations: [JointInvoiceMasterPage]
})
export class JointInvoiceMasterPageModule {}
