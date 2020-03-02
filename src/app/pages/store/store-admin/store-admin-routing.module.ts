import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreAdminPage } from './store-admin.page';

const routes: Routes = [
  {
    path: '',
    component: StoreAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreAdminPageRoutingModule {}
