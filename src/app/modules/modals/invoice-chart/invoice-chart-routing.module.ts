import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceChartPage } from './invoice-chart.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceChartPageRoutingModule {}
