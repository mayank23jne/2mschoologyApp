import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageClassPage } from './manage-class.page';

const routes: Routes = [
  {
    path: '',
    component: ManageClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageClassPageRoutingModule {}
