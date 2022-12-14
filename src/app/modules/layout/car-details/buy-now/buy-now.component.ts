import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { environment } from 'src/environments/environment';
import { CountryISO } from 'ngx-intl-tel-input';
import Swal from 'sweetalert2';
declare const $:any;

@Component({
  selector: 'post-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.scss']
})
export class BuyNowComponent implements OnInit ,OnChanges{
  @Output() buyNowCreated = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<any>();
  @Output() message = new EventEmitter<any>();
  @Input() buynow:any = FormGroup;
  @Input() offerValue: any
  stepValue: any;
  @Input() set clickedOnConfirm(ev: any) {
    if(ev) {
      this.Login = true;
      this.isShow = true;
      $(`#emailModalPopup`).modal('hide');
    } else {
      this.Login = false;
      this.isShow = false;

    }
  };
  params: any;
  checknumber:any;
  passwordMatch: any;
  data: any
  submitted = false;
  sendOtp: any;
  verifyOtp: any;
  otpSent = false;
  otpVerified = false;
  buynowForm:any = {};
  codeError: any;
  data1 : any;
  Login! : boolean ;
  isShow! :boolean ;
  constructor(private router: Router,
    private shareDataService: ShareDataService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrServices,
    private httpService: HttpService,
    private fb: FormBuilder) { }
  
    ngOnChanges(){
    this.stepValue= this.offerValue
   
  }
  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.params;
  }

  get f() { return this.buynow.controls; }

  verifyPhoneNumber(data?:any):any{    
    if(this.Login){
      return true;
    } else {
    this.data = this.buynow.getRawValue();
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
    this.httpService.post(this.data1,`seller/check/number/`).subscribe((res: any) => {
       
    },
    err => {
      this.checknumber = err.error.message
      if(err.error.message === "Number already exists!"){
        this.buynow.controls.cell_phone.reset();
      }
        this.buynow.get('cell_phone').setErrors({pattern: true})
        this.buynow.controls.cell_phone.markAsTouched();
      }
      )
    }
  }

  verifyEmail(value:any): void {
    if(this.Login) return;
    if (value.target.value && value.target.value) {
      this.httpService.post({ email: value.target.value },`auth/user/email/verify/`).subscribe((res: any) => {
        if (res.message == "Email already exists") {
          this.message = res.message;
          // this.notify();
          $(`#emailModalPopup`).modal('show');
        } else {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
        }
      })
    }
  }
  zipcode(data:any){
    this.data = this.buynow.getRawValue();
    this.data.zip_code
    if (this.data && this.data.zip_code && this.data.zip_code.length <= '4') {
      return;
    }
    this.httpService.get(`auth/zip-code/${data.target.value}/`).subscribe((res: any) => {
      if(res.errorMessage== "Zip code does not exists"){
        this.buynow.controls.zip_code.setErrors({ pattern: true });
        this.buynow.controls.zip_code.markAsTouched();
        this.buynow.controls.city.reset();
        this.buynow.controls.state.reset()
      }
      this.buynow.patchValue({
        city:res.data[0].city ,
        state: res.data[0].state_name
      });
    });
  }

  notify() {
    Swal.fire({
      title: 'Login',
      imageUrl: 'assets/icons/error.png',
      text: "You are existing user",
      showCancelButton: true,
      confirmButtonColor: '#3ebb78',
      cancelButtonColor: '#f15156',
      cancelButtonText: ' Cancel ',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Login  = true;
      }
      else {
        this.buynow.reset();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
      }
    })
  }
  send_Otp() {
    if(this.Login){
      let phone_number = this.buynow.controls.cell_phone.value;
      if (phone_number.includes('+1')) {
        phone_number = phone_number.replace('+1', '');
      }
      this.passwordMatch = {
        email: this.buynow.controls.email.value.toLowerCase(),
        password: phone_number,
      } 
      this.httpService.post(this.passwordMatch, 'seller/varify_email_phone_number/')
      .subscribe(res => { 
        if(res.is_user_exist) {
          this.send_OtpVerify();
        } 
        },  (err:any) => {
          this.buynow.controls.cell_phone.setErrors({ pattern: true });
          // this.toastr.showError(this.shareDataService.getErrorMessage(err), 'Number');
        });
    } else {
      this.send_OtpVerify();
    }
  }

 public send_OtpVerify() {
    this.data = this.buynow.getRawValue();
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
        if(err.error.phone_number && err.phone_number.length) {
          this.buynow.get('cell_phone').setErrors({
              invalid: err.error.phone_number[0]
          });
        } else {
          this.buynow.get('cell_phone').setErrors({
            invalid: err.error.message
          });
        }
        // if(err.message="This phone no. is already exist Please Login!"){
        //   this.buynow.get('cell_phone').setErrors({
        //     pattern: true
        //   })
        // }
        // else{
        
        // }
     
      }
    )
  }

  verifyOtps(event:any) {
    this.codeError = false;
    this.data = this.buynow.getRawValue();
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
        this.verifyOtp = res
        this.otpVerified = true;
      }, err => {
        this.codeError = true;
        this.buynow.get('otp').setErrors({
          otp: true
        })
      }
    )
  }
  public login() {
    let phone_number = this.buynow.controls.cell_phone.value;
      if (phone_number.includes('+1')) {
        phone_number = phone_number.replace('+1', '');
      }
    this.buynowForm = {
      email: this.buynow.controls.email.value.toLowerCase(),
      password: phone_number,
    } 
    this.httpService.post(this.buynowForm, 'auth/seller/login/')
    .subscribe(res => { 
      this.storageService.saveToLocalStorage('userInfo', res);
      this.shareDataService.userData.next(res);
      this.submitOfferWhenLoggedIn();
      this.close()
    }, err => {
      // this.otpVerified = false;
      // this.isShow = true;
      // this.otpSent = false;
      // this.buynow.get('cell_phone').reset();
      // this.buynow.get('otp').reset();
      this.toastr.showError(this.shareDataService.getErrorMessage(err), 'Login');
    });
    
  }

  onSubmit() {
    if(this.Login) { 
      this.login();
    } else {
      this.submitOfferWhenLoggedIn();
    }
  }

  submitOfferWhenLoggedIn() {
    this.buynowForm = {
      name: this.buynow.controls.name.value,
      email: this.buynow.controls.email.value.toLowerCase(),
      cell_phone: this.buynow.controls.cell_phone.value,
      city:this.buynow.controls.city.value,
      state:this.buynow.controls.state.value,
      zip_code:this.buynow.controls.zip_code.value
    }
    this.buyNowCreated.emit(this.buynowForm);
    this.close()
  }

  // checkNumber(event) {
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     return false;
  //   }
  //   return true;
  // }

  close() {
    $('body').removeClass('no-scroll');
    $('#buyNowModalWeb').modal('hide');
    $('#buyNowModalMobile').modal('hide');
    this.buynow.reset()
    this.otpSent = false;
    this.otpVerified = false;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.closePopup.emit(true);
  }
}
