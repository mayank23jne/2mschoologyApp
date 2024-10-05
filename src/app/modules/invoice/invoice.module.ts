import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InvoicePageRoutingModule } from './invoice-routing.module';
import { InvoicePage } from './invoice.page';
import { RoutinePageRoutingModule } from '../routine/routine-routing.module';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { DateRangePikerModule } from 'src/app/layout/components/date-range-picker/date-range-piker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DateRangePikerModule,
    InvoicePageRoutingModule,
    RoutinePageRoutingModule
  ],
  declarations: [InvoicePage]
})
export class InvoicePageModule {}
