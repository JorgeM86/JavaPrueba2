import { Injectable } from '@angular/core';
import {UserModel} from '../../models/user/user.model';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserModel;
  userID: number;
  userType: number;
  userSignIn = false;

  constructor(public api: ApiService) { }

  async getUserInfoByID(id: number) {
    this.api.get('/user/' + id).subscribe(res => {
      if (res.status === 'success') {
        this.setUserInformation(res.data);
      }
    });
  }

  setUserInformation(data) {
    this.user = new UserModel(data);
    this.userSignIn = true;
    console.log('load setUserInformation');
  }

}
