import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClassFilterComponent } from './class-filter.component';

@NgModule({
  declarations: [ClassFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [ClassFilterComponent]
})
export class ClassSectionFilterModule { }