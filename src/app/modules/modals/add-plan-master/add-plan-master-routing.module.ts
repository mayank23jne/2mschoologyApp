import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlanMasterPage } from './add-plan-master.page';

const routes: Routes = [
  {
    path: '',
    component: AddPlanMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPlanMasterPageRoutingModule {}
