import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorePortalPage } from './store-portal.page';

const routes: Routes = [
  {
    path: '',
    component: StorePortalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorePortalPageRoutingModule {}
