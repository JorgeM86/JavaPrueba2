import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import {UserService} from '../../user/user.service';
import {TokenService} from '../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class SignGuard implements CanActivate {

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.tokenService.user.pipe(take(1), map(user => {
      return !user;
    }));
  }

}
