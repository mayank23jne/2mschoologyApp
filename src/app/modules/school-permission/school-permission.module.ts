import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolPermissionPageRoutingModule } from './school-permission-routing.module';

import { SchoolPermissionPage } from './school-permission.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SchoolPermissionPageRoutingModule
  ],
  declarations: [SchoolPermissionPage]
})
export class SchoolPermissionPageModule {}
