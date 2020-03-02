import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseModel} from '../../models/response/response.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get<ResponseModel>(environment.apiUrl + '/api' + endpoint);
  }

  post(endpoint: string, body: any) {
    return this.http.post<ResponseModel>(environment.apiUrl + '/api' + endpoint, body);
  }

}
