import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MarksPageRoutingModule } from './marks-routing.module';
import { MarksPage } from './marks.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { ClassSectionFilterModule } from 'src/app/layout/components/class-filter/class-filter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClassSectionFilterModule,
    MarksPageRoutingModule
  ],
  declarations: [MarksPage]
})
export class MarksPageModule {}
