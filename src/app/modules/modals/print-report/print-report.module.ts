import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintReportPageRoutingModule } from './print-report-routing.module';

import { PrintReportPage } from './print-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintReportPageRoutingModule
  ],
  declarations: [PrintReportPage]
})
export class PrintReportPageModule {}
