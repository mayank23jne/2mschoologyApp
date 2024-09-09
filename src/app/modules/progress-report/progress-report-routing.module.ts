import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressReportPage } from './progress-report.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressReportPageRoutingModule {}
