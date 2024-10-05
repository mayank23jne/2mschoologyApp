import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubInvoicesPage } from './sub-invoices.page';

const routes: Routes = [
  {
    path: '',
    component: SubInvoicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubInvoicesPageRoutingModule {}
