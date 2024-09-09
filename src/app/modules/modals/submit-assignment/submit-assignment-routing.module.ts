import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitAssignmentPage } from './submit-assignment.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitAssignmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitAssignmentPageRoutingModule {}
