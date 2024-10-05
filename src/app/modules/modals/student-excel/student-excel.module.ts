import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentExcelPageRoutingModule } from './student-excel-routing.module';

import { StudentExcelPage } from './student-excel.page';
import { ClassSectionFilterModule } from 'src/app/layout/components/class-filter/class-filter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassSectionFilterModule,
    StudentExcelPageRoutingModule
  ],
  declarations: [StudentExcelPage]
})
export class StudentExcelPageModule {}
