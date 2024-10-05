import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SystemSettingsPageRoutingModule } from './system-settings-routing.module';
import { SystemSettingsPage } from './system-settings.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    SystemSettingsPageRoutingModule
  ],
  declarations: [SystemSettingsPage]
})
export class SystemSettingsPageModule {}
