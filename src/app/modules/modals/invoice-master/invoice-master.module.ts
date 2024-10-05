import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceMasterPageRoutingModule } from './invoice-master-routing.module';

import { InvoiceMasterPage } from './invoice-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InvoiceMasterPageRoutingModule
  ],
  declarations: [InvoiceMasterPage]
})
export class InvoiceMasterPageModule {}
