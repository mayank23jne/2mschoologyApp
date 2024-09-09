import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassRoutineInfoPageRoutingModule } from './class-routine-info-routing.module';

import { ClassRoutineInfoPage } from './class-routine-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassRoutineInfoPageRoutingModule
  ],
  declarations: [ClassRoutineInfoPage]
})
export class ClassRoutineInfoPageModule {}
