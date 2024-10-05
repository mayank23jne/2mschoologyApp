import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SmsPageRoutingModule } from './sms-routing.module';
import { SmsPage } from './sms.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SmsPageRoutingModule
  ],
  declarations: [SmsPage]
})
export class SmsPageModule {}
