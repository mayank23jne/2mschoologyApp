import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMarksPage } from './update-marks.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMarksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMarksPageRoutingModule {}
