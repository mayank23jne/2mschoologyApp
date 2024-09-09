import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUserMasterPage } from './add-user-master.page';

const routes: Routes = [
  {
    path: '',
    component: AddUserMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUserMasterPageRoutingModule {}
