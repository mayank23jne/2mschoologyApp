import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAssignmentPage } from './view-assignment.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAssignmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAssignmentPageRoutingModule {}
