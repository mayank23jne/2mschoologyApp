import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanStripePaymentPage } from './plan-stripe-payment.page';

const routes: Routes = [
  {
    path: '',
    component: PlanStripePaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanStripePaymentPageRoutingModule {}
