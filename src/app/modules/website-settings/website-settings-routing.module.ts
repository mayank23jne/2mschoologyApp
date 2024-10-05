import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebsiteSettingsPage } from './website-settings.page';

const routes: Routes = [
  {
    path: '',
    component: WebsiteSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteSettingsPageRoutingModule {}
