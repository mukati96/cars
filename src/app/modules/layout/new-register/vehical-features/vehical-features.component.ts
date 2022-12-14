import { Component, Input, OnInit } from '@angular/core';
import { NewRegisterComponent } from '../new-register.component';
import { ToastrServices } from '../../../../services/toastr.service';
declare const $: any;

@Component({
  selector: 'post-vehical-features',
  templateUrl: './vehical-features.component.html',
  styleUrls: ['./vehical-features.component.scss']
})
export class VehicalFeaturesComponent implements OnInit {

  @Input() vehicleForm: any;
  sf_array: any[] = [];
  pr_array: any[] = [];
  vehicle_info_upgrades: any[] = [];
  submitted = false;
  premiumData: any = {
    comform_convenienc: 'Keyless Start',
    roof_glass: 'Moon Roof',
    exterior: 'Fog Lights',
    cargo_towning: 'Roof Rack',
    seats: 'Heated Seats',
    accesssory_packages: 'Sport Appearance',
    lighting: 'Daytime Running Lights',
    wheels_tires: [
      'Premium Wheels',
      'Premium Wheels 19°+'
    ],
    braking_traction: [
      'Stability Control',
      'Hill Start Assist',
      'Sport Suspension',
      'ZQ8 Sport Suspension'
    ],
    entertainment_instrumentation: [
      'Premium Sound',
      'Navigation System',
      'DVD System',
      'UConnect',
      'CD/MP3 (Multi Disc)'
    ],
    after_market_modification: [
      'Stereo System',
      'Suspension',
      'Wheel and Tires',
      'Performance'
    ]
  };

  constructor(private newRegisterComponent: NewRegisterComponent,
              private toastrServices: ToastrServices) { }

  ngOnInit(): void {
    this.sf_array = this.vehicleFeatures.standard_features.value || [];
    this.pr_array = this.vehicleFeatures.premium_features.value || [];
    this.vehicle_info_upgrades = this.vehicleFeatures.market_modification_upgrades.value || [];
  }

  get f(): any { return this.vehicleForm.controls; }
  get vehicleFeatures() { return this.f.vehicle_features.controls; }

  standardChecks(event: any) {
    if (this.sf_array.includes(event.target.value)) {
      this.sf_array = this.sf_array.filter(e => {
        return e !== event.target.value;
      });
    } else {
      this.sf_array.push(event.target.value);
    }
    this.vehicleFeatures.standard_features.setValue(
      this.sf_array
    );
  }

  premiumChecks(event: any) {
    if (this.pr_array.includes(event.target.value)) {
      this.pr_array = this.pr_array.filter(e => {
        return e !== event.target.value;
      });
    } else {
      this.pr_array.push(event.target.value);
    }
    this.vehicleFeatures.premium_features.setValue(
      this.pr_array
    );
  }

  public modificationChecks(event: any): void {
    if (this.vehicle_info_upgrades.includes(event.target.value)) {
      this.vehicle_info_upgrades = this.vehicle_info_upgrades.filter(e => {
        return e !== event.target.value;
      });
    } else {
      this.vehicle_info_upgrades.push(event.target.value);
    }
    this.vehicleFeatures.market_modification_upgrades.setValue(this.vehicle_info_upgrades);
  }

  next(): void {
    this.newRegisterComponent.next(3);
  }

  prev(): void {
    this.newRegisterComponent.next(1);
    // this.newRegisterComponent.prev();
  }

  onSubmit() {
    this.submitted = true;
    if (this.f.vehicle_features.invalid) {
      return this.toastrServices.showError('Please Provide Standard Features', 'Vehicle Features');
    }
    this.newRegisterComponent.next(3);
    // $('#collapseTwo').removeClass('show');
    // $('#collapseThree').addClass('show');
    // document.getElementById('headingTwo').scrollIntoView();
  }

}
