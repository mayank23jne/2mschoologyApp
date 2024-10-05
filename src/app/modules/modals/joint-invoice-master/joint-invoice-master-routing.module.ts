import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JointInvoiceMasterPage } from './joint-invoice-master.page';

const routes: Routes = [
  {
    path: '',
    component: JointInvoiceMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JointInvoiceMasterPageRoutingModule {}
