import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassRoutineInfoPage } from './class-routine-info.page';

const routes: Routes = [
  {
    path: '',
    component: ClassRoutineInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassRoutineInfoPageRoutingModule {}
