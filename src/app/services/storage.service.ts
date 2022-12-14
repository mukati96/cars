import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveToSession = function(key:any, value:any) {
    sessionStorage[key] = JSON.stringify(value);
  };

  saveToLocalStorage = function(key:any, value:any) {
    localStorage[key] = JSON.stringify(value);
  };

  getSessionStorage(key:any): any {
    if (sessionStorage[key]) {
      return JSON.parse(sessionStorage[key]);
    } else {
      return false;
    }
  }

  getFromLocalStorage(key:any): any {
    if (localStorage[key]) {
      return JSON.parse(localStorage[key] || 'null');
    } else {
      return false;
    }
  }

  removeFromLocalStorage(key:any): any {
    localStorage.removeItem(key);
  }

  removeFromSessionStorage(key:any): any {
    sessionStorage.removeItem(key);
  }

  resetStorage() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
