import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProgressReportPage } from './create-progress-report.page';

const routes: Routes = [
  {
    path: '',
    component: CreateProgressReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateProgressReportPageRoutingModule {}
