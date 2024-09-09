import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExamPageRoutingModule } from './exam-routing.module';
import { ExamPage } from './exam.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ExamPageRoutingModule
  ],
  declarations: [ExamPage]
})
export class ExamPageModule {}
