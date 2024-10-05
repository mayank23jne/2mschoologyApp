import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmtpSettingsPage } from './smtp-settings.page';

const routes: Routes = [
  {
    path: '',
    component: SmtpSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmtpSettingsPageRoutingModule {}
