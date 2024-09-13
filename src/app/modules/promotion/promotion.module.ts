import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PromotionPageRoutingModule } from './promotion-routing.module';
import { PromotionPage } from './promotion.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { ClassSectionFilterModule } from 'src/app/layout/components/class-filter/class-filter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClassSectionFilterModule,
    PromotionPageRoutingModule
  ],
  declarations: [PromotionPage]
})
export class PromotionPageModule {}
