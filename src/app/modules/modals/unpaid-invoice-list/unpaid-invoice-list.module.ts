import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnpaidInvoiceListPageRoutingModule } from './unpaid-invoice-list-routing.module';

import { UnpaidInvoiceListPage } from './unpaid-invoice-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnpaidInvoiceListPageRoutingModule
  ],
  declarations: [UnpaidInvoiceListPage]
})
export class UnpaidInvoiceListPageModule {}
