import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

const helper = new JwtHelperService();
const TOKEN_KEY = 'TR_AuthToken';
const USERNAME_KEY = 'TR_AuthUsername';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public user: Observable<any>;
  private tokenData = new BehaviorSubject(null);

  constructor(private storage: Storage, private plt: Platform, private router: Router) {
    this.loadStoredToken();
  }

  loadStoredToken() {
    const platformObs = from(this.plt.ready());
    this.user = platformObs.pipe(
        switchMap(() => {
          return from(this.storage.get(TOKEN_KEY));
        }),
        map((token: any) => {
          if (token) {
            const decoded = helper.decodeToken(token);
            this.tokenData.next(decoded);
            return true;
          } else {
            return null;
          }
        })
    );
  }

  saveToken(token, username) {
    const decoded = helper.decodeToken(token);
    this.tokenData.next(decoded);
    this.storage.set(USERNAME_KEY, username);
    this.storage.set(TOKEN_KEY, token);
  }

  getUser() {
    return this.tokenData.getValue();
  }

  deleteStoredToken() {
    this.storage.remove(USERNAME_KEY);
    this.storage.remove(TOKEN_KEY).then(() => {
      this.tokenData.next(null);
      /*this.userService.resetVariables();
      this.userService.state = false;*/
      /*if (signal) {
        this.router.navigateByUrl('/');
      }*/
    });
  }

}
