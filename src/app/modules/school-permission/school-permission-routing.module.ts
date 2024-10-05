import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolPermissionPage } from './school-permission.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolPermissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolPermissionPageRoutingModule {}
