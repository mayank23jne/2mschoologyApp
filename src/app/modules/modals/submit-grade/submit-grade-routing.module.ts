import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitGradePage } from './submit-grade.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitGradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitGradePageRoutingModule {}
