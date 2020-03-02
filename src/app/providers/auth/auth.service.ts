import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {ResponseModel} from '../../models/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  attemptAuthentication(accountInfo: any) {
    return this.http.post<ResponseModel>(environment.apiUrl + '/api/auth/sign_in', accountInfo);
  }

  attemptRegistration(accountInfo: any) {
    return this.http.post<ResponseModel>(environment.apiUrl + '/api/auth/sign_up', accountInfo);
  }

}
