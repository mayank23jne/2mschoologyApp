import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentReportInfoPageRoutingModule } from './payment-report-info-routing.module';

import { PaymentReportInfoPage } from './payment-report-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentReportInfoPageRoutingModule
  ],
  declarations: [PaymentReportInfoPage]
})
export class PaymentReportInfoPageModule {}
