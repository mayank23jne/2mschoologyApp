import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressReportPageRoutingModule } from './progress-report-routing.module';

import { ProgressReportPage } from './progress-report.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ProgressReportPageRoutingModule
  ],
  declarations: [ProgressReportPage]
})
export class ProgressReportPageModule {}
