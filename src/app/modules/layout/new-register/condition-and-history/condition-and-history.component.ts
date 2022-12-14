import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrServices } from '../../../../services/toastr.service';
import { NewRegisterComponent } from '../new-register.component';
declare const $: any;

@Component({
  selector: 'post-condition-and-history',
  templateUrl: './condition-and-history.component.html',
  styleUrls: ['./condition-and-history.component.scss']
})
export class ConditionAndHistoryComponent implements OnInit {

  @Input() vehicleForm!: FormGroup;
  @Input() vehicleFormData: any;
  submitted = false;
  listingDuration = [24, 48, 72];

  constructor(private toastrServices: ToastrServices,
              private newRegisterComponent: NewRegisterComponent,
              private router: Router,
              private storageService: StorageService,
              private shareDataService: ShareDataService) { }

  ngOnInit(): void {
  }

  get f(): any {
    return this.vehicleForm.controls;
  }
  get vehicleCondition() {
    return this.f.vehicle_condition.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.f.vehicle_condition.invalid) {
      return this.toastrServices
      .showError(
        'Please Provide Vehicle Condition details',
        'Vehicle Condition'
        );
    }
    const user = this.storageService.getFromLocalStorage('userInfo');
    if (user) {
      this.shareDataService.changeData(this.vehicleForm.value);
      this.router.navigate(['new-register/preview']);
    }
    this.newRegisterComponent.next(4);
    
    // $('#collapseThree').removeClass('show');
    // $('#collapseFour').addClass('show');
    // document.getElementById('headingThree').scrollIntoView();
  }

  prev() {
    this.newRegisterComponent.next(2);
  }

}
