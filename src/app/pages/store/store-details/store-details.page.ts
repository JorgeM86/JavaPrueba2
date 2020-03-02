import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../providers/data/data.service';
import {Products} from '../../../models/types/types.model';
import {AlertController, ModalController} from '@ionic/angular';
import {StoreBuyPage} from '../store-buy/store-buy.page';
import {ActivatedRoute, Router} from '@angular/router';
import {StoreService} from '../../../providers/store/store.service';
import {UserService} from '../../../providers/user/user.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.page.html',
  styleUrls: ['./store-details.page.scss'],
})
export class StoreDetailsPage implements OnInit {

  product: Products;

  constructor(private storeService: StoreService, private userService: UserService, private dataService: DataService,
              private modalCtrl: ModalController, private alertCtrl: AlertController, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    if (this.dataService.selectedProduct) {
      this.product = this.dataService.selectedProduct;
    } else {
      this.storeService.getAllTypes().subscribe(resp => {
        if (resp.status === 'success') {
          this.storeService.setTypesData(resp.data);
          this.findProduct();
        } else {
          this.router.navigate(['/']);
        }
      });
    }
  }

  findProduct() {
    const type = this.route.snapshot.paramMap.get('param2');
    const product = this.route.snapshot.paramMap.get('param3');
    if (type && product) {
      const typeFound = this.storeService.typesList.find(obj => obj.name.toLowerCase() === decodeURI(type).toLowerCase());
      this.product = typeFound.products.find(obj => obj.name.replace(/ /g, '_')
          .toLowerCase() === decodeURI(product).replace(/ /g, '_').toLowerCase());
    } else {
      this.router.navigate(['/']);
    }
  }

  async onBuyProduct(event) {
    if (!this.userService.userSignIn) {
      const alert1 = this.alertCtrl.create({
        message: 'Debes de iniciar sesion para realizar una compra',
        mode: 'md',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Entrar',
          handler: () => {
            this.dataService.previewsPage = this.router.url;
            this.router.navigate(['/sign_in']);
          }
        }]
      });
      await alert1.then(a => a.present());
    } else {
      if (this.product.quantity <= 0) {
        const alert1 = this.alertCtrl.create({
          message: 'Lo sentimos, este producto esta agotado.',
          mode: 'md',
          buttons: ['Aceptar']
        });
        await alert1.then(a => a.present());
      } else {
        this.dataService.previewsPage = this.router.url;
        const modal = await this.modalCtrl.create({
          component: StoreBuyPage,
          componentProps: {value: event},
          mode: 'ios',
        });

        modal.onDidDismiss().then( (result: any) => {
          if (result.data) {
            for (const types of this.storeService.typesList) {
              for (const item of types.products) {
                if (item.productID === this.product.productID) {
                  item.quantity = item.quantity - result.data;
                  /*this.product.quantity = this.product.quantity - result.data;*/
                  break;
                }
              }
            }
          }
        });
        await modal.present();
      }
    }
  }

}
