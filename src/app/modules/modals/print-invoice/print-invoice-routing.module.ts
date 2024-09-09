import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintInvoicePage } from './print-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: PrintInvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintInvoicePageRoutingModule {}
