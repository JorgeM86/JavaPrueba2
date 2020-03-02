import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {AuthService} from '../../../providers/auth/auth.service';
import {TokenService} from '../../../providers/token/token.service';
import {DataService} from '../../../providers/data/data.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  submitted = false;
  signInForm: FormGroup;
  passwordHidden = true;
  passwordType = 'password';
  passwordIcon = 'far fa-eye';

  constructor(private authService: AuthService, private tokenService: TokenService, private dataService: DataService,
              private formBuilder: FormBuilder, private router: Router, private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f1() { return this.signInForm.controls; }

  togglePassword() {
    if (this.passwordHidden) {
      this.passwordHidden = false;
      this.passwordType = 'text';
      this.passwordIcon = 'far fa-eye-slash';
    } else {
      this.passwordHidden = true;
      this.passwordType = 'password';
      this.passwordIcon = 'far fa-eye';
    }
  }

  submitForm() {
    this.submitted = true;
    if (this.signInForm.invalid) {
      this.alertCtrl.create({
        message: 'Ingresa correo y contraseña.',
        mode: 'md',
        buttons: ['OK']
      }).then(a => a.present());
      return;
    }

    const formData = new FormData();
    formData.append('auth_email', this.signInForm.value.email);
    formData.append('auth_pass', this.signInForm.value.password);

    const loadingService = this.loadingCtrl.create({ message: 'Cargando...' });

    loadingService.then(a => a.present());
    this.authService.attemptAuthentication(formData).subscribe(resp => {
      if (resp.status === 'APPROVED') {
        this.tokenService.saveToken(resp.data.accessToken, resp.data.username);
        if (this.dataService.previewsPage !== null) {
          this.router.navigate([this.dataService.previewsPage]);
          this.dataService.previewsPage = null;
        } else {
          this.router.navigate(['/store-portal']);
        }
      }
      if (resp.status === 'NOT_FOUND' || resp.status === 'BAD_CREDENTIALS') {
        this.alertCtrl.create({
          message: resp.message,
          mode: 'md',
          buttons: ['OK']
        }).then(a => a.present());
      }
      if (resp.status === 'ERROR') {
        this.alertCtrl.create({
          header: 'ERROR',
          message: resp.message.toString(),
          mode: 'md',
          buttons: ['OK']
        }).then(a => a.present());
      }
      loadingService.then(a => a.dismiss());
    }, error => {
      this.alertCtrl.create({
        header: 'ERROR',
        message: 'Un error desconocido ha ocurrido',
        mode: 'md',
        buttons: ['OK']
      }).then(a => a.present());
    });
    loadingService.then(a => a.dismiss());
  }

}
