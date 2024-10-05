import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceMasterPage } from './invoice-master.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceMasterPageRoutingModule {}
