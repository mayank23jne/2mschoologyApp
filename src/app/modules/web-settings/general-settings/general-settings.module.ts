import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralSettingsPageRoutingModule } from './general-settings-routing.module';

import { GeneralSettingsPage } from './general-settings.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    GeneralSettingsPageRoutingModule
  ],
  declarations: [GeneralSettingsPage]
})
export class GeneralSettingsPageModule {}
