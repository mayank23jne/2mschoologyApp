import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlanSettingsPageRoutingModule } from './plan-settings-routing.module';
import { PlanSettingsPage } from './plan-settings.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PlanSettingsPageRoutingModule
  ],
  declarations: [PlanSettingsPage]
})
export class PlanSettingsPageModule {}
