import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TakeAttendancePageRoutingModule } from './take-attendance-routing.module';
import { TakeAttendancePage } from './take-attendance.page';
import { ClassSectionFilterModule } from 'src/app/layout/components/class-filter/class-filter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClassSectionFilterModule,
    TakeAttendancePageRoutingModule
  ],
  declarations: [TakeAttendancePage]
})
export class TakeAttendancePageModule {}
