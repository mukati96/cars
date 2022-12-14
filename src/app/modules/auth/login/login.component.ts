import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AppState, selectAuthState} from 'src/app/core/models/app.states';
declare const $: any;

@Component({
  selector: 'post-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm:any = FormGroup;
  successIcon = 'src/assets/icons/Base.png';
  submitted:boolean = false;
  formSubmitting:boolean = false;
  isAuthenticated:boolean = false;
  params: any;
  userInfo: any;
  getState: Observable<any>;
  errorMessage: any;
  loginUrl:any = '';
  otpSent:boolean = false;
  otpVerified:boolean = false;
  isShow = true;
  passwordMatch: any;
  data: any;
  data1: any;
  sendOtp: any;
  verifyOtp: any;
  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrServices,
              private httpService: HttpService,
              private store: Store<AppState>,
              private storageService: StorageService,
              private shareDataService: ShareDataService) {
                this.getState = this.store.select(selectAuthState);
                this.shareDataService.userDataSubscription.subscribe(user => {
                  this.userInfo = user;
                });
               }

  ngOnInit(): void {
     this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cell_phone: ['', [Validators.required, Validators.pattern('^((\\+1-?)|0)?[0-9]{10}$')]],
      otp: ['', Validators.required],
    });
    this.loginUrl = this.activatedRoute.snapshot.queryParamMap.get('returnTo');
    this.params = this.activatedRoute.snapshot.queryParams;
    if (this.params.token) {
      this.verifyEmail(this.params);
    }
    else{
      this.listenStateChanges();
    }
  }

  get f():any { return this.loginForm.controls; }

  send_Otp() {
      let phone_number = this.loginForm.controls.cell_phone.value;
      if (phone_number.includes('+1')) {
        phone_number = phone_number.replace('+1', '');
      } 
      this.passwordMatch = {
        email: this.loginForm.controls.email.value.toLowerCase(),
        password: phone_number,
      } 
      this.httpService.post(this.passwordMatch, 'seller/varify_email_phone_number/')
      .subscribe(res => { 
        if(res.is_user_exist) {
          this.send_OtpVerify();
          this.loginForm.controls.cell_phone.setErrors(null);
        } 
        }, err => {
          this.loginForm.controls.cell_phone.setErrors({ pattern: true });
        });
    }

    public send_OtpVerify() {
      this.data = this.loginForm.getRawValue();
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
          this.loginForm.get('cell_phone').setErrors({
            pattern: true
          })
        }
      )
    }

    verifyOtps(event:any) {
      this.data = this.loginForm.getRawValue();
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
          // this.codeError = true;
          this.loginForm.get('otp').setErrors({
            otp: true
          })
        }
      )
    }

  listenStateChanges() {
    this.getState.subscribe((state) => {
      this.formSubmitting = false;
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  private verifyEmail(params:any): void {
    this.httpService.put(params, 'auth/email/verify/').subscribe( res => {
      if (this.userInfo) {
        this.router.navigateByUrl(this.loginUrl);
      }
    }, err => {
      this.toastr.showError(this.shareDataService.getErrorMessage(err), 'Verify Email');
    });
  }


  public onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    this.formSubmitting = true;
    let phone_number = this.loginForm.controls.cell_phone.value;
      if (phone_number.includes('+1')) {
        phone_number = phone_number.replace('+1', '');
      } 
      this.passwordMatch = {
        email: this.loginForm.controls.email.value.toLowerCase().replace(/ /g,''),
        password: phone_number,
      }

    this.httpService.post(this.passwordMatch, 'auth/seller/login/')
    .subscribe(res => {
      this.storageService.saveToLocalStorage('userInfo', res);
      this.shareDataService.userData.next(res);
      this.router.navigate(['/my-account/account']);
      this.formSubmitting = false;
    }, err => {
      this.otpVerified = false;
      this.isShow = true;
      this.otpSent = false;
      this.loginForm.get('cell_phone').reset();
      this.loginForm.get('otp').reset();
      this.formSubmitting = false;
      this.toastr.showError(this.shareDataService.getErrorMessage(err), 'Login');
    });
  }

  keydown(event:any) {
    const e = window.event || event;
    const key = e.keyCode;
    if (key === 32) { // space
      e.preventDefault();
     }
  }
}
