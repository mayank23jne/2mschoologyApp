import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutinePageRoutingModule } from './routine-routing.module';

import { RoutinePage } from './routine.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { ClassSectionFilterModule } from 'src/app/layout/components/class-filter/class-filter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutinePageRoutingModule,
    SharedModule,
    ClassSectionFilterModule,
  ],
  declarations: [RoutinePage]
})
export class RoutinePageModule {}
