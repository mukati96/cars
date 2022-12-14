import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  userInfo: any;

  constructor(public httpClient: HttpClient, private storageService: StorageService) { }

  setHeaders(sendJWT = true) {
    this.userInfo = this.storageService.getFromLocalStorage('userInfo');
    let headers = new HttpHeaders();
    if (this.userInfo && sendJWT) {
     headers = headers.append('Authorization', 'Token ' + this.userInfo.auth_token);
    }
    return headers;
  }

  setFormDataHeader(sendJWT = true) {
    this.userInfo = this.storageService.getFromLocalStorage('userInfo');
    let headers = new HttpHeaders();
    if (this.userInfo && sendJWT) {
      headers = headers.append('Authorization', 'Token ' + this.userInfo.auth_token);
    }
    headers.append('Content-Type', 'multipart/form-data');
    return headers;
  }

  get(endpoint:any, sendJWT = true) {
    return this.httpClient.get<any>(`${environment.apiUrl}/${endpoint}`, {
      headers: this.setHeaders(sendJWT),
    });
  }

  post(data:any, endpoint:any, sendJWT = true) {
    return this.httpClient.post<any>(`${environment.apiUrl}/${endpoint}`, data, {
      headers: this.setHeaders(sendJWT),
    });
  }

  formDataPost(data:any, endpoint:any, sendJWT = true) {
    return this.httpClient.post<any>(`${environment.apiUrl}/${endpoint}`, data, {
      headers: this.setFormDataHeader(sendJWT),
    });
  }

  put(data:any, endpoint:any, sendJWT = true) {
    return this.httpClient.put<any>(`${environment.apiUrl}/${endpoint}`, data, {
      headers: this.setHeaders(sendJWT),
    });
  }

  delete(id:any, endpoint:any, sendJWT = true) {
    return this.httpClient.delete(`${environment.apiUrl}/${endpoint}/${id}`, {
      headers: this.setHeaders(sendJWT),
    });
  }

  login(data: any): Observable<any> {
    return this.post(data, 'auth/seller/login/');
  }

  getProfile(token:any): Observable<any> {
    let setHeaders = new HttpHeaders();
    setHeaders = setHeaders.append('Authorization', 'Token ' + token);
    return this.httpClient.get<any>(`${environment.apiUrl}/auth/profile/seller/detail/`,
    {headers: setHeaders});
  }

}
