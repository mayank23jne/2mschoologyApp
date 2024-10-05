import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExpenseCategoryPage } from './add-expense-category.page';

const routes: Routes = [
  {
    path: '',
    component: AddExpenseCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExpenseCategoryPageRoutingModule {}
