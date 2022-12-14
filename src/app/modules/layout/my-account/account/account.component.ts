import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { StorageService } from 'src/app/services/storage.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MustMatch } from 'src/app/_helper/must-match.validator';
import { SearchCountryField, CountryISO, } from 'ngx-intl-tel-input';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/guards/auth.service';
declare const $: any;

@Component({
  selector: 'post-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit,AfterViewInit {
  userForm :any = FormGroup;
  passwordForm :any = FormGroup;
  // PhoneNumberFormat = PhoneNumberFormat;
  CountryISO = CountryISO;
  isAccount = false;
  isPassword = false;
  isEmailSubmit = false;
  emailVerified = false;
  accountSubmitted = false;
  passwordSubmitted = false;
  isEmailSubmitted = false;
  submittingProfile = false;
  userInfo: any;
  profile_pic: any;
  croppedImage: any = '';
  imageChangedEvent: any = '';
  otpSent = false;
  otpVerified = false;
  isShow = true;
  selectedCountryISO = this.CountryISO.UnitedStates;
  passwordMatch: any;
  data: any;
  data1: any;
  sendOtp: any;
  constructor(private httpService: HttpService,
    private toastrServices: ToastrServices,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private shareDataService: ShareDataService,
    private spinnerService: SpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.userInfo = this.storageService.getFromLocalStorage('userInfo');
    this.getApprovalList(this.userInfo.id);
    this.initiateForm();
  }

  ngAfterViewInit(): void {
    const flagElement: HTMLElement = $('.iti-flag');
    if (flagElement) {
      flagElement.remove();
    }
  }

  onClickInput($event:any): void {
    // tslint:disable-next-line: curly
    // if (environment.staging) return;
    $event.preventDefault();
    const countryDropDown: HTMLElement = $('.country-dropdown');
    if (countryDropDown) {
      countryDropDown.remove();
    }
  }


  private getApprovalList(id:any): void {
    this.spinnerService.run();
    this.httpService.get(`seller/account/${id}/`).subscribe(res => {
      this.emailVerified = res.emailVerified;
      this.userForm.controls['first_name'].setValue(res.full_name.split(' ')[0]);
      this.userForm.controls['last_name'].setValue(res.full_name.split(' ')[1]);
      this.userForm.controls['email'].setValue(res.email);
      if (res.phone_number && res.phone_number.includes('+1')) {
        res.phone_number = res.phone_number.replace('+1', '');
        this.selectedCountryISO = this.CountryISO.UnitedStates;
      } else {
        res.phone_number = res.phone_number.replace('+91', '');
        this.selectedCountryISO = this.CountryISO.India;
      }
      this.userForm.controls['phone_number'].setValue(res.phone_number);
      this.userForm.controls['phone_number'].disable();
      this.userInfo.profile_pic  = res.profile_pic;
      this.userInfo.full_name = res.full_name;
      this.storageService.saveToLocalStorage('userInfo', this.userInfo);
      this.shareDataService.userData.next(this.userInfo);
      this.spinnerService.stop();
    }, err => {
      this.spinnerService.stop();
      this.toastrServices.showError(this.shareDataService.getErrorMessage(err), 'My Account');
    });
  }

  private initiateForm(): void {
    /*------------- User Form instance ---------------*/
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(15)]],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
    });

    /*------------ Password Form instance ------------*/
    this.passwordForm = this.fb.group({
      cell_phone: ['', [Validators.required, Validators.pattern('^((\\+1-?)|0)?[0-9]{10}$')]],
      otp: ['', Validators.required],
    });
    

  }

  get f() { return this.userForm.controls; }
  get p() { return this.passwordForm.controls; }

  send_Otp() {
    // let oldnumber = this.userForm.c
    let phone_number = this.passwordForm.controls.cell_phone.value;
    if (phone_number.startsWith('+')) {
      this.data1 = {
        phone_number: phone_number
      }
    } else {
      this.data1 = {
        phone_number: `+1${phone_number}`
      }
    }
    this.httpService.post(this.data1, 'auth/mobile/number/check/')
      .subscribe(res => {
        if (res.is_user_exist) {
          let message = res.message
          this.passwordForm.get('cell_phone').setErrors({
            invalid: message
          })
        }
      }, err => {
        if(err.error.is_user_exist === false ) 
        {
           this.send_OtpVerify();
        }
        // this.passwordForm.controls.cell_phone.setErrors({ pattern: true });
      });
  }

  public send_OtpVerify() {
    this.data = this.passwordForm.getRawValue();
    this.data.cell_phone
    if (this.data.cell_phone.length <= '9') {
      return;
    }
    if (this.data.cell_phone.startsWith('+')) {
      this.data1 = {
        phone_number: this.data.cell_phone
      }
    } else {
      this.data1 = {
        phone_number: `+1${this.data.cell_phone}`
      }
    }
    this.httpService.post(this.data1, 'auth/send-otp-to-phone/').subscribe(
      (res) => {
        this.isShow = false;
        this.sendOtp = res
        this.otpSent = true;
        this.otpVerified = false;
      }
      , err => {
        this.otpSent = false;
        this.otpVerified = false;
        this.passwordForm.get('cell_phone').setErrors({
          pattern: true
        })
      }
    )
  }

  verifyOtps(event:any) {
    // this.codeError = false;
    this.data = this.passwordForm.getRawValue();
    if (this.data.otp.length <= 5) {
      return;
    }
    if (this.data.cell_phone.startsWith('+')) {
      this.data1 = {
        phone_number: this.data.cell_phone,
        code: this.data.otp
      }
    } else {
      this.data1 = {
        phone_number: `+1${this.data.cell_phone}`,
        code: this.data.otp
      }
    }
    const data = {
      phone_number: this.data.cell_phone,
      code: this.data.otp
    }
    this.httpService.post(data, 'auth/verify-otp/').subscribe(
      (res) => {
        // this.verifyOtp = res
        this.otpVerified = true;
      }, err => {
        // this.codeError = true;
        this.passwordForm.get('otp').setErrors({
          otp: true
        })
      }
    )
  }

  public verifyEmail(): void {
    this.isEmailSubmit = true;
    const data = new FormData();
    data.append('email', this.userForm.value.email);
    this.httpService.post(data, 'auth/email/verify/').subscribe(res => {
      this.isEmailSubmit = false;
      this.isEmailSubmitted = true;
      if (res.status_code === 400) {
        this.toastrServices.showError(res.message, 'Email Sent');
      } else { this.notify(); }
    }, err => {
      this.isEmailSubmit = false;
      this.toastrServices.showError(this.shareDataService.getErrorMessage(err), 'Verify Email');
    });
  }

  updateAllValue():void {
    this.accountSubmitted = true;
    // tslint:disable-next-line: curly
    if (this.userForm.invalid) return;
    const data = new FormData();
    data.append('full_name', this.userForm.value.first_name + ' ' + (this.userForm.value.last_name || ''));
    data.append('email', this.userForm.value.email);
    data.append('phone_number', this.userForm.getRawValue().phone_number.e164Number);
    // tslint:disable-next-line: curly
    if (this.profile_pic) {
      // this.submittingProfile = true;
      data.append('profile_pic', this.profile_pic);
    }
    this.isAccount = true;
    this.httpService.put(data, `seller/account/update/${this.userInfo.id}/`).subscribe((res: any) => {
      // if (this.submittingProfile) {
      this.getApprovalList(this.userInfo.id);
      // } else {
      //   this.userInfo.full_name = res.full_name;
      //   this.userInfo.email = res.email;
      //   this.userInfo.phone_number = res.phone_number;
      //   this.userInfo.id  = res.id;
      //   this.userInfo.profile_pic  = res.profile_pic;
      //   this.storageService.saveToLocalStorage('userInfo', this.userInfo);
      //   this.shareDataService.userData.next(this.userInfo);
      // }
      this.toastrServices.showSuccess('Your account info has updated', 'Profile Updated');
      this.isAccount = false;
      // this.submittingProfile = false;
      this.close();
    }, err => {
      this.isAccount = false;
      // this.submittingProfile = false;
      this.toastrServices.showError(this.shareDataService.getErrorMessage(err), 'My Account');
    });
  }
  public update(): void {
    this.accountSubmitted = true;
    // tslint:disable-next-line: curly
    if (this.userForm.invalid) return;
    const data = new FormData();
    data.append('full_name', this.userForm.value.first_name + ' ' + (this.userForm.value.last_name || ''));
    data.append('email', this.userForm.value.email);
    data.append('phone_number', this.userForm.getRawValue().phone_number?.e164Number);
    // tslint:disable-next-line: curly
    if (this.profile_pic) {
      this.submittingProfile = true;
      data.append('profile_pic', this.profile_pic);
    }
    // this.isAccount = true;
    this.httpService.put(data, `seller/account/update/${this.userInfo.id}/`).subscribe((res: any) => {
      // if (this.submittingProfile) {
      this.getApprovalList(this.userInfo.id);
      // } else {
      //   this.userInfo.full_name = res.full_name;
      //   this.userInfo.email = res.email;
      //   this.userInfo.phone_number = res.phone_number;
      //   this.userInfo.id  = res.id;
      //   this.userInfo.profile_pic  = res.profile_pic;
      //   this.storageService.saveToLocalStorage('userInfo', this.userInfo);
      //   this.shareDataService.userData.next(this.userInfo);
      // }
      this.toastrServices.showSuccess('Your account info has updated', 'Profile Updated');
      // this.isAccount = false;
      this.submittingProfile = false;
      this.close();
    }, err => {
      // this.isAccount = false;
      this.submittingProfile = false;
      this.toastrServices.showError(this.shareDataService.getErrorMessage(err), 'My Account');
    });
  }

  public changePassword(): void {
    this.passwordSubmitted = true;
    // tslint:disable-next-line: curly
    if (this.passwordForm.invalid) return;
    // if (this.passwordForm.controls.current_password.value === this.passwordForm.controls.new_password.value) {
    //   return this.toastrServices.showError('Current Password And New Password Should be different', 'Change Password');
    // }
    let old_password = this.userInfo.phone_number
    let new_password = this.passwordForm.controls.cell_phone.value
    
    if (old_password.includes('+1')) {
      old_password = old_password.replace('+1', '');
    } 
    if (new_password.includes('+1')) {
      new_password = new_password.replace('+1', '');
    } 

    const data = {
      old_password: old_password,
      new_password: new_password,
      confirm_password: new_password
    };
    this.isPassword = true;
    this.httpService.put(data, 'auth/changePassword/').subscribe(res => {
      this.toastrServices.showSuccess(res.message, 'My Account');
      this.isPassword = false;
      this.passwordSubmitted = false;
      this.passwordForm.reset();
      location.reload();
    }, err => {
      this.isPassword = false;
      if (err.status === 400) {
        this.toastrServices.showError(err.error.message, 'Change Password');
      } else {
        this.toastrServices.showError(this.shareDataService.getErrorMessage(err), 'Change Password');
      }
    });
  }

  public logout(): void {
    this.shareDataService.userData.next(null);
    this.authService.logout();
    location.reload();
    this.router.navigate(['/login']);
  }

  notify() {
    Swal.fire({
      title: 'Email Sent',
      text: `An email has been sent to ${this.userForm.value.email} with further instructions`,
      // text: `An email has been sent to your email with further instructions`,
      imageUrl: '../../../../assets/icons/Done.png',
      imageAlt: '',
      showCancelButton: false,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
      }
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    $('#profileModal').modal('show');
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.profile_pic = this.dataURItoBlob(event.base64);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  close() {
    $('#profileModal').modal('hide');
    this.profile_pic = undefined;
    this.croppedImage = '';
    this.imageChangedEvent = '';
    this.submittingProfile = false;
  }
  dataURItoBlob(dataURI:any) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

}
