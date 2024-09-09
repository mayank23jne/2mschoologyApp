import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakeAttendancePage } from './take-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: TakeAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeAttendancePageRoutingModule {}
