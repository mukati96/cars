import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { environment } from 'src/environments/environment';
import { CountryISO} from 'ngx-intl-tel-input';
declare const $: any;
@Component({
  selector: 'post-make-offer',
  templateUrl: './make-offer.component.html',
  styleUrls: ['./make-offer.component.scss']
})
export class MakeOfferComponent implements OnInit {
  @Input() fetchingZipCode = false;
  @Input() buyNowStatusCode:number | undefined;
  params: any;
  makeOffer !: FormGroup;
  submitted = false;
  data: any
  CountryISO = CountryISO;
  selectedCountryISO = CountryISO.UnitedStates;
  sendOtp: any;
  phoneNumber: any;
  verifyOtp: any;
  verify_otp!: boolean;
  verify_otps!: boolean;
  otpSent = false;
  otpVerified = false;
  constructor(private router: Router,
    private shareDataService: ShareDataService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrServices,
    private httpService: HttpService,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.params;
  }

  // onClickInput($event): void {
  //   // tslint:disable-next-line: curly
  //   if (environment.staging) return;
  //   $event.preventDefault();
  //   const countryDropDown: HTMLElement = $('.country-dropdown');
  //   if (countryDropDown) {
  //     countryDropDown.remove();
  //   }
  // }
  // mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  // createForm() {
  //   this.makeOffer = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     name: ['', Validators.required],
  //     cell_phone: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
  //     otp: ['', Validators.required],
  //   });
  // }

  // get f() { return this.makeOffer.controls; }
  onSubmit() {
    let data = {
      vehicle : this.params.id,
      offer_price : sessionStorage.getItem('offer_price')
    }
    this.httpService.post(data, 'seller/makeanoffer/').subscribe(res => {
      sessionStorage.clear()
      this.close();
      this.toastr.showSuccess('Offer Placed Successfully', 'Make Offer');
    }, err => {
      sessionStorage.clear() 
      this.toastr.showError(
        this.shareDataService.getErrorMessage(err),
        'Make Offer'
      );
      this.close();
    })
  }

  // keydown(event) {
  //   if (event.target.value.length >= 10) {
  //   }
  //   const e = window.event || event;
  //   const key = e.keyCode;
  //   // space pressed
  //   if (key === 32) { // space
  //     e.preventDefault();
  //   }
  // }

  // checkNumber(event) {
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     return false;
  //   }
  //   return true;
  // }

  close() {
    $('#makeOfferWeb').modal('hide');
    $('#makeOfferMobile').modal('hide');
    this.submitted = false;
  }

  // send_Otp() {
  //   this.data = this.makeOffer.getRawValue();
  //   const data = {
  //     phone_number: `+1${this.data.cell_phone}`
  //   }
  //   if (this.data.cell_phone.length == '') {
  //     return;
  //   }
  //   this.httpService.post(data, 'auth/send-otp-to-phone/').subscribe(
  //     (res) => {
  //       this.sendOtp = res
  //       this.toastr.showSuccess('Verifiaction code has been sent on your phone', 'Verification Code');
  //       this.otpSent = true;
  //       this.otpVerified = false;
  //     }
  //     , err => {
  //       this.otpSent = false;
  //       this.otpVerified = false;
  //       this.toastr.showError(
  //         this.shareDataService.getErrorMessage(err),
  //         ''
  //       );
  //     }
  //   )
  // }

  // verifyOtps(event) {
  //   if (event.target.value.length >= 6) {
  //     this.data = this.makeOffer.getRawValue();
  //     const data = {
  //       phone_number: `+1${this.data.cell_phone}`,
  //       code: this.data.otp
  //     }
  //     this.httpService.post(data, 'auth/verify-otp/').subscribe(
  //       (res) => {
  //         this.verifyOtp = res
  //         this.otpVerified = true;
  //         this.toastr.showSuccess('Verified Successfully', '');
  //         this.verify_otp = true
  //         this.verify_otps = false
  //       }, err => {
  //         this.verify_otp = false,
  //           this.verify_otps = true
  //         this.toastr.showError(
  //           " Incorrect Verification Code", 'Verification Code');

  //       }
  //     )
  //   }
  // }
}
