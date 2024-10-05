import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentReportPageRoutingModule } from './payment-report-routing.module';
import { PaymentReportPage } from './payment-report.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { DateRangePikerModule } from 'src/app/layout/components/date-range-picker/date-range-piker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DateRangePikerModule,
    PaymentReportPageRoutingModule
  ],
  declarations: [PaymentReportPage]
})
export class PaymentReportPageModule {}
