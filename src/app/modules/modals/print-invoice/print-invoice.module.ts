import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintInvoicePageRoutingModule } from './print-invoice-routing.module';

import { PrintInvoicePage } from './print-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintInvoicePageRoutingModule
  ],
  declarations: [PrintInvoicePage]
})
export class PrintInvoicePageModule {}
