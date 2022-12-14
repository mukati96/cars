import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery-9';

declare const $: any;

import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/guards/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'post-mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.scss']
})
export class MobileViewComponent implements OnInit {
  makeOffer!:FormGroup
  financeCalculater!:FormGroup
  login = false;
  makeoffer = false;
  buyNow = false;
  loginbuy = false
  @Input() galleryImages: NgxGalleryImage[] = [];
  @Input() carStatustext!: string;
  @Input() carDetail: any = {};
  @Input() popularCars1: any  = [];
  @Input() bidList: any = {}
  @Input() customOptionsMobile!: OwlOptions;
  @Input() galleryOptions: NgxGalleryOptions[] = [];
  auth_token:any = localStorage.getItem('auth_token');
  submitted = false;
  formSubmitting = false;
  userInfo: any;
  userInfos!:boolean;
  year:any
  offer_price: any;
  constructor(private storageService: StorageService,
    private readonly authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userInfo = this.storageService.getFromLocalStorage('userInfo');
    if (this.userInfo == false) {
      this.userInfos = false
    }
    else {
      this.userInfos = true
    }
    this.makeOffer = this.fb.group({
      value: ['', Validators.required]
    })
  }

  buynow() {
    if (this.authService.checkAuthentication()) {
      this.buyNow = true;
      this.loginbuy = false;
    } else {
      this.buyNow = false;
      this.loginbuy = true
    }
  }

  clearValue() {
    if (this.authService.checkAuthentication()) {
      this.makeoffer = true;
      this.login = false;
    } else {
      this.makeoffer = false;
      this.login = true
    }
    this.offer_price = this.makeOffer.value.value
    sessionStorage.setItem('offer_price', this.offer_price)
    if (this.offer_price == '') {
      this.makeOffer = this.fb.group({
        value: ['', Validators.required]
      })
    }
    else {
      this.makeOffer = this.fb.group({
        value: ['']
      })

    }
  }

  favoriteToggle(id:any, status:any) {
    if (this.userInfo == '') {
      this.router.navigate(['/login'])
      return
    }
    const data = {
      vehicle: id,
      is_favorite: status
    };
    this.httpService.post(data, 'seller/like/favorite/').subscribe(res => {
      this.popularCars1.map((vehicle :any)=> {
        if (id === vehicle.id) {
          vehicle.is_favorite = status;
        }
        return vehicle;
      });
    })
  }

  ngAfterViewInit() {
    $(() => {
      $('#carousel1_indicator').carousel();
    });
  }

}
