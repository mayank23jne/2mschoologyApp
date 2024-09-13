import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassRoutineAddPageRoutingModule } from './class-routine-add-routing.module';

import { ClassRoutineAddPage } from './class-routine-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClassRoutineAddPageRoutingModule
  ],
  declarations: [ClassRoutineAddPage]
})
export class ClassRoutineAddPageModule {}
