import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMarksPageRoutingModule } from './update-marks-routing.module';

import { UpdateMarksPage } from './update-marks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateMarksPageRoutingModule
  ],
  declarations: [UpdateMarksPage]
})
export class UpdateMarksPageModule {}
