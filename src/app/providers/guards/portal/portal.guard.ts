import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../../user/user.service';
import {TokenService} from '../../token/token.service';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortalGuard implements CanActivate {

  constructor(private userService: UserService, private tokenService: TokenService) { }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.tokenService.user.pipe(take(1), map(user => {
      if (user) {
        const token = this.tokenService.getUser();
        if (token.exp * 1000 > new Date().getTime()) {
          if (this.userService.user === undefined) {
            this.userService.userID = token.user.id;
            this.userService.userType = token.user.type;
            this.userService.getUserInfoByID(token.user.id);
          }
        } else {
          this.tokenService.deleteStoredToken();
        }
      }
      return true;
    }));
  }

}
