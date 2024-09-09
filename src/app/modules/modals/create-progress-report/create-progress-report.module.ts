import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateProgressReportPageRoutingModule } from './create-progress-report-routing.module';

import { CreateProgressReportPage } from './create-progress-report.page';
import { ClassSectionFilterModule } from 'src/app/layout/components/class-filter/class-filter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClassSectionFilterModule,
    CreateProgressReportPageRoutingModule
  ],
  declarations: [CreateProgressReportPage]
})
export class CreateProgressReportPageModule {}
