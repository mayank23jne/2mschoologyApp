import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SendsmssettingPageRoutingModule } from './sendsmssetting-routing.module';
import { SendsmssettingPage } from './sendsmssetting.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    SendsmssettingPageRoutingModule
  ],
  declarations: [SendsmssettingPage]
})
export class SendsmssettingPageModule {}
