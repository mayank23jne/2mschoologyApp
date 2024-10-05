import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateinvoicePage } from './generateinvoice.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateinvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateinvoicePageRoutingModule {}
