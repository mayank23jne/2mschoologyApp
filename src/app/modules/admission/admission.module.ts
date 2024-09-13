import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdmissionPageRoutingModule } from './admission-routing.module';
import { AdmissionPage } from './admission.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { ClassSectionFilterModule } from 'src/app/layout/components/class-filter/class-filter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    ClassSectionFilterModule,
    AdmissionPageRoutingModule
  ],
  declarations: [AdmissionPage]
})
export class AdmissionPageModule {}
