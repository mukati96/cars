import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as _ from 'lodash';
import { AuthService } from '../guards/auth.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { VehicleVM } from '../core/models/model';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  currentUrl!: string;
  data:any = VehicleVM;
  currentPhoneNumber!: string;
  currentEmail!:string;
  currentSteps!:string
  /*------------------------ Store Data of Step Form --------------------------------*/
  vehicleFormData: any= new BehaviorSubject<VehicleVM>(this.data);
  onSubVehicleData:any = this.vehicleFormData.asObservable();

  /*------------------------ Trigeered When User Login ------------------------------*/
  userData = new BehaviorSubject(this.storageService.getFromLocalStorage('userInfo'));
  userDataSubscription = this.userData.asObservable();
  /*------------------------ Headrer Input text -------------------------------------*/
  headerText = new Subject();

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private router: Router) { }

  changeData(data?: VehicleVM) {
    this.vehicleFormData.next(data);
  }

  getErrorMessage(err: any) {
    let errorMessage = 'Something Went Wrong';
    if (err.status === 401) {
      errorMessage = err.error.detail;
      if (err.error.detail === 'Invalid token.') {
        this.authService.logout();
        this.userData.next(undefined);
        this.router.navigate(['/login']);
      }
      return errorMessage;
    } else if (err.status === 504) {
      errorMessage = 'Your request is under process please wait for sometimes or try again later.';
      return errorMessage;
    } else if (err.status === 500) {
      return errorMessage;
    } else if (err.status === 0) {
      errorMessage = 'Connection Lost';
    } else if (err.status === 404 && err.error.detail) {
      errorMessage = err.error.detail;
    } else if (err.status === 400 && err.error.message) {
      errorMessage = err.error.message;
    } else if (err.status === 400 && err.error.email) {
      errorMessage = err.error.email[0];  
    }else if (err.status === 400 && err.error.cell_phone) {
      errorMessage = err.error.cell_phone[0];  
    }else if (err.status === 400 && err.error.phone_number) {
      errorMessage = err.error.phone_number[0];  
    }

    return errorMessage;
  }

  getFormErrorMessage(err: any) {
    let errorMessage = 'Something Went Wrong';
    if (err.error.options) {
      return err.error.options[0];
    } else if (err.error.upgrades) {
      return err.error.upgrades[0];
    } else if (err.error.phone_number) {
      return err.error.phone_number[0];
    } else if (err.error.vin) {
      return err.error.vin[0];
    } else if (err.error.drive_type) {
      return err.error.drive_type[0];
    } else if (err.error.make) {
      return err.error.make[0];
    } else if (err.error.transmission) {
      return err.error.transmission[0];
    } else if (err.error.model) {
      return err.error.model[0];
    } else if (err.error.trim) {
      return err.error.trim[0];
    } else if (err.error.engine) {
      return err.error.engine[0];
    } else if (err.error.year) {
      return err.error.year[0];
    }  else if (err.error.full_type) {
      return err.error.full_type[0];
    } else if (err.error.mileage) {
      return err.error.mileage[0];
    } else if (err.error.keys) {
      return err.error.keys[0];
    } else if (err.error.exterior_color) {
      return err.error.exterior_color[0];
    } else if (err.error.purchased) {
      return err.error.purchased[0];
    } else if (err.error.accident) {
      return err.error.accident[0];
    } else if (err.error.run_and_drive) {
      return err.error.run_and_drive[0];
    } else if (err.error.warning_light) {
      return err.error.warning_light[0];
    } else if (err.error.smoked) {
      return err.error.smoked[0];
    } else if (err.error.current_miles) {
      return err.error.current_miles[0];
    } else if (err.error.photos) {
      return err.error.photos[0];
    } else if (err.error.person_info) {
      return err.error.person_info[0];
    } else if (err.error.email) {
      return err.error.email[0]; 
    }else if (err.error.cell_phone) {
      return err.error.cell_phone[0];
    }  else if (err.status === 0) {
      errorMessage = 'Connection Lost';
    }
    return errorMessage;
  }

  getTitleOfFormValidation(err: any) {
    const errorMessage = 'Error';
    if (err.error.options) {
      return 'Options';
    } else if (err.error.upgrades) {
      return 'After Market Modifications';
    } else if (err.error.phone_number) {
      return 'Phone Number';
    } else if (err.error.vin) {
      return 'Vin';
    } else if (err.error.drive_type) {
      return 'Drive Type';
    } else if (err.error.make) {
      return 'Make';
    } else if (err.error.transmission) {
      return 'Transmission';
    } else if (err.error.model) {
      return 'Model';
    } else if (err.error.trim) {
      return 'Trim';
    } else if (err.error.engine) {
      return 'Engine';
    } else if (err.error.year) {
      return 'Year';
    }  else if (err.error.full_type) {
      return 'Fuel Type';
    } else if (err.error.mileage) {
      return 'Mileage';
    } else if (err.error.keys) {
      return 'Keys';
    } else if (err.error.exterior_color) {
      return 'Exterior Color';
    } else if (err.error.purchased) {
      return 'Purchased';
    } else if (err.error.accident) {
      return 'Accident';
    } else if (err.error.run_and_drive) {
      return 'Run and Drive';
    } else if (err.error.warning_light) {
      return 'Warning Light';
    } else if (err.error.smoked) {
      return 'Smoked';
    } else if (err.error.current_miles) {
      return 'Current Miles';
    } else if (err.error.photos) {
      return 'Photos';
    } else if (err.error.person_info) {
      return 'Personal Information';
    } else if (err.error.email) {
      return 'Email';
    }else if (err.error.cell_phone) {
      return 'cell phone';
    }else if (err.error.phone_number) {
      return 'phone number';
    }
    return errorMessage;
  }

}
