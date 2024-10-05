import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadCsvMasterPage } from './upload-csv-master.page';

const routes: Routes = [
  {
    path: '',
    component: UploadCsvMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadCsvMasterPageRoutingModule {}
