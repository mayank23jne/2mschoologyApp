import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassRoutineAddPage } from './class-routine-add.page';

const routes: Routes = [
  {
    path: '',
    component: ClassRoutineAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassRoutineAddPageRoutingModule {}
