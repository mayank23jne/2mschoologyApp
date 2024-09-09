import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrarianPage } from './librarian.page';

const routes: Routes = [
  {
    path: '',
    component: LibrarianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrarianPageRoutingModule {}
