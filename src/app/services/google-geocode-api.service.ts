import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleGeocodeApiService {

  constructor(private http: HttpClient) {}

  getLatLongByZipCode(zipcode: any) {
   return this.http.get<any>(`${environment.GEOCODE_API_BASE_URL}?address=${zipcode}&key=${environment.GEOCODE_API_KEY}`);
  }

}
