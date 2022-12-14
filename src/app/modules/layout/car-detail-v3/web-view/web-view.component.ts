import { Component, OnInit, Input, OnDestroy, OnChanges, DoCheck } from '@angular/core';
import * as _ from 'lodash';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery-9';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $: any;
declare const ggChat: any;
declare const ggToolbar: any;
import { StorageService } from 'src/app/services/storage.service';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/core/models/app.states';
import { Store } from '@ngrx/store';
// import { UpdateProfile } from 'src/app/store/actions/auth.actions';
import { Subscription } from 'rxjs';
import { UpdateProfile } from 'src/app/core/models/auth.actions';
import { LabelType, Options } from "@angular-slider/ngx-slider";
import { SpinnerService } from 'src/app/services/spinner.service';
import { GoogleGeocodeApiService } from 'src/app/services/google-geocode-api.service';
import { question } from '../../../../constants/question'
@Component({
  selector: 'post-web-view',
  templateUrl: './web-view.component.html',
  styleUrls: ['./web-view.component.scss']
})
export class WebViewComponent implements OnInit, OnDestroy, OnChanges {
  value: any = 0;
  clicked = true;
  question = question
  public Show!: boolean;
  financeCalculater!: FormGroup;
  makeOfferForm!: FormGroup
  login = false;
  makeoffer = true;
  buyNow = true;
  loginbuy = false
  @Input() galleryImages!: NgxGalleryImage[];
  @Input() carStatustext!: string;
  @Input() carDetail: any = {};
  @Input() stepsList: any;
  @Input() popularCars: any;
  @Input() numberOfBids: any
  @Input() extraData: any
  @Input() bidList!: any[];
  @Input() getBid!: any[];
  @Input() customOptions!: OwlOptions;
  @Input() galleryOptions: NgxGalleryOptions[] = [];
  @Input() activityData!: any[];
  buynow: any = FormGroup;
  isExistingUserClickConfirmed = false;
  Login = false;
  auth_token = localStorage.getItem('auth_token');
  show = false;
  hide = false;
  submitted = false;
  userInfo: any;
  offer_price: any;
  params: any;
  buyNowStatusCode: any;
  selectedSteps: any;
  getChildFormData: any;
  payload: any;
  winRate: any;
  date!: Date;
  token!: string;
  subscription!: Subscription;
  email: any;
  dummyBidList: any;
  slideConfig = {
    centerPadding: "60px",
    slidesToShow: 3,
    "arrows": true,
    infinite: true,
    "variableWidth": true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true,
          arrows: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: false,
          "variableWidth": false,
        }
      },
      {
        breakpoint: 410,
        settings: {
          slidesToShow: 2,
          dots: false,
          "variableWidth": false,
        }
      },
      {
        breakpoint: 300,
        settings: "unslick" // destroys slick
      }]
  };
  output: any;
  outputs!: HTMLOutputElement;
  offerValue: any;
  maxRange: any;
  minRange: any;
  options: any;
  checkboxanswer: any = [];
  ques: any
  wrightAnswer: any;
  zipCode: any;
  geoLateLong: any;
  constructor(private storageService: StorageService,
    private spinnerService: SpinnerService,
    private fb: FormBuilder,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private shareDataService: ShareDataService,
    private toastrServices: ToastrServices,
    private googleapis: GoogleGeocodeApiService) { }

  ngOnChanges() {
    this.maxRange = this.carDetail?.asking_price || 0;
    this.range();
  }

  wrightques(ev: any) {
    this.wrightAnswer = [ev]
  }

  geoCodeLocationApi() {
    this.googleapis.getLatLongByZipCode(this.carDetail.zip_code).subscribe((data: any) => {
      this.geoLateLong = data.results[0];
    });
  }

  changedata(ev: any): any {
    var index = this.checkboxanswer.indexOf(ev.target.value);
    if (index === -1) {
      this.checkboxanswer.push(ev.target.value);
    } else {
      this.checkboxanswer.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.date = new Date();
    this.subscription = this.shareDataService.userDataSubscription.subscribe((data: any) => {
      this.userInfo = data;
    });
    this.params = this.activatedRoute.snapshot.params;
    this.createForm();
    this.geoCodeLocationApi();
  }

  range() {
    this.value = 0;
    this.options = {
      floor: 0,  //start point
      step: 500,
      ceil: `${this.maxRange}`, //end pointEnd point
      showSelectionBar: true,
      translate: (value: any, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return "$" + value.toLocaleString('en');
          case LabelType.High:
            return "$" + value.toLocaleString('en');
          default:
            return "$" + value.toLocaleString('en');
        }
      }
    };
  }

  createForm() {
    this.buynow = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cell_phone: ['', [Validators.required, Validators.pattern('^((\\+1-?)|0)?[0-9]{10}$')]],
      name: ['', Validators.required],
      otp: ['', Validators.required],
      password: [''],
      zip_code: ['', Validators.required,
        Validators.pattern('[0-9]{5}')],
      state: [''],
      city: ['']
    });
  }

  saveCars(id:any, status:any) {
    if (this.userInfo == '') {
      this.router.navigate(['/login'])
      return
    }
    const data = {
      vehicle: id,
      is_favorite: status
    };
    this.httpService.post(data, 'seller/like/favorite/').subscribe(res => {
      if (id === this.carDetail?.id) {
        this.carDetail.is_favorite = status;
      }
    })
  }

  favorite(id: any, status: any) {
    if (this.userInfo == '') {
      this.router.navigate(['/login'])
      return
    }
    const data = {
      vehicle: id,
      is_favorite: status
    };
    this.httpService.post(data, 'seller/like/favorite/').subscribe(res => {
      if (this.carDetail && this.carDetail.length) {
        this.carDetail.map((vehicle: any) => {
          if (id === vehicle.id) {
            vehicle.is_favorite = status;
          }
          return vehicle;
        });
      }
      else if (this.popularCars) {
        this.popularCars.map((vehicle: any) => {
          if (id === vehicle.id) {
            vehicle.is_favorite = status;
          }
          return vehicle;
        });
      } else {
        this.carDetail.is_favorite = status;
      }
    })
  }

  showbreakdown() {
    this.show = true
    this.hide = true
  }

  Hidebreakdown() {
    this.show = false
    this.hide = false
  }


  keydown(event: any) {
    const e = window.event || event;
    const key = e.keyCode;
    if (key === 32) {
      e.preventDefault();
    }
  }

  checkNumber(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  openPopup() {
    $(`#buyNowModalWeb`).modal('show');
  }

  offer() {
    this.offerValue = this.value
    this.isExistingUserClickConfirmed = false;
    this.buynow.reset();
    if (!this.offerValue) {
      $(`#offerSelectModalPopup`).modal('show');

    }
    else {
      this.shareDataService.currentSteps = this.offerValue;
      this.winRatePopup();
    }
  }

  // ///////win-rate -popup/////
  winRatePopup() {
    let payload = {
      offer_price: this.offerValue,
    }
    this.httpService.post(payload, `seller/popup/win/rate/${this.params.id}/`).subscribe(res => {
      let winRates = res.data
      this.winRate = winRates["win-rate"]
      if (!this.userInfo) {
        this.openPopup();
      }
      else {
        $(`#winRateModal`).modal('show');
      }
    },
      err => {
        this.toastrServices.showError(
          this.shareDataService.getErrorMessage(err),
          'Buy Now'
        );
      }
    )

  }

  ////////confirmWinRate//////
  confirmWinRate() {
    $('body').toggleClass('no-scroll');
    $(`#winRateModal`).modal('hide');
    this.payload = {
      "cell_phone": this.userInfo.phone_number.split('+1')[1],
    }
    this.httpService.post(this.payload, `seller/offer/validation/${this.params.id}/`).subscribe(res => {
      if (res.status_code == 200) {
        this.addBid()
      }
    },
      err => {
        this.addBid();
      })
  }
  /////buyit now///
  addBid() {
    if (!this.userInfo) {
      this.payload = Object.assign(this.getChildFormData, {
        vehicle: this.params.id,
        offer_price: this.shareDataService.currentSteps,
        question: this.checkboxanswer.concat(this.wrightAnswer),
      })
    }
    else {
      this.payload = {
        vehicle: this.params.id,
        offer_price: this.shareDataService.currentSteps,
        question: this.checkboxanswer.concat(this.wrightAnswer),
      }
    }
    this.httpService.post(this.payload, 'seller/question/').subscribe(res => {
      if (!this.userInfo) {
        this.openAutoLoginConfirmModal();
        this.token = res.token;
      } else {
        if (res.is_vehicle_creator = "you can't bid because you have created the vehicle") {

        }
        this.redirectOnSamePage();
      }
    }, err => {
      sessionStorage.clear()
      this.openUserBidmModal()
    })
  }

  redirectOnSamePage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/car-details/${this.params.id}`]);
    });
  }

  autoLoginOnBid() {
    if (this.token) {
      this.store.dispatch(new UpdateProfile({ auth_token: this.token }));
    }
    this.closeAutoLoginConfirmModal();
    this.redirectOnSamePage();
    $('html').removeClass('modal-open').css({
      marginTop: 0,
      overflow: 'visible',
      left: 'auto',
      right: 'auto',
      top: 'auto',
      bottom: 'auto',
      position: 'static',
    });
  }

  autoEmail() {
    this.isExistingUserClickConfirmed = true;
  }

  openAutoLoginConfirmModal() {
    $(`#submitOfferModal`).modal('show');
  }

  closeAutoLoginConfirmModal() {
    $(`#submitOfferModal`).modal('hide');
  }
  openUserBidmModal() {
    $(`#userBiDModalPopup`).modal('show');
  }

  closeUserBidmModal() {
    $(`#userBiDModalPopup`).modal('hide');
    $('body').removeClass('no-scroll');
  }

  notify() {
    Swal.fire({
      title: '',
      imageUrl: 'assets/icons/error.png',
      text: "Email already exists do you want to login ?",
      showCancelButton: true,
      confirmButtonColor: '#000',
      confirmButtonText: 'Login'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['./login'])
      } else {
      }
    })
  }

  buyNowCreate(eventData: any) {
    this.getChildFormData = eventData;
    this.shareDataService.currentPhoneNumber = this.getChildFormData.phone_number;
    this.shareDataService.currentEmail = this.getChildFormData.email;
    this.payload = {
      "cell_phone": this.shareDataService.currentPhoneNumber,
    }
    this.httpService.post(this.payload, `seller/offer/validation/${this.params.id}/`).subscribe(res => {
      if (res.status_code == 200) {
        this.addBid()
      }
    },
      err => {
        this.addBid()
      }
    )
  }

  message(temp: any): void {
    this.email = temp;
  }

  simlarCars(id: any) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`/car-details/${id}`]);
  }

  closePopup(ev: any) {
    this.clicked = true;
    this.offerValue = undefined;
  }

  loginCancelModal() {
    $(`#emailModalPopup`).modal('hide');
    this.buynow.get('email').reset();
  }

  offerCancel() {
    $(`#offerSelectModalPopup`).modal('hide');
    $('body').removeAttr('style');

  }
  doThings = (event: any) => {
    const { value, min, max, step, parentElement: parent } = event.target;
    const decimals = step && step.includes('.') ? step.split('.')[1] : 1;
    const percent = `${(((value - min) / (max - min)) * 100).toFixed(
      decimals
    )}%`;
    parent.style.setProperty('--p', percent);
    this.output = value;

  };

  latestPricePopup(){
   this.latestPriceOpenPopup()
  }
  latestPriceOpenPopup() {
    $(`#latestPriceModalWeb`).modal('show');
  }
  latestPriceClosePopup() {
    $(`#latestPriceModalWeb`).modal('hide');
  }
  openChatPopup() {
    ggChat("open");
  }
  checkAvalibilityPopup(){
    ggToolbar.apps.chat.startEventChat("8");
  }
  testDrivePopup(){
    ggToolbar.apps.chat.startEventChat(5)
  }
  closeChatPopup() {
    ggChat("close");
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
