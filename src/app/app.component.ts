import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {UserService} from './providers/user/user.service';
import {TokenService} from './providers/token/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private router: Router,
              private userService: UserService, private tokenService: TokenService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  closeSession() {
    this.tokenService.deleteStoredToken();
    this.router.navigate(['/sign_in']).then(() => { window.location.reload(); });
  }

  isLogIn() {
    return this.userService.userSignIn;
  }

  isClient() {
    return this.userService.userSignIn && this.userService.userType !== 1;
  }

  isAdmin() {
    return this.userService.userSignIn && this.userService.userType === 1;
  }

}
