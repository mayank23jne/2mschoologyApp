import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolMasterPageRoutingModule } from './school-master-routing.module';

import { SchoolMasterPage } from './school-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SchoolMasterPageRoutingModule
  ],
  declarations: [SchoolMasterPage]
})
export class SchoolMasterPageModule {}
