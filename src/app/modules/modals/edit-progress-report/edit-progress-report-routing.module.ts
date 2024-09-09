import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProgressReportPage } from './edit-progress-report.page';

const routes: Routes = [
  {
    path: '',
    component: EditProgressReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProgressReportPageRoutingModule {}
