import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTeacherPermissionPage } from './add-teacher-permission.page';

const routes: Routes = [
  {
    path: '',
    component: AddTeacherPermissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTeacherPermissionPageRoutingModule {}
