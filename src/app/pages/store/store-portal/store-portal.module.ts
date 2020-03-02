import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorePortalPageRoutingModule } from './store-portal-routing.module';

import { StorePortalPage } from './store-portal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorePortalPageRoutingModule
  ],
  declarations: [StorePortalPage]
})
export class StorePortalPageModule {}
