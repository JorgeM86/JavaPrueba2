import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TypesModel} from '../../../models/types/types.model';
import {CategoriesModel} from '../../../models/categories/categories.model';
import {StoreService} from '../../../providers/store/store.service';
import {UserService} from '../../../providers/user/user.service';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DataService} from '../../../providers/data/data.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.page.html',
  styleUrls: ['./products-details.page.scss'],
})
export class ProductsDetailsPage implements OnInit {

  mode: string;
  submitted = false;
  @Input() value: any;
  productFormGroup: FormGroup;
  typesList: TypesModel[];
  categoriesList: CategoriesModel[];

  constructor(private storeService: StoreService, private userService: UserService, private formBuilder: FormBuilder,
              private modalCtrl: ModalController, private alertCtrl: AlertController, private loadingCtrl: LoadingController,
              private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.mode = this.dataService.mode;
    this.categoriesList = this.storeService.categoriesList;
    this.typesList = this.storeService.typesList;

    if (this.mode === 'Nuevo') {
      this.productFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: [1, Validators.required],
        quantity: [1, Validators.required],
        category_fk: ['', Validators.required],
        type_fk: ['', Validators.required]
      });
    } else {
      this.productFormGroup = this.formBuilder.group({
        product_id: [this.value.productID],
        name: [this.value.name, Validators.required],
        description: [this.value.description, Validators.required],
        price: [this.value.price, Validators.required],
        quantity: [this.value.quantity, Validators.required],
        category_fk: [this.value.categoryID, Validators.required],
        type_fk: [this.value.typeID, Validators.required]
      });
    }

  }

  get f1() { return this.productFormGroup.controls; }



  onCreateProduct() {
    this.submitted = true;
    if (this.productFormGroup.invalid) {
      const alert1 = this.alertCtrl.create({
        message: 'Completa el formulario',
        mode: 'md',
        buttons: ['Aceptar']
      });
      alert1.then(a => a.present());
      return;
    }

    const formData = new FormData();
    formData.append('product_info', JSON.stringify(this.productFormGroup.value));

    const loadingService = this.loadingCtrl.create({ message: 'Cargando...' });

    loadingService.then(a => a.present());
    this.storeService.saveProduct(formData).subscribe(res => {
      if (res.status === 'success') {
        const alert = this.alertCtrl.create({
          header: 'Registro exitoso',
          mode: 'md',
          buttons: ['Aceptar']
        });
        alert.then(a => a.present());
        this.modalCtrl.dismiss(res.data);
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

  onCloseModal() {
    this.modalCtrl.dismiss();
  }

}
