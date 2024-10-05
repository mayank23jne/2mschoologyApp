import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DateRangePickerComponent } from './date-range-picker.component';

@NgModule({
  declarations: [DateRangePickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [DateRangePickerComponent]
})
export class DateRangePikerModule { }