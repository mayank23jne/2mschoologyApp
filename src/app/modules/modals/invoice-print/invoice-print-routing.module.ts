import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicePrintPage } from './invoice-print.page';

const routes: Routes = [
  {
    path: '',
    component: InvoicePrintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicePrintPageRoutingModule {}
