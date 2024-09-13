import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AttendanceReportPageRoutingModule } from './attendance-report-routing.module';
import { AttendanceReportPage } from './attendance-report.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { NgCalendarModule } from 'ionic7-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgCalendarModule,
    AttendanceReportPageRoutingModule
  ],
  declarations: [AttendanceReportPage]
})
export class AttendanceReportPageModule {}
