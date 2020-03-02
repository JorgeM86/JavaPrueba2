import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  mode = '';
  selectedProduct: any;
  previewsPage: any = null;

  constructor() { }
}
