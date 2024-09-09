import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsCalenderPage } from './events-calender.page';

const routes: Routes = [
  {
    path: '',
    component: EventsCalenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsCalenderPageRoutingModule {}
