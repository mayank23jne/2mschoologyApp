import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JointMassInvoiceMasterPage } from './joint-mass-invoice-master.page';

const routes: Routes = [
  {
    path: '',
    component: JointMassInvoiceMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JointMassInvoiceMasterPageRoutingModule {}
