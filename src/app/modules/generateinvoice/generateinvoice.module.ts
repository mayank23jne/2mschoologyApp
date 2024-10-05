import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenerateinvoicePageRoutingModule } from './generateinvoice-routing.module';
import { GenerateinvoicePage } from './generateinvoice.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GenerateinvoicePageRoutingModule
  ],
  declarations: [GenerateinvoicePage]
})
export class GenerateinvoicePageModule {}
