import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoicePrintPageRoutingModule } from './invoice-print-routing.module';

import { InvoicePrintPage } from './invoice-print.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoicePrintPageRoutingModule
  ],
  declarations: [InvoicePrintPage]
})
export class InvoicePrintPageModule {}
