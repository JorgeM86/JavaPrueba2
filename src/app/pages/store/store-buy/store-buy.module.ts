import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreBuyPageRoutingModule } from './store-buy-routing.module';

import { StoreBuyPage } from './store-buy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StoreBuyPageRoutingModule
  ],
  declarations: [StoreBuyPage]
})
export class StoreBuyPageModule {}
