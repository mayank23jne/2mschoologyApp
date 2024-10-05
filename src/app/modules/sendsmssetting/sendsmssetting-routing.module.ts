import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendsmssettingPage } from './sendsmssetting.page';

const routes: Routes = [
  {
    path: '',
    component: SendsmssettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendsmssettingPageRoutingModule {}
