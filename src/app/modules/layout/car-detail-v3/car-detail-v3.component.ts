import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { RemoveEmptyKeys } from 'src/app/_helper/remove-empty-key';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as _ from 'lodash';
import { StorageService } from 'src/app/services/storage.service';
import { IMAGE_RESOLUTIONS } from 'src/app/constants/media-resolutions';

@Component({
  selector: 'post-car-detail-v3',
  templateUrl: './car-detail-v3.component.html',
  styleUrls: ['./car-detail-v3.component.scss']
})
export class CarDetailV3Component implements OnInit {
  params: any;
  carDetail: any;
  bidList: any[] = [];
  pixelWidth: any;
activityData:any;
  galleryImages: NgxGalleryImage[] = [];
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '100%',
      height: '550px',
      thumbnailsColumns: 9,
      thumbnailsMargin: 0,
      thumbnailsMoveSize: 1,
      imageAnimation: NgxGalleryAnimation.Slide,
      imageAutoPlay: false,
      imageAutoPlayInterval: 20000,
      imageAutoPlayPauseOnHover: true,
      imageArrowsAutoHide: false,
      imageInfinityMove: true,
      previewInfinityMove: true,
      previewAnimation: false,
      preview: false,
      previewArrows: false,
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
      imageArrows: true,
      imageBullets: true,
    },

    {
      breakpoint: 400,
      preview: false,
      width: '100%',
      height: '300px',
      thumbnails: true,
      thumbnailMargin: 350,
    },
    {
      breakpoint: 414,
      preview: false,
      height: '350px',
      thumbnails: true,
      thumbnailMargin: 330,
      thumbnailsMargin: 0,
    },
    {
      breakpoint: 425,
      preview: false,
      height: '350px',
      thumbnails: true,
      thumbnailMargin: 300,
      thumbnailsMargin: 0,
    },
    {
      breakpoint: 480,
      preview: false,
      height: '360px',
      thumbnails: true,
      thumbnailMargin: 250,
      thumbnailsMargin: 0,
    },
    {
      breakpoint: 767,
      preview: false,
      width: '100%',
      height: '370px',
      thumbnails: true,
      thumbnailMargin: 250,
      thumbnailsMargin: 10,
    },
    {
      breakpoint: 786,
      preview: false,
      width: '100%',
      height: '350px',
      thumbnailsColumns: 6,
      thumbnails: true,
      thumbnailMargin: 0,
    },
    {
      breakpoint: 991,
      thumbnailMargin: 250,
      thumbnailsMargin: 10,
    },

    {
      breakpoint: 1024,
      preview: false,
      width: '100%',
      imagePercent: 80,
      thumbnailsColumns: 8,
      thumbnailsPercent: 10,
      thumbnailsMargin: 0,
      thumbnails: true,
      thumbnailMargin: 200,
    },

    {
      breakpoint: 1199,
      thumbnailMargin: 450,
      thumbnailsMargin: -20,
    },
    {
      breakpoint: 1280,
      thumbnailsColumns: 6,
      thumbnailMargin: -50,

      // thumbnailsMoveSize: 1,     
    },
    {
      breakpoint: 1440,
      // thumbnailMargin: 200,
    },

  ];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    center: false,
    stagePadding: 0,
    items: 4,
    autoplayTimeout: 4000,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    margin: 20,
    autoWidth: false,
    navText: ['', ''],
    responsive: {
      0: {
        center: false,
        stagePadding: 0,
        items: 2,
      },
      500: {
        center: false,
        stagePadding: 0,
        items: 4,
      },
      700: {
        center: false,
        stagePadding: 0,
        items: 4,
      },
      940: {

        stagePadding: 0,
        items: 4,
        loop: false
      }
    },
    nav: true
  };

  carStatustext!: string;
  popularCars: any;
  popularCars1: any;
  stepsList: any;
  userInfo: any;
  payload!: {};
  extraData: any;
  numberOfBids!: any[];

  constructor(private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private shareDataService: ShareDataService,
    private httpService: HttpService,
    private toastrServices: ToastrServices,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.params;
    this.userInfo = this.storageService.getFromLocalStorage('userInfo');
    this.getApprovalList();
    this.getpopularCars()
    this.getVehicleActivity();
  }

  private getApprovalList(): void {
    this.spinnerService.run();
    this.httpService.get(`seller/vehicle/${this.params.id}/`).subscribe(
      res => {
        if(res.is_admin_permitted){
          this.carDetail = this.fixDataErrors(res);
          this.spinnerService.stop();
        }
        else{
          this.spinnerService.stop();
          this.router.navigate(['./'])
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

  ///you may like cars
  private getpopularCars() {
    this.httpService.get('dealer/popular/list/').subscribe((res:any) => {
      const index = res.findIndex((item:any) => item.id == this.params.id);
      if (index >= 0) {
        res.splice(res.findIndex((item:any) => item.id == this.params.id), 1);
      }
      this.popularCars = res;

    },
      err => {
        this.spinnerService.stop();
        this.toastrServices.showError(
          this.shareDataService.getErrorMessage(err),
          'Review'
        );
      }
    )
  }

  //// get Vehicle Activity list
  private getVehicleActivity(): void {
    let endpoint = '';
    endpoint = `seller/post/activity/${this.params.id}/`
    this.httpService.get(endpoint).subscribe(
      (res:any) => {
      this.activityData = res.data;
      },
      (err:any) => {
        this.spinnerService.stop();
      }
    )
  }

  fixDataErrors(res:any) {
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
          big: `${images[key]}?tr=w-${IMAGE_RESOLUTIONS.LARGE}`,
          medium: `${images[key]}?tr=w-${IMAGE_RESOLUTIONS.MEDIUM}`,
          small: `${images[key]}?tr=w-${IMAGE_RESOLUTIONS.SMALL}`,
        };
        mainImages.push(data);
      } else if (['images'].indexOf(key) >= 0) {
        _.map(images[key], (i, index) => {
          return otherImages.push({
            big: `${i}?tr=w-${IMAGE_RESOLUTIONS.LARGE}`,
            medium: `${i}?tr=w-${IMAGE_RESOLUTIONS.MEDIUM}`,
            small: `${i}?tr=w-${IMAGE_RESOLUTIONS.SMALL}`,
          });
        });
      }
    }
    );
    this.galleryImages = _.concat(mainImages, otherImages).splice(1)

    this.galleryImages.forEach((items: any, index: number) => {
      items.index = index;
    });
  }

}
