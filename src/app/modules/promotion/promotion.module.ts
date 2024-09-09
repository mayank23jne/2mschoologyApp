import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PromotionPageRoutingModule } from './promotion-routing.module';
import { PromotionPage } from './promotion.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PromotionPageRoutingModule
  ],
  declarations: [PromotionPage]
})
export class PromotionPageModule {}
