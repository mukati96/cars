import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Store } from '@ngrx/store';
import { AppState } from '../core/models/app.states';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loadUrl : any;

  constructor(private storageService: StorageService,
              private httpService: HttpService,
              private store: Store<AppState>,
              private router: Router) { }

  public checkAuthentication(): boolean {
    const token = this.storageService.getFromLocalStorage('userInfo');
    if (!token) {
      return false;
    } else {
      return true;
    }
  }

  public logout(): void {
    this.storageService.resetStorage();
  }

}
