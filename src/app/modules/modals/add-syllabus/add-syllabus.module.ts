import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSyllabusPageRoutingModule } from './add-syllabus-routing.module';

import { AddSyllabusPage } from './add-syllabus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddSyllabusPageRoutingModule
  ],
  declarations: [AddSyllabusPage]
})
export class AddSyllabusPageModule {}
