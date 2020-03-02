import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreBuyPage } from './store-buy.page';

const routes: Routes = [
  {
    path: '',
    component: StoreBuyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreBuyPageRoutingModule {}
