import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NewRegisterComponent } from '../new-register.component';
import { CountryISO } from 'ngx-intl-tel-input';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrServices } from '../../../../services/toastr.service';
import { Router } from '@angular/router';
import { ShareDataService } from '../../../../services/share-data.service';
import { HttpService } from '../../../../services/http.service';
import { environment } from 'src/environments/environment';
declare const $: any;
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'post-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, AfterViewInit {

  @Input() vehicleForm :any= FormGroup; // FormGroup Instance
  loginForm:any = FormGroup;
  @Input() editForm!: boolean;
  mobileNumberForm:any = FormGroup;
  otpForm!: FormGroup;
  // tooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  submitted = false;
  fetchingEmail = false;
  otpSending = false;
  otpSent = false;
  otpSubmitted = false;
  mobileSubmitted = false;
  otpVerified = false;
  otpSubmitting = false;
  selectedCountryISO = CountryISO.UnitedStates;
  formSubmitting = false;
  data1: any;
  data: any;
  checknumber:any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private httpService: HttpService,
    private stepsComponent: NewRegisterComponent,
    private shareDataService: ShareDataService,
    private toastrServices: ToastrServices,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.personalInfo.phone_number.value) {
        const ph = this.personalInfo.phone_number.value.replace('+1', '');
        this.mobile.phone_number.patchValue(ph);
      
    }
    this.otpVerified = this.editForm;
    this.otpSent = this.editForm;
  }

  initForm(): void {
    this.mobileNumberForm = this.fb.group({
      phone_number: ['', [Validators.required]],
      code: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)]
      ]
    });

    this.otpForm = this.fb.group({
      code: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)]
      ]
    });
    this.loginForm = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]],
      //  password: ['', ]
    });
  }

  ngAfterViewInit(): void {
    const flagElement: HTMLElement = $('.iti-flag');
    if (flagElement) {
      flagElement.remove();
    }
  }

  onClickInput($event:any): void {
    // tslint:disable-next-line: curly
    if (environment.staging) return;
    $event.preventDefault();
    const countryDropDown: HTMLElement = $('.country-dropdown');
    if (countryDropDown) {
      countryDropDown.remove();
    }
  }

  get personalInfo():any  {
    return this.vehicleForm.controls.personal_info['controls'];
  }
  get f(): any {
    return this.vehicleForm.controls;
  }

  get mobile():any { return this.mobileNumberForm.controls; }

  get loigin() { return this.loginForm.controls; }
  prev(): void {
    // this.stepsComponent.prev();
    this.stepsComponent.next(3);
  }

  verifyPhoneNumber(data:any){
    // if (this.mobile.phone_number.invalid) {
    //   return this.toastrServices.showError('Phone number is required', 'Register');
    // }
    this.data = this.mobileNumberForm.value;
    if (this.data.phone_number?.startsWith('+')) {
      this.data1 = {
        phone_number: this.data.phone_number
      }
    } else {
      this.data1 = {
        phone_number: `+1${this.data.phone_number}`
      }
    }
    if (this.mobileNumberForm.value.phone_number.e164Number) {
      this.data1.phone_number = this.mobileNumberForm.value.phone_number.e164Number;
    } 
    this.httpService.post(this.data1,`seller/check/number/`).subscribe((res: any) => {

    },
    err => {
      this.checknumber = err.error.message
      if(err.error.message === "Number already exists!"){
        this.mobileNumberForm.controls.phone_number.reset();
      }
        this.mobileNumberForm.get('phone_number').setErrors({pattern: true});
        this.mobileNumberForm.controls.phone_number.markAsTouched();
      })
      
  }

  sendOTP(): void {
    this.mobileSubmitted = true;
    if (this.mobile['phone_number'].invalid) {
      return this.toastrServices.showError('Phone number is required', 'Register');
    }
    this.otpSending = true;
    this.otpVerified = false;
    const data = this.mobileNumberForm.value;
    if (data.phone_number?.startsWith('+')) {
      this.data1 = {
        phone_number: data.phone_number
      }
    } else {
      this.data1 = {
        phone_number: `+1${data.phone_number}`
      }
    }
    if (this.mobileNumberForm.value.phone_number.e164Number) {
      this.data1.phone_number = this.mobileNumberForm.value.phone_number.e164Number;
    } 
    // this.formSubmitting = true;
    this.httpService.post(this.data1, 'auth/send-otp/').subscribe(
      (res:any ) => {
        this.mobile.code.patchValue('');
        this.toastrServices.showSuccess(
          'Verification code has been sent on your phone',
          'Verification Code'
        );
        this.otpSending = false;
        this.otpSent = true;
        this.otpVerified = false;
      },
      (err) => {
        this.otpSent = false;
        this.otpSending = false;
        if (err.status === 400 && err.error.non_field_errors) {
          return this.toastrServices.showError(
            err.error.non_field_errors[0],
            'Phone Number'
          );
        }
        return this.toastrServices.showError(
          this.shareDataService.getErrorMessage(err),
          'Verification Code'
        );
      }
    );
  }

  verifyOTP() {
    if (!this.otpSent) {
      return this.toastrServices.showError(
        'Please send verification code first',
        'Verification Code'
      );
    }
    this.otpSubmitted = true;
    if (this.mobile['code'].invalid) {
      return this.toastrServices.showError(
        'Verification code is required',
        'Register'
      );
    }
    this.otpSubmitting = true;
    const data = this.mobileNumberForm.value;
    if (this.mobileNumberForm.value.phone_number.e164Number) {
      data.phone_number = this.mobileNumberForm.value.phone_number.e164Number;
    }
    this.httpService.post(data, 'auth/verify-otp/').subscribe(
      (res:any) => {
        this.otpVerified = true;
        this.otpSubmitting = false;
        this.personalInfo['phone_number'].patchValue(data.phone_number);
        this.toastrServices.showSuccess('Verified Successfully', 'Verify Code');
      },
      err => {
        this.otpSubmitting = false;
        this.toastrServices.showError(
          this.shareDataService.getErrorMessage(err),
          'Verify Code'
        );
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.personalInfo.customer_support.value) {
      return this.toastrServices.showError(
        'Please check to agree the terms and conditions',
        'Personal Details'
      );
    } else if (this.f.personal_info.invalid) {
      return this.toastrServices.showError(
        'Please provide personal details',
        'Personal Details'
      );
    } else if (this.vehicleForm.invalid) {
      return this.toastrServices.showError(
        'Please provide All the information',
        'Personal Details'
      );
    }

    let mobNumber = this.personalInfo.phone_number.value;
    if (mobNumber.includes('+1')) {
      mobNumber = mobNumber.replace('+1', '');
    }
    this.personalInfo.password.patchValue(mobNumber);
  
    this.openAutoLoginConfirmModal(); 

  }

  openAutoLoginConfirmModal() {
    $(`#submitOfferModal`).modal('show');
  }

  closeAutoLoginConfirmModal() {
    $(`#submitOfferModal`).modal('hide');
  }

  autoLoginOnBid() {
    this.shareDataService.changeData(this.vehicleForm.value);
    $(`#submitOfferModal`).modal('hide');
    $('html').removeClass('modal-open').css({
      marginTop: 0,
      overflow: 'visible',
      left: 'auto',
      right: 'auto',
      top: 'auto',
      bottom: 'auto',
      position: 'static',
    });
    
    this.router.navigate(['new-register/preview']);
  }

  verifyEmail(): void {
    if (this.personalInfo.email.valid && this.personalInfo.email.value) {
      this.fetchingEmail = true;
      this.httpService
        .post(
          { email: this.personalInfo.email.value.toLowerCase() },
          `auth/user/email/verify/`
        )
        .subscribe((res: any) => {
          if (!res.status) {
            this.fetchingEmail = false;
            this.personalInfo.email.setErrors(null);
          } else {
            if (res.message == "Email already exists") {
              this.personalInfo.email.setErrors({ invalid: true });
              this.fetchingEmail = false;
            }
            else {
              this.fetchingEmail = false;
              this.personalInfo.email.setErrors({ invalid: true });
            }

          }
        });
    }
  }

  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

}
