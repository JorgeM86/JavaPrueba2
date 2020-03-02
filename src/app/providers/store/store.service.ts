import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ProductsModel } from '../../models/products/products.model';
import { CategoriesModel} from '../../models/categories/categories.model';
import {TypesModel} from '../../models/types/types.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  productsList: ProductsModel[] = [];
  categoriesList: CategoriesModel[] = [];
  typesList: TypesModel[] = [];

  constructor(public api: ApiService) { }

  getAllProducts() {
    return this.api.get('/products/all');
  }

  getAllCategories() {
    return this.api.get('/categories/all');
  }

  getAllTypes() {
    return this.api.get('/types/all');
  }

  saveProduct(body) {
    return this.api.post('/products/save', body);
  }

  removeProduct(body) {
    return this.api.post('/products/delete', body);
  }

  saveReceipt(body) {
    return this.api.post('/receipts/save', body);
  }

  setProductsData(data) {
    this.productsList = [];
    for (const item of data) {
      this.productsList.push(new ProductsModel(item));
    }
    this.sortProducts();
  }

  setCategoriesData(data) {
    this.categoriesList = [];
    for (const item of data) {
      this.categoriesList.push(new CategoriesModel(item));
    }
    this.sortCategories();
  }

  setTypesData(data) {
    this.typesList = [];
    for (const item of data) {
      this.typesList.push(new TypesModel(item));
    }
    this.sortTypes();
  }

  sortProducts() {
    this.productsList.sort( (object1, object2) => {
      if ( object1.productID < object2.productID ) {
        return -1;
      } else if ( object1.productID > object2.productID ) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  sortCategories() {
    this.categoriesList.sort( (object1, object2) => {
      if ( object1.categoryID < object2.categoryID ) {
        return -1;
      } else if ( object1.categoryID > object2.categoryID ) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  sortTypes() {
    this.typesList.sort( (object1, object2) => {
      if ( object1.typeID < object2.typeID ) {
        return -1;
      } else if ( object1.typeID > object2.typeID ) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
