import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../providers/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class SignUpPage implements OnInit {

  submitted = false;
  signUpForm: FormGroup;
  passwordHidden = true;
  passwordType = 'password';
  passwordIcon = 'far fa-eye';

  dataCheck = true;
  minDate = { year: 1900, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private alertCtrl: AlertController,
              private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birth_date: [Date, Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required]
    });
  }

  get f1() { return this.signUpForm.controls; }

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

    if (this.signUpForm.invalid) {
      this.alertCtrl.create({
        message: 'Debes de completar el formulario.',
        mode: 'md',
        buttons: ['OK']
      }).then(a => a.present());
      return;
    } else if (this.signUpForm.value.password !== this.signUpForm.value.confirmedPassword) {
      this.alertCtrl.create({
        message: 'Las contraseñas deben ser iguales.',
        mode: 'md',
        buttons: ['OK']
      }).then(a => a.present());
      return;
    } else if (!this.dataCheck) {
      this.alertCtrl.create({
        message: 'Debes de aceptar las condiciones de uso y las politicas de datos.',
        mode: 'md',
        buttons: ['OK']
      }).then(a => a.present());
      return;
    }

    const date1 = this.signUpForm.value.birth_date;
    const diffTime = Math.abs(new Date().getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if ((diffDays / 365) < 18) {
      this.alertCtrl.create({
        message: 'Debes tener al menos 18 años para registrarte.',
        mode: 'md',
        buttons: ['OK']
      }).then(a => a.present());
      return;
    }

    const userBody = {
      user_type: 2,
      name: this.signUpForm.value.name,
      last_name: this.signUpForm.value.lastName,
      gender: this.signUpForm.value.gender,
      birth_date: this.signUpForm.value.birth_date,
      email: this.signUpForm.value.email.toString().toLocaleLowerCase(),
      password: this.signUpForm.value.password
    };

    const formData = new FormData();
    formData.append('new_user', JSON.stringify(userBody));

    const loadingService = this.loadingCtrl.create({ message: 'Cargando...' });

    loadingService.then(a => a.present());
    this.authService.attemptRegistration(formData).subscribe(res => {
      if (res.status === 'APPROVED') {
        const alert = this.alertCtrl.create({
          header: 'Registro exitoso',
          mode: 'md',
          buttons: ['OK']
        });
        alert.then(a => a.present());
        this.router.navigate(['/sign_in']);
      } else if (res.status === 'USER_FOUND') {
        const alert = this.alertCtrl.create({
          header: 'Correo Invalido',
          message: res.message,
          mode: 'md',
          buttons: ['OK']
        });
        alert.then(a => a.present());
      } else {
        const alert = this.alertCtrl.create({
          header: 'Error',
          message: res.message,
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
