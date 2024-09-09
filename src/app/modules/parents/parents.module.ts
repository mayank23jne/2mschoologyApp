import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParentsPageRoutingModule } from './parents-routing.module';

import { ParentsPage } from './parents.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ParentsPageRoutingModule
  ],
  declarations: [ParentsPage]
})
export class ParentsPageModule {}
