import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { StorageService } from 'src/app/services/storage.service';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../../../services/spinner.service';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery-9';

import * as _ from 'lodash';
import { RemoveEmptyKeys } from 'src/app/_helper/remove-empty-key';
import { VehicleVM } from 'src/app/core/models/model';
declare const $: any;
@Component({
  selector: 'post-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  vehicleObj:any= VehicleVM ;
  formSubmitting = false;
  subscription!: Subscription;
  userInfo: any;
  galleryImages: NgxGalleryImage[] = [];
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '35%',
      height: '350px',
      thumbnailsColumns: 4,
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
      thumbnailsAutoHide: true
    },
    // max-width 800
    {
      breakpoint: 800,
      width: '100%',
      height: '600px',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20,
      preview: true,
    },
    // max-width 400
    {
      breakpoint: 500,
      preview: true,
      width: '77%',
      height: '300px',
      thumbnailsColumns: 4
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
    lighting: null,
    wheels_tires: [],
    braking_traction: [],
    entertainment_instrumentation: [],
    after_market_modification: []
  };

  constructor(
    private router: Router,
    private toastr: ToastrServices,
    private httpService: HttpService,
    private spinnerService: SpinnerService,
    private storageService: StorageService,
    private shareDataService: ShareDataService
  ) {
    this.userInfo = storageService.getFromLocalStorage('userInfo');
  }

  ngOnInit(): void {
    this.subscription = this.shareDataService.onSubVehicleData.subscribe(
      (data: any) => {
        if (data) {
          const vehicleCloneData = data;
          this.vehicleObj = vehicleCloneData;
          this.perpareImages(data.vehicle_photo);
          const allPF = _.concat((data.vehicle_features.premium_features || []), data.vehicle_features.market_modification_upgrades);
          this.preparePF(allPF);
          // this.vehicleObj.personal_info.phone_number = data.personal_info.phone_number.e164Number || '';
        } else if (!this.vehicleObj) {
          this.router.navigate(['/new-register'], { replaceUrl: true });
        }
      }
    );
  }

  public onSubmit(): void {
    this.spinnerService.run();
    const data: any = this.prepareData(this.vehicleObj);
    this.httpService.formDataPost(data, 'seller/vehicle/').subscribe(res => {
        this.storageService.saveToLocalStorage('userInfo', res.data);
        this.shareDataService.userData.next(res.data);
        this.spinnerService.stop();
        this.formSubmitting = false;
        this.showSuccess('Your vehicle has been submitted', 'THANKS FOR POSTING');
      },
      err => {
        this.spinnerService.stop();
        this.toastr.showError(
          this.shareDataService.getFormErrorMessage(err),
          this.shareDataService.getTitleOfFormValidation(err)
        );
      }
    );
  }

  private prepareData(data: any) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('body_type', (data.vehicle_info_a.body_type || ''));
    formData.append('vin', (data.vehicle_info_a.vin || ''));
    formData.append('drive_type', (data.vehicle_info_a.drive_type || ''));
    formData.append('make', data.vehicle_info_a.make);
    formData.append('transmission', (data.vehicle_info_a.transmission || ''));
    formData.append('model', data.vehicle_info_a.model);
    formData.append('trim', data.vehicle_info_a.trim);
    formData.append('engine', (data.vehicle_info_a.engine || ''));
    formData.append('year', (data.vehicle_info_a.year || ''));
    formData.append('fuel_type', data.vehicle_info_a.fuel_type);
    formData.append('mileage', (data.vehicle_info_a.mileage || ''));
    formData.append('asking_price', (data.vehicle_info_a.asking_price || ''));
    formData.append('keys', data.vehicle_condition.keys);
    formData.append('exterior_color', data.vehicle_info_a.exterior_color);
    formData.append('options', data.vehicle_info_a.options);
    // formData.append('owner_type', data.vehicle_info_a.owner_type);
    formData.append('country', data.vehicle_info_a.country);
    formData.append('state', data.vehicle_info_a.state);
    formData.append(
      'market_modification_description',
      data.vehicle_condition.message
    );
    formData.append(
      'standard_features',
      data.vehicle_features.standard_features
    );
    formData.append('premium_features', data.vehicle_features.premium_features);
    formData.append(
      'upgrades',
      data.vehicle_features.market_modification_upgrades
    );
    formData.append('purchased', data.vehicle_condition.purchased);
    formData.append('modifications', data.vehicle_condition.modifications);
    formData.append('condition', data.vehicle_condition.condition);
    formData.append('accident', data.vehicle_condition.accident);
    formData.append('has_accident', data.vehicle_condition.has_accident);
    formData.append('fully_repaired', data.vehicle_condition.fully_repaired);
    formData.append('listing_duration', '');
    formData.append('run_and_drive', data.vehicle_condition.run_nd_drive);
    formData.append('warning_light', data.vehicle_condition.warning_light);
    formData.append('smoked', data.vehicle_condition.smoked);
    formData.append('current_miles', data.vehicle_condition.current_miles);
    formData.append(
      'vehicle_condition_description',
      data.vehicle_condition.message
    );
   // formData.append('vehicle_damage_description', data.vehicle_photo.message);
    formData.append('user', JSON.stringify(data.personal_info));
    formData.append('customer_support', data.personal_info.customer_support);
    formData.append('receive_updates', data.personal_info.receive_updates);
    // if(data.vehicle_photo.front_image) {
    //   formData.append(
    //     'front_image',
    //     this.deleteSRCImage(data.vehicle_photo.front_image),
    //     this.deleteSRCImage(data.vehicle_photo.front_image).name
    //   );
    // }
    // if(data.vehicle_photo.rear_image) {
    //   formData.append(
    //     'rear_image',
    //     this.deleteSRCImage(data.vehicle_photo.rear_image),
    //     this.deleteSRCImage(data.vehicle_photo.rear_image).name
    //   );
    // }

    // if(data.vehicle_photo.driver_image) {
    //   formData.append(
    //     'driver_image',
    //     this.deleteSRCImage(data.vehicle_photo.driver_image),
    //     this.deleteSRCImage(data.vehicle_photo.driver_image).name
    //   );
    // }
 
    // if(data.vehicle_photo.passenger_image) {
    //   formData.append(
    //     'passenger_image',
    //     this.deleteSRCImage(data.vehicle_photo.passenger_image),
    //     this.deleteSRCImage(data.vehicle_photo.passenger_image).name
    //   );
    // }

    // if(data.vehicle_photo.dashboard_image) {
    //   formData.append(
    //     'dashboard_image',
    //     this.deleteSRCImage(data.vehicle_photo.dashboard_image),
    //     this.deleteSRCImage(data.vehicle_photo.dashboard_image).name
    //   );
    // }

    // if(data.vehicle_photo.sitting_image) {
    //   formData.append(
    //     'sitting_image',
    //     this.deleteSRCImage(data.vehicle_photo.sitting_image),
    //     this.deleteSRCImage(data.vehicle_photo.sitting_image).name
    //   );
    // }

    // Add more images data
    // tslint:disable-next-line: prefer-for-of
    // for (let i = 0; i < data.vehicle_photo.images.length; i++) {
    //   formData.append(
    //     'images',
    //     data.vehicle_photo.images[i],
    //     data.vehicle_photo.images[i].name
    //   );
    // }
    // Add dame vehicle photos
    // tslint:disable-next-line: prefer-for-of
    // for (let i = 0; i < data.vehicle_photo.damage_photos.length; i++) {
    //   formData.append(
    //     'damage_images',
    //     data.vehicle_photo.damage_photos[i],
    //     data.vehicle_photo.damage_photos[i].name
    //   );
    // }
    return formData;
  }

  deleteSRCImage(image:any) {
    delete image.src;
    return image;
  }

  perpareImages(images:any): void {
    images = RemoveEmptyKeys(images);
    Object.keys(images).map((key, index) => {
      if (
      [
        'front_image',
        'rear_image',
        'passenger_image',
        'dashboard_image',
        'driver_image',
        'sitting_image',
      ].indexOf(key) >= 0 ) {
        const data = {
          big: images[key].src,
          medium: images[key].src,
          small: images[key].src
        };
        this.galleryImages.push(data);
      } else if (['images'].indexOf(key) >= 0) {
        const otherImages = _.map(images[key], (i) => {
          return {
            big: i.src,
            medium: i.src,
            small: i.src
          };
        });
        this.galleryImages = _.concat(this.galleryImages, otherImages);
      }
    });
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

  showSuccess(message:any, title:any) {
    this.toastr.swalWithcustomClass
      .fire({
        title: `<strong>${title}</strong>`,
        imageUrl: '../../../../assets/icons/success.png',
        imageAlt: '',
        html: message,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        allowOutsideClick: true
      })
      .then((result:any) => {
        this.router.navigate(['new-register/submit']);
      });
  }

  ngOnDestroy() {
    // tslint:disable-next-line: curly
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    $(function() {
      $('#carousel1_indicator').carousel();
    });
  }
}

export interface PremiumFeatures {
  comform_convenienc: string;
  roof_glass: string;
  exterior: string;
  cargo_towning: string;
  seats: string;
  accesssory_packages: string;
  lighting: any;
  wheels_tires: Array<string>;
  braking_traction: Array<string>;
  entertainment_instrumentation: Array<string>;
  after_market_modification: Array<string>;
}
