import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PermissionPageRoutingModule } from './permission-routing.module';
import { PermissionPage } from './permission.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { ClassSectionFilterModule } from 'src/app/layout/components/class-filter/class-filter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    ClassSectionFilterModule,
    PermissionPageRoutingModule
  ],
  declarations: [PermissionPage]
})
export class PermissionPageModule {}
