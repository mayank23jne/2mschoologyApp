import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSyllabusPage } from './add-syllabus.page';

const routes: Routes = [
  {
    path: '',
    component: AddSyllabusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSyllabusPageRoutingModule {}
