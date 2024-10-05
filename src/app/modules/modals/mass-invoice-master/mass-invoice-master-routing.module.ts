import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MassInvoiceMasterPage } from './mass-invoice-master.page';

const routes: Routes = [
  {
    path: '',
    component: MassInvoiceMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MassInvoiceMasterPageRoutingModule {}
