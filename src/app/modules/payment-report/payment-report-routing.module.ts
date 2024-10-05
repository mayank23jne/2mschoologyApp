import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentReportPage } from './payment-report.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentReportPageRoutingModule {}
