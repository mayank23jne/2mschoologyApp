import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdatePlanPageRoutingModule } from './update-plan-routing.module';
import { UpdatePlanPage } from './update-plan.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    UpdatePlanPageRoutingModule
  ],
  declarations: [UpdatePlanPage]
})
export class UpdatePlanPageModule {}
