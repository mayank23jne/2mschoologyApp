import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsCalenderPageRoutingModule } from './events-calender-routing.module';

import { EventsCalenderPage } from './events-calender.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { NgCalendarModule } from 'ionic7-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EventsCalenderPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [EventsCalenderPage]
})
export class EventsCalenderPageModule {}
