import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../providers/store/store.service';
import {DataService} from '../../../providers/data/data.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Products, TypesModel} from '../../../models/types/types.model';
import {UserService} from '../../../providers/user/user.service';
import {CategoriesModel} from '../../../models/categories/categories.model';
import {ProductsModel} from '../../../models/products/products.model';

@Component({
  selector: 'app-store-portal',
  templateUrl: './store-portal.page.html',
  styleUrls: ['./store-portal.page.scss'],
})
export class StorePortalPage implements OnInit {

  type: string;
  showObject: any[];
  index =  0;
  allTypes: TypesModel[];


  constructor(private storeService: StoreService, private userService: UserService, private dataService: DataService,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.storeService.typesList.length <= 0) {
      this.getAllTypes();
    } else {
      this.index = 0;
      this.allTypes = this.storeService.typesList;
      this.type = this.allTypes[this.index].name;
      this.showObject = this.allTypes[this.index].products.filter(obj => obj.category.name.toLowerCase().includes('marvel'));
    }

    /*if (this.storeService.productsList.length <= 0) {
      this.getAllProducts();
    } else {
      this.productsList = this.storeService.productsList;
    }

    if (this.storeService.categoriesList.length <= 0) {
      this.getAllCategories();
    } else {
      this.categoriesList = this.storeService.categoriesList;
    }*/

  }

  segmentChanged(ev: any) {
    if (Number(this.index) === 0) {
      this.showObject = this.allTypes[0].products.filter(obj => obj.category.name.toLowerCase().includes('marvel'));
    }
    if (Number(this.index) === 1) {
      this.showObject = this.allTypes[0].products.filter(obj => obj.category.name.toLowerCase().includes('dc'));
    }
    if (Number(this.index) === 2) {
      this.showObject = this.allTypes[0].products.filter(obj => obj.category.name.toLowerCase().includes('otro'));
    }
  }

 /* separateMarvelProducts() {
    const a = this.storeService.typesList.map(obj => ({...obj}));
    for (const item1 of a) {
      const p1 = [];
      for (const item of item1.products) {
        if (item.category.name.toLowerCase().includes('marvel')) {
          p1.push(item);
        }
      }
      item1.products = p1;
    }
    this.type = a[0].name;
    this.products = a[0].products;
    return a;
  }

  separateDCProducts() {
    const a = this.storeService.typesList.map(obj => ({...obj}));
    for (const item1 of a) {
      const p1 = [];
      for (const item of item1.products) {
        if (item.category.name.toLowerCase().includes('dc')) {
          p1.push(item);
        }
      }
      item1.products = p1;
    }
    /!*this.type = a[0].name;
    this.products = a[0].products;*!/
    return a;
  }*/

  getAllTypes() {
    this.storeService.getAllTypes().subscribe(res => {
      if (res.status === 'success') {
        this.storeService.setTypesData(res.data);
        this.allTypes = this.storeService.typesList;
        this.showObject = this.allTypes[0].products.filter(obj => obj.category.name.toLowerCase().includes('marvel'));
        this.type = this.allTypes[0].name;
      } else {
        const alert = this.alertCtrl.create({
          message: 'A ocurrido un error al traer la lista de typos, intenta mas tarde. ',
          mode: 'md',
          buttons: ['OK']
        });
        alert.then(a => a.present());
      }
    }, error => {
      const alert = this.alertCtrl.create({
        header: 'Error Desconocido',
        message: error.toString(),
        mode: 'md',
        buttons: ['OK']
      });
      alert.then(a => a.present());
    });
  }

  /*getAllProducts() {
    this.storeService.getAllProducts().subscribe(res => {
      if (res.status === 'success') {
        this.storeService.setProductsData(res.data);
        this.productsList = this.storeService.productsList;
      } else {
        const alert = this.alertCtrl.create({
          message: 'A ocurrido un error al traer la lista de productos, intenta mas tarde. ',
          mode: 'md',
          buttons: ['OK']
        });
        alert.then(a => a.present());
      }
    }, error => {
      const alert = this.alertCtrl.create({
        header: 'Error Desconocido',
        message: error.toString(),
        mode: 'md',
        buttons: ['OK']
      });
      alert.then(a => a.present());
    });
  }

  getAllCategories() {
    this.storeService.getAllCategories().subscribe(res => {
      if (res.status === 'success') {
        this.storeService.setCategoriesData(res.data);
        this.categoriesList = this.storeService.categoriesList;
      } else {
        const alert = this.alertCtrl.create({
          message: 'A ocurrido un error al traer la lista de productos, intenta mas tarde. ',
          mode: 'md',
          buttons: ['OK']
        });
        alert.then(a => a.present());
      }
    }, error => {
      const alert = this.alertCtrl.create({
        header: 'Error Desconocido',
        message: error.toString(),
        mode: 'md',
        buttons: ['OK']
      });
      alert.then(a => a.present());
    });
  }*/

  setProducts(data, name) {
    if (Number(this.index) === 0) {
      this.showObject = data.filter(obj => obj.category.name.toLowerCase().includes('marvel'));
    }
    if (Number(this.index) === 1) {
      this.showObject = data.filter(obj => obj.category.name.toLowerCase().includes('dc'));
    }
    if (Number(this.index) === 2) {
      this.showObject = data.filter(obj => obj.category.name.toLowerCase().includes('otros'));
    }
    this.type = name;
  }

  goToDetails(data: Products) {
    this.dataService.selectedProduct = data;
    this.router.navigate(['/store-details/' + data.category.name + '/' + this.type + '/' + data.name.replace(/ /g, '_')]);
  }

}
