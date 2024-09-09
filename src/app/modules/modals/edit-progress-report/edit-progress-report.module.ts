import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProgressReportPageRoutingModule } from './edit-progress-report-routing.module';

import { EditProgressReportPage } from './edit-progress-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditProgressReportPageRoutingModule
  ],
  declarations: [EditProgressReportPage]
})
export class EditProgressReportPageModule {}
