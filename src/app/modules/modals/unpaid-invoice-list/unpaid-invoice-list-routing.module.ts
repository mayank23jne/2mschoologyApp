import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnpaidInvoiceListPage } from './unpaid-invoice-list.page';

const routes: Routes = [
  {
    path: '',
    component: UnpaidInvoiceListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnpaidInvoiceListPageRoutingModule {}
