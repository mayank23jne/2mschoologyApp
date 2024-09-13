import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentSettingsPageRoutingModule } from './payment-settings-routing.module';

import { PaymentSettingsPage } from './payment-settings.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    PaymentSettingsPageRoutingModule
  ],
  declarations: [PaymentSettingsPage]
})
export class PaymentSettingsPageModule {}
