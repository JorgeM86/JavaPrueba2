import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsDetailsPageRoutingModule } from './products-details-routing.module';

import { ProductsDetailsPage } from './products-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      ReactiveFormsModule,
    ProductsDetailsPageRoutingModule
  ],
  declarations: [ProductsDetailsPage]
})
export class ProductsDetailsPageModule {}
