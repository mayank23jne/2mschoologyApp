import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrarianPageRoutingModule } from './librarian-routing.module';

import { LibrarianPage } from './librarian.page';
import { SharedModule } from 'src/app/layout/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LibrarianPageRoutingModule
  ],
  declarations: [LibrarianPage]
})
export class LibrarianPageModule {}
