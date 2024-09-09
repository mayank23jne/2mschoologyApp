import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClassRoomPageRoutingModule } from './class-room-routing.module';
import { ClassRoomPage } from './class-room.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClassRoomPageRoutingModule
  ],
  declarations: [ClassRoomPage]
})
export class ClassRoomPageModule {}
