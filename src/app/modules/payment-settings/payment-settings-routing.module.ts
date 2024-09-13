import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentSettingsPage } from './payment-settings.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentSettingsPageRoutingModule {}
