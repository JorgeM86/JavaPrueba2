import {Component, Input, OnInit} from '@angular/core';
import {TypesModel} from '../../../models/types/types.model';
import {CategoriesModel} from '../../../models/categories/categories.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {UserService} from '../../../providers/user/user.service';
import {StoreService} from '../../../providers/store/store.service';
import {DataService} from '../../../providers/data/data.service';

@Component({
  selector: 'app-store-buy',
  templateUrl: './store-buy.page.html',
  styleUrls: ['./store-buy.page.scss'],
})
export class StoreBuyPage implements OnInit {

  submitted = false;
  @Input() value: any;
  receiptFormGroup: FormGroup;
  typeList: TypesModel;
  categoriesList: CategoriesModel;

  constructor(private storeService: StoreService, private userService: UserService, private formBuilder: FormBuilder,
              private modalCtrl: ModalController, private alertCtrl: AlertController, private loadingCtrl: LoadingController,
              private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.receiptFormGroup = this.formBuilder.group({
      totalQuantity: [1, Validators.required]
    });
  }

  get f1() { return this.receiptFormGroup.controls; }

  onCloseModal() {
    this.modalCtrl.dismiss();
  }

  onCreateReceipt() {

    if (this.receiptFormGroup.value.totalQuantity > this.value.quantity) {
      const alert1 = this.alertCtrl.create({
        message: 'Lo sentimos, no se posee esa cantidad del producto, solo hay ' + this.value.quantity + ' unidades disponibles.',
        mode: 'md',
        buttons: ['Aceptar']
      });
      alert1.then(a => a.present());
      return;
    }

    const userBody = {
      total_price: this.receiptFormGroup.value.totalQuantity * this.value.price,
      total_quantity: this.receiptFormGroup.value.totalQuantity,
      product_fk: this.value.productID,
      user_fk: this.userService.userID,
      date: new Date()
    };

    const formData = new FormData();
    formData.append('receipt_info', JSON.stringify(userBody));

    const loadingService = this.loadingCtrl.create({ message: 'Cargando...' });

    loadingService.then(a => a.present());
    this.storeService.saveReceipt(formData).subscribe(res => {
      if (res.status === 'success') {
        const alert = this.alertCtrl.create({
          header: 'Compra exitosa',
          mode: 'md',
          buttons: [{
            text: 'Volver a la tienda',
            role: 'cancel',
            handler: () => {
              this.router.navigate([this.dataService.previewsPage]);
              this.dataService.previewsPage = null;
            }
          }, {
            text: 'Ir a tus compras',
            handler: () => {
              this.router.navigate(['/receipts']);
            }
          }]
        });
        alert.then(a => a.present());
        this.modalCtrl.dismiss(this.receiptFormGroup.value.totalQuantity);
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
