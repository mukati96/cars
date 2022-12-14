import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  expiredVehicleService = new Subject();
  expiredVehicleSubscription = this.expiredVehicleService.asObservable();

  constructor() { }

  changeData(id:number) {
    this.expiredVehicleService.next(id);
  }
}
