import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanStripePaymentPageRoutingModule } from './plan-stripe-payment-routing.module';

import { PlanStripePaymentPage } from './plan-stripe-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanStripePaymentPageRoutingModule
  ],
  declarations: [PlanStripePaymentPage]
})
export class PlanStripePaymentPageModule {}
