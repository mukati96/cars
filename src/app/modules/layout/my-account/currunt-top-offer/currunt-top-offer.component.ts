import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import * as _ from 'lodash';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RemoveEmptyKeys } from 'src/app/_helper/remove-empty-key';
declare const $: any;
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexMarkers,
  ApexFill
} from "ng-apexcharts";
import { PremiumFeatures } from '../../new-register/car-details/car-details.component';
// import { CarDetailV3Component } from '../../car-detail-v3/car-detail-v3.component';

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  dataLabels: any;
  grid: any;
  stroke: any;
  title: any;
  markers: any;
  color: any;
  fill: any;
  

};

@Component({
  selector: 'post-currunt-top-offer',
  templateUrl: './currunt-top-offer.component.html',
  styleUrls: ['./currunt-top-offer.component.scss']
})
export class CurruntTopOfferComponent implements OnInit, AfterViewInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  appointmentForm!: FormGroup;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    autoplayTimeout: 4000,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    margin: 20,
    navText: ['', ''],
    items: 4,
    responsive: {
      0: {
        center: false,
        stagePadding: 0,
        items: 1,
      },
      500: {
        center: true,
        stagePadding: 50,
        items: 2,
      },
      700: {
        center: false,
        stagePadding: 0,
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };
  params: any;
  carDetail: any = {};
  carStatustext!: string;
  reApproving = false;
  reqSent = false;
  submitted = false;
  formSubmitting = false;
  fetchingZipCode = false;
  submittedZip = false;
  minTime: any;
  galleryImages: NgxGalleryImage[] = [];
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '100%',
      height: '450px',
      thumbnailsColumns: 6,
      thumbnailsMargin: 10,
      imageAnimation: NgxGalleryAnimation.Slide,
      imageAutoPlay: true,
      imageAutoPlayInterval: 3000,
      imageAutoPlayPauseOnHover: true,
      imageArrowsAutoHide: false,
      imageInfinityMove: true,
      previewInfinityMove: true,
      previewAnimation: false,
      preview: true,
      previewArrows: true,
      previewFullscreen: false,
      previewAutoPlay: false,
      previewAutoPlayPauseOnHover: false,
      previewArrowsAutoHide: false,
      previewZoom: false,
      previewZoomStep: 1,
      previewDownload: false,
      previewCloseOnClick: true,
      closeIcon: 'fa fa-times',
      thumbnails: true,
      thumbnailsAutoHide: true,
      imageArrows: false,
    },
    // max-width 800
    {
      preview: true,
      breakpoint: 800,
      width: '100%',
      height: '600px',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20,
    },
    // max-width 400
    {
      breakpoint: 500,
      preview: true,
      width: '100%',
      height: '250px',
      thumbnailsColumns: 4,
      thumbnails: false,
    },

    {
      preview: true,
      breakpoint: 300,
      width: '100%',
      height: '200px',
      thumbnailsColumns: 2
    }
  ];
  premiumData: PremiumFeatures = {
    comform_convenienc: '',
    roof_glass: '',
    exterior: '',
    cargo_towning: '',
    seats: '',
    accesssory_packages: '',
    lighting: '',
    wheels_tires: [],
    braking_traction: [],
    entertainment_instrumentation: [],
    after_market_modification: []
  };
  swalWithcustomClass = Swal.mixin({
    customClass: {
      container: 'auction-container-class',
      popup: 'auction-popup-class',
      // header: 'auction-header-class',
      title: 'auction-title-class',
      closeButton: 'auction-close-button-class',
      icon: 'auction-icon-class',
      image: 'auction-image-class',
      // content: 'auction-content-class',
      input: 'auction-input-class',
      actions: 'auction-actions-class',
      confirmButton: 'auction-confirm-button-class',
      cancelButton: 'auction-cancel-button-class',
      footer: 'auction-footer-class'

    },
    buttonsStyling: false
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinnerService: SpinnerService,
    private shareDataService: ShareDataService,
    private httpService: HttpService,
    private toastrServices: ToastrServices
  ) {
    this.chartOptions = {
      series: [
        {
          name: '',
          data: [260000, 248000, 230000, 224000, 210000,]
        }
      ],
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1,2]
      },
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false
        },

        toolbar: {
          show: true,
          tools: {
            download: false
          }
        },

      },
      markers: {
        discrete: this.getRandomColor(),
      },
      // dataLabels: {
      //   enabled: false
      // },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }

      },

      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.8,
          inverseColors: false,
          opacityFrom: 0.55,
          opacityTo: 0.52,
          stops: [10, 100, 100, 100]
        }
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      xaxis: {

        categories: [
          "February 2022",
          "February 2, 2022",
          "February 4, 2022",
          "February 5, 2022",
          "March 2022",

        ]
      }
    };
  }

  ngOnInit(): void {
    this.initForm();
    this.params = this.activatedRoute.snapshot.params;
    this.getApprovalList();
  }
   getRandomColor() {
    let data1: any = [];
    for (let i = 0; i < 5; i++) {
      var random = Math.floor(0x1000000 * Math.random()).toString(16);
      const color = '#' + ('000000' + random).slice(-6);
      data1.push({
        seriesIndex: 0,
        dataPointIndex: i,
        fillColor: color,
        strokeColor: "#FFF",
        size: 5
      });
    }
    return data1
    }
  initForm(): void {
    this.appointmentForm = this.fb.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      dealer: ['', [Validators.required]],
      offer_price: ['', [Validators.required]],
      is_approved: [false],
      conformed_status: ['Processing'],
      offer: ['']
    });
  }
  get f(): any {
    return this.appointmentForm.controls;
  }

  private getApprovalList(): void {
    this.spinnerService.run();
    this.httpService.get(`seller/vehicle/${this.params.id}/`).subscribe(
      res => {
        this.carDetail = this.fixDataErrors(res);
        this.spinnerService.stop();
        if (this.carDetail.conformed_status === 'Sold') {
          this.carStatustext = 'Deal is finalized for this car';
        } else if (this.carDetail.vehicle_status === 2) {
          this.carStatustext = 'Done: Auction End';
        } else if (!this.carDetail.is_admin_permitted) {
          this.carStatustext = 'Reviewing by admin for approval';
        } else if (this.carDetail.is_admin_permitted) {
          this.carStatustext = 'Live: Item has posted';
        }
      },
      err => {
        this.spinnerService.stop();
        this.toastrServices.showError(
          this.shareDataService.getErrorMessage(err),
          'Review'
        );
      }
    );
  }

  fixDataErrors(res:any) {
    // tslint:disable-next-line: curly
    if (!res.name) res.name = `${res.year} ${res.make} ${res.trim}`;
    if (res.upgrades.length ? res.upgrades[0].includes(',') : false) {
      res.upgrades = res.upgrades[0].split(',');
    } else if (res.upgrades[0] === '') {
      res.upgrades = [];
    }
    if (
      res.premium_features.length
        ? res.premium_features[0].includes(',')
        : false
    ) {
      res.premium_features = res.premium_features[0].split(',');
    } else if (res.premium_features[0] === '') {
      res.premium_features = [];
    }
    res.offer_price.map((item:any) => {
      item.offer_price = parseInt(item.offer_price, 10);
    });
    res.offer_price = _.orderBy(res.offer_price, ['offer_price'], ['desc']);
    this.perpareImages(res);
    const allPF = _.concat(res.premium_features, res.upgrades);
    this.preparePF(allPF);
    if (res.vehicle_status === 3) {
      this.router.navigate(['/my-account/mycar'], {
        replaceUrl: true
      });
    } else if (res.vehicle_status !== 2 &&
      res.offer_price.length &&
      res.conformed_status !== 'Sold' &&
      res.conformed_status !== 'Processing') {
      this.router.navigate(['/my-account/auction/' + res.id], {
        replaceUrl: true
      });
    }
    return res;
  }

  perpareImages(images:any): void {
    const mainImages: object[] = [];
    const otherImages: object[] = [];
    images = RemoveEmptyKeys(images);
    Object.keys(images).map((key, index) => {
      if (
        [
          'front_image',
          'rear_image',
          'passenger_image',
          'dashboard_image',
          'driver_image',
          'sitting_image'
        ].indexOf(key) >= 0) {
        const data = {
          big: images[key],
          medium: images[key],
          small: images[key]
        };
        mainImages.push(data);
      } else if (['images'].indexOf(key) >= 0) {
        _.map(images[key], (i) => {
          return otherImages.push({
            big: i,
            medium: i,
            small: i
          });
        });
      }
    }
    );
    this.galleryImages = _.concat(mainImages, otherImages);
  }

  preparePF(data:any) {
    _.forEach(data, i => {
      if (
        [
          'Stereo System',
          'Suspension',
          'Wheel and Tires',
          'Performance'
        ].indexOf(i) >= 0
      ) {
        this.premiumData.after_market_modification.push(i);
      } else if (
        [
          'Premium Sound',
          'Navigation System',
          'DVD System',
          'UConnect',
          'CD/MP3 (Multi Disc)'
        ].indexOf(i) >= 0
      ) {
        this.premiumData.entertainment_instrumentation.push(i);
      } else if (
        [
          'Stability Control',
          'Hill Start Assist',
          'Sport Suspension',
          'ZQ8 Sport Suspension'
        ].indexOf(i) >= 0
      ) {
        this.premiumData.braking_traction.push(i);
      } else if (['Premium Wheels', 'Premium Wheels 19°+'].indexOf(i) >= 0) {
        this.premiumData.wheels_tires.push(i);
      } else if (i === 'Keyless Start') {
        this.premiumData.comform_convenienc = i;
      } else if (i === 'Moon Roof') {
        this.premiumData.roof_glass = i;
      } else if (i === 'Fog Lights') {
        this.premiumData.exterior = i;
      } else if (i === 'Roof Rack') {
        this.premiumData.cargo_towning = i;
      } else if (i === 'Heated Seats') {
        this.premiumData.seats = i;
      } else if (i === 'Sport Appearance') {
        this.premiumData.accesssory_packages = i;
      } else if (i === 'Daytime Running Lights') {
        this.premiumData.lighting = i;
      }
    });
  }

  getNumberWithOrdinal(n:any) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }

  reApprove() {
    this.reApproving = true;
    this.httpService
      .put(this.carDetail, `seller/expiry/approval/${this.carDetail.id}/`)
      .subscribe(
        res => {
          this.toastrServices.showSuccess(
            'Please make sure that your car still has same condition before it posted',
            'Request Sent'
          );
          this.reApproving = false;
          this.reqSent = true;
        },
        err => {
          this.reApproving = false;
          this.toastrServices.showError(
            this.shareDataService.getErrorMessage(err),
            'Re-approving'
          );
        }
      );
  }

  confirmSelect(data:any) {
    this.swalWithcustomClass
      .fire({
        title: `<strong>Select your dealer</strong>`,
        imageAlt: '',
        html: `Are you sure you want to select this dealer?
      If you choose a dealer, they will make a schedule to
      visit your place.`,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Confirm',
        focusConfirm: false,
        allowOutsideClick: false
      })
      .then(result => {
        if (result.isConfirmed) {
          // open modal
          const currentDate = new Date();
          this.f.dealer.setValue(data.user_id);
          this.f.offer_price.setValue(data.offer_price);
          this.f.offer.setValue(data.id);
          this.f.vehicle.setValue(this.params.id);
          this.f.date.setValue(currentDate);
          this.minTime = this.formatAMPM(currentDate);
          this.f.time.setValue(this.minTime);
          this.f.conformed_status.setValue('Processing');
          this.f.is_approved.setValue(false);
          $('#appointModal').modal('show');
        }
      });
  }

  onRequest() {
    this.submitted = true;
    if (this.appointmentForm.invalid || !this.submittedZip) {
      return this.toastrServices.showError(
        'Please provide all the information for appointment',
        'Appointment'
      );
    }
    this.formSubmitting = true;
    const data: any = this.appointmentForm.value;
    data.date = this.getDateFormat(data.date);
    this.httpService.post(data, 'appointment/confirm/appraisal/').subscribe(
      res => {
        this.toastrServices.showSuccess(
          'Appointment successfully created',
          'Appointment'
        );
        this.formSubmitting = false;
        this.close();
      },
      err => {
        this.formSubmitting = false;
        this.toastrServices.showError(
          this.shareDataService.getErrorMessage(err),
          'Appointment'
        );
      }
    );
  }

  getDateFormat(input:any) {
    const date: Date = new Date(input);
    const year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let dt: any = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return year + '-' + month + '-' + dt;
  }

  getZipCode() {
    if (this.f.zip_code.value) {
      this.fetchingZipCode = true;
      this.httpService
        .get(`auth/zip-code/${this.f.zip_code.value}/`)
        .subscribe((res: any) => {
          if (res.data) {
            this.fetchingZipCode = false;
            this.submittedZip = true;
            this.f.city.setValue(res.data[0].city);
            this.f.state.setValue(res.data[0].state_id);
            this.f.zip_code.setErrors(null);
          } else {
            this.fetchingZipCode = false;
            this.submittedZip = true;
            this.f.zip_code.setErrors({ invalid: true });
          }
        });
    }
  }

  close() {
    $('#appointModal').modal('hide');
    this.appointmentForm.reset();
    this.submitted = false;
  }

  get minDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  formatAMPM(date:any) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  async onChanges() {
    if (this.getDateFormat(this.appointmentForm.value.date) === this.getDateFormat(new Date())) {
      const currentDate = new Date();
      this.minTime = this.formatAMPM(currentDate);
    } else {
      if (this.getDateFormat(this.appointmentForm.value.date) < this.getDateFormat(new Date())) {
        this.appointmentForm.controls['date'].setErrors({ minlength: true });
      }
      this.minTime = this.formatAMPM(this.appointmentForm.value.date);
    }
  }

  convertNameToAsterisk(name:any): any {
    return name.replace(name.substr(2, name.length - 3),
      name.substr(1, 5).replace(/./g, '*'));
  }

  ngAfterViewInit() {
    $(() => {
      $('#carousel1_indicator').carousel();
    });
  }
}
