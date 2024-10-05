import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmtpSettingsPageRoutingModule } from './smtp-settings-routing.module';

import { SmtpSettingsPage } from './smtp-settings.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    SmtpSettingsPageRoutingModule
  ],
  declarations: [SmtpSettingsPage]
})
export class SmtpSettingsPageModule {}
