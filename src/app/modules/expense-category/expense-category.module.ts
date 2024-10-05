import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseCategoryPageRoutingModule } from './expense-category-routing.module';

import { ExpenseCategoryPage } from './expense-category.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ExpenseCategoryPageRoutingModule
  ],
  declarations: [ExpenseCategoryPage]
})
export class ExpenseCategoryPageModule {}
