import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanPaymentsPageRoutingModule } from './plan-payments-routing.module';

import { PlanPaymentsPage } from './plan-payments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanPaymentsPageRoutingModule
  ],
  declarations: [PlanPaymentsPage]
})
export class PlanPaymentsPageModule {}
