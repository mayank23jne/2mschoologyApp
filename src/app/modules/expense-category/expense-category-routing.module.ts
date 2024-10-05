import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseCategoryPage } from './expense-category.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseCategoryPageRoutingModule {}
