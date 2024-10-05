import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateClientPage } from './create-client.page';

const routes: Routes = [
  {
    path: '',
    component: CreateClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateClientPageRoutingModule {}
