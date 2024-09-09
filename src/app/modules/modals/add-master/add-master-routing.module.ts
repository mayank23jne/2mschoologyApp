import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMasterPage } from './add-master.page';

const routes: Routes = [
  {
    path: '',
    component: AddMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMasterPageRoutingModule {}
