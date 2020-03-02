import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreAdminPageRoutingModule } from './store-admin-routing.module';

import { StoreAdminPage } from './store-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreAdminPageRoutingModule
  ],
  declarations: [StoreAdminPage]
})
export class StoreAdminPageModule {}
