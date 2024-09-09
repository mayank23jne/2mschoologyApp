import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageClassPageRoutingModule } from './manage-class-routing.module';

import { ManageClassPage } from './manage-class.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ManageClassPageRoutingModule
  ],
  declarations: [ManageClassPage]
})
export class ManageClassPageModule {}
