import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubInvoicesPageRoutingModule } from './sub-invoices-routing.module';

import { SubInvoicesPage } from './sub-invoices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubInvoicesPageRoutingModule
  ],
  declarations: [SubInvoicesPage]
})
export class SubInvoicesPageModule {}
