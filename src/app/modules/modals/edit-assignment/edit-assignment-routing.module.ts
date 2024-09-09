import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAssignmentPage } from './edit-assignment.page';

const routes: Routes = [
  {
    path: '',
    component: EditAssignmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAssignmentPageRoutingModule {}
