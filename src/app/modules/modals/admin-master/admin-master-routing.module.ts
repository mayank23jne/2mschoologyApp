import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMasterPage } from './admin-master.page';

const routes: Routes = [
  {
    path: '',
    component: AdminMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminMasterPageRoutingModule {}
