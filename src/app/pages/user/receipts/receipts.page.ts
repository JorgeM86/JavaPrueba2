import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../providers/user/user.service';
import {UserModel} from '../../../models/user/user.model';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.page.html',
  styleUrls: ['./receipts.page.scss'],
})
export class ReceiptsPage implements OnInit {

  userInfo: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.userService.getUserInfoByID(this.userService.userID);
    this.userInfo = this.userService.user;
  }

}
