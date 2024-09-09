import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceInfoPageRoutingModule } from './invoice-info-routing.module';

import { InvoiceInfoPage } from './invoice-info.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    InvoiceInfoPageRoutingModule
  ],
  declarations: [InvoiceInfoPage]
})
export class InvoiceInfoPageModule {}
