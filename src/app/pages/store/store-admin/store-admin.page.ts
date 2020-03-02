import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../providers/store/store.service';
import {UserService} from '../../../providers/user/user.service';
import {DataService} from '../../../providers/data/data.service';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ProductsModel} from '../../../models/products/products.model';
import {ProductsDetailsPage} from '../../admin/products-details/products-details.page';
import {CategoriesModel} from '../../../models/categories/categories.model';
import {TypesModel} from '../../../models/types/types.model';

@Component({
  selector: 'app-store-admin',
  templateUrl: './store-admin.page.html',
  styleUrls: ['./store-admin.page.scss'],
})
export class StoreAdminPage implements OnInit {

  productsList: ProductsModel[] = [];
  categoriesList: CategoriesModel[] = [];
  typesList: TypesModel[] = [];
  index = 1;

  constructor(private storeService: StoreService, private userService: UserService, private dataService: DataService,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController, private router: Router,
              private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getAllProducts();
    this.getAllCategories();
    this.getAllTypes();
  }

  segmentChanged(ev: any) {
    if (Number(ev.detail.value) === 1) {
      this.productsList = this.storeService.productsList.filter(obj => obj.category.name.toLowerCase().includes('marvel'));
    }
    if (Number(ev.detail.value) === 2) {
      this.productsList = this.storeService.productsList.filter(obj => obj.category.name.toLowerCase().includes('dc'));
    }
    if (Number(ev.detail.value) === 3) {
      this.productsList = this.storeService.productsList.filter(obj => obj.category.name.toLowerCase().includes('otros'));
    }
  }

  getAllProducts() {
    this.storeService.getAllProducts().subscribe(res => {
      if (res.status === 'success') {
        this.storeService.setProductsData(res.data);
        this.productsList = this.storeService.productsList.filter(obj => obj.category.name.toLowerCase().includes('marvel'));
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
  }

  getAllTypes() {
    this.storeService.getAllTypes().subscribe(res => {
      if (res.status === 'success') {
        this.storeService.setTypesData(res.data);
        this.typesList = this.storeService.typesList;
      } else {
        const alert = this.alertCtrl.create({
          message: 'A ocurrido un error al traer la lista de types, intenta mas tarde. ',
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

  async onCreateProduct() {
    this.dataService.mode = 'Nuevo';
    const modal = await this.modalCtrl.create({
      component: ProductsDetailsPage,
      mode: 'ios',
    });

    modal.onDidDismiss().then( (result: any) => {
      if (result.data) {
        this.getAllProducts();
        this.getAllTypes();
      }
    });

    await modal.present();
  }

  async onUpdateProduct(event, index) {
    this.dataService.mode = 'Editar';
    const modal = await this.modalCtrl.create({
      component: ProductsDetailsPage,
      componentProps: {value: event},
      mode: 'ios',
    });

    modal.onDidDismiss().then( (result: any) => {
      if (result.data) {
        this.index = 1;
        this.getAllProducts();
        this.getAllTypes();
      }
    });

    await modal.present();
  }

  alertDeleteProduct(product) {
    const alert = this.alertCtrl.create({
      header: 'Eliminar Producto',
      message: '¿Estas seguro de eliminar este producto: ' + product.name + ' ?',
      mode: 'md',
      buttons: [{
        text: 'No, Cancelar',
        role: 'cancel',
      }, {
        text: 'Si, Aceptar',
        handler: () => {
          this.deleteProduct(product);
        }
      }]
    });
    alert.then(a => a.present());
  }

  deleteProduct(product) {

    const formData = new FormData();
    formData.append('product_info', JSON.stringify(product.productID));

    const loadingService = this.loadingCtrl.create({ message: 'Cargando...' });

    loadingService.then(a => a.present());
    this.storeService.removeProduct(formData).subscribe(res => {
      if (res.status === 'success') {
        const alert = this.alertCtrl.create({
          header: 'Se ha eliminado el producto exitosamente',
          mode: 'md',
          buttons: ['Aceptar']
        });
        alert.then(a => a.present());
      } else {
        const alert = this.alertCtrl.create({
          header: 'ERROR',
          message: 'Un error inesperado a ocurrido',
          mode: 'md',
          buttons: ['OK']
        });
        alert.then(a => a.present());
      }
      loadingService.then(a => a.dismiss());
    }, error => {
      const alert = this.alertCtrl.create({
        header: 'Error Desconocido',
        message: error.toString(),
        mode: 'md',
        buttons: ['OK']
      });
      loadingService.then(a => a.dismiss());
      alert.then(a => a.present());
    });
  }

}
