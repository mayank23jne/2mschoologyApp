import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceChartPageRoutingModule } from './invoice-chart-routing.module';

import { InvoiceChartPage } from './invoice-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceChartPageRoutingModule
  ],
  declarations: [InvoiceChartPage]
})
export class InvoiceChartPageModule {}
