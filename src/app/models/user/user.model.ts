import {ReceiptsModel} from '../receipts/receipts.model';

export class UserModel {
  userID: number;
  userType: number;
  name: string;
  lastName: string;
  email: string;
  cellphone: string;
  gender: string;
  birthDate: string;
  receipts: ReceiptsModel[] = [];

  constructor(userInfo: any) {
    this.userID = userInfo.user_id;
    this.userType = userInfo.user_type;
    this.name = userInfo.name;
    this.lastName = userInfo.last_name;
    this.email = userInfo.email;
    this.cellphone = userInfo.cellphone;
    this.gender = userInfo.gender;
    this.birthDate = userInfo.birth_date;
    for (const item of userInfo.receipts) {
      this.receipts.push(new ReceiptsModel(item));
    }
    this.sortReceipts();
  }

  sortReceipts() {
    this.receipts.sort( (object1, object2) => {
      if ( object1.receiptID < object2.receiptID ) {
        return -1;
      } else if ( object1.receiptID > object2.receiptID ) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
