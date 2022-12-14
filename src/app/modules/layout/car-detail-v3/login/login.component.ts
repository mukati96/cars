import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Store } from '@ngrx/store';

import { AppState, selectAuthState } from 'src/app/core/models/app.states';
import { LogIn } from 'src/app/core/models/auth.actions';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/guards/auth.service';
declare const $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm:any = FormGroup;
  successIcon = 'src/assets/icons/Base.png';
  submitted = false;
  formSubmitting = false;
  isAuthenticated = false;
  params: any;
  userInfo: any;
  getState!: Observable<any>;
  errorMessage!: string | null;
  loginUrl:any = '';
  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrServices,
              private httpService: HttpService,
              private auth: AuthService,
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
      email: ['',
      [
        Validators.required,
        Validators.email
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.loginUrl = this.activatedRoute.snapshot.queryParamMap.get('returnTo');
    this.params = this.activatedRoute.snapshot.params;
  }


  get f():any { return this.loginForm.controls; }

  public onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    this.formSubmitting = true;
    this.httpService.post(this.loginForm.value, 'auth/seller/login/')
    .subscribe(res => {
      this.storageService.saveToLocalStorage('userInfo', res);
      this.shareDataService.userData.next(res);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/car-details/'+this.params.id]);
     
      this.close();
    }, err => {
      this.toastr.showError(this.shareDataService.getErrorMessage(err), 'Login');
    });
  }

  keydown(event:any) {
    // tslint:disable-next-line: deprecation
    const e = window.event || event;
    const key = e.keyCode;
    // space pressed
    if (key === 32) { // space
      e.preventDefault();
     }
  }

  forgetpassword(){
    this.router.navigate(['/forgot-password']).then( ()=>{
      window.location.reload()
    })
    }

  close() {
    $('#makeOfferWeb').modal('hide');
    $('#makeOfferMobile').modal('hide');
    $('#buyNowModalWeb').modal('hide');
    $('#buyNowModalMobile').modal('hide');
    this.loginForm.reset();
    this.submitted = false;
  }
}
