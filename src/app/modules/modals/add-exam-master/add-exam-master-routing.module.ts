import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExamMasterPage } from './add-exam-master.page';

const routes: Routes = [
  {
    path: '',
    component: AddExamMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExamMasterPageRoutingModule {}
