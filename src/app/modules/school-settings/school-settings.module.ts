import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolSettingsPageRoutingModule } from './school-settings-routing.module';

import { SchoolSettingsPage } from './school-settings.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    SchoolSettingsPageRoutingModule
  ],
  declarations: [SchoolSettingsPage]
})
export class SchoolSettingsPageModule {}
