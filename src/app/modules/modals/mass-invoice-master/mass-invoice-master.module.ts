import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MassInvoiceMasterPageRoutingModule } from './mass-invoice-master-routing.module';

import { MassInvoiceMasterPage } from './mass-invoice-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MassInvoiceMasterPageRoutingModule
  ],
  declarations: [MassInvoiceMasterPage]
})
export class MassInvoiceMasterPageModule {}
