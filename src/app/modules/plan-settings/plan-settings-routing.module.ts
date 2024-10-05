import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanSettingsPage } from './plan-settings.page';

const routes: Routes = [
  {
    path: '',
    component: PlanSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanSettingsPageRoutingModule {}
