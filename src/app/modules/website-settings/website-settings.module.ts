import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebsiteSettingsPageRoutingModule } from './website-settings-routing.module';

import { WebsiteSettingsPage } from './website-settings.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    WebsiteSettingsPageRoutingModule
  ],
  declarations: [WebsiteSettingsPage]
})
export class WebsiteSettingsPageModule {}
