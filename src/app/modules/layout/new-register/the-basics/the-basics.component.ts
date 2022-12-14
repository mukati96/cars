import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrServices } from 'src/app/services/toastr.service';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { NewRegisterComponent } from '../new-register.component';
import { Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'post-the-basics',
  templateUrl: './the-basics.component.html',
  styleUrls: ['./the-basics.component.scss']
})
export class TheBasicsComponent implements OnInit, AfterViewInit {

  @Input() vehicleForm!: FormGroup;
  @Input() vehicleFormData: any;
  @Input() submittedZip = false;
  @Input() fetchingZipCode = false;
  submitted = false;
  fuelTypes = [
    'Diesel',
    'Petrol',
    'Gasoline',
    'Electric',
    'Hybrid'
  ];
  driveType = [
    'AWD',
    'FWD',
    'RWD',
    '4WD'
  ];

  constructor(private router: Router,
              private toastrServices: ToastrServices,
              private httpService: HttpService,
              private shareDataService: ShareDataService,
              private newRegisterComponent: NewRegisterComponent,
              ) { }

  ngOnInit(): void {
    $(document).ready(function(){
      $(window).scrollTop(0);
    });
  }

  get theBasics(): any {
    return this.f.vehicle_info_a.controls;
  }

  get f(): any { return this.vehicleForm.controls; }
  get personalInfo(): any {
    return this.f.personal_info.controls;
  }

  changeTransmission(item:any) {
    this.theBasics.transmission.patchValue(item);
  }

  keydown(event:any) {
    if (event.key === '.' || event.key === '+' || event.key === '-') {
      event.preventDefault();
    }
  }

  prev() {
    this.router.navigate(['']);
  }

  onSubmit() {
    this.submitted = true;
    this.f.vehicle_info_a
    if (this.f.vehicle_info_a.invalid) {
      return this.toastrServices.showError('Please Fill The Basics Value', 'The Basics');
    }
    this.newRegisterComponent.next(2);
    // $('#collapseOne').removeClass('show');
    // $('#collapseTwo').addClass('show');
    // document.getElementById('headingOne').scrollIntoView();
  }

  ngAfterViewInit() {
    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();
    });

  }

}
