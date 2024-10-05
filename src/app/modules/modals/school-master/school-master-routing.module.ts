import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolMasterPage } from './school-master.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolMasterPageRoutingModule {}
