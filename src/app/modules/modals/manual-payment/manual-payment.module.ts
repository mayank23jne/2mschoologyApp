import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ManualPaymentPageRoutingModule } from './manual-payment-routing.module';
import { ManualPaymentPage } from './manual-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ManualPaymentPageRoutingModule
  ],
  declarations: [ManualPaymentPage]
})
export class ManualPaymentPageModule {}
