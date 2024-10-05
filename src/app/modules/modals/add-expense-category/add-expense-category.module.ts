import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddExpenseCategoryPageRoutingModule } from './add-expense-category-routing.module';

import { AddExpenseCategoryPage } from './add-expense-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddExpenseCategoryPageRoutingModule
  ],
  declarations: [AddExpenseCategoryPage]
})
export class AddExpenseCategoryPageModule {}
