import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceInfoPage } from './invoice-info.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceInfoPageRoutingModule {}
