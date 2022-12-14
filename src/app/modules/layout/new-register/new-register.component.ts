import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AsyncValidatorFn,
  AbstractControl
} from '@angular/forms';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { Router } from '@angular/router';
import { Observable, of, Subscription, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { VehicleVM } from '../../../core/models/model';
import { MustMatch } from 'src/app/_helper/must-match.validator';
import * as _ from 'lodash';
import { HttpService } from '../../../services/http.service';
import { GoogleAnalyticsServices } from '../../../services/google-analytics.service';
declare const $: any;
@Component({
  selector: 'post-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.scss']
})
export class NewRegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  userInfo: any = {};
  model: any = {};
  vehicleForm:any= FormGroup;
  currentStep: number = 1;
  vehicleFormData: any;
  vehicle_info_options: any[] = [];
  vehicle_info_upgrades: any[] = [];
  imagesArray: any[] = [];
  uploadedImages: any[] = [];
  firstStepSubmitted:boolean = false;
  secondStepSubmitted:boolean = false;
  thirdStepSubmitted:boolean = false;
  fourthStepSubmitted:boolean = false;
  fifthStepSubmitted:boolean = false;
  trimSubmitted:boolean = false;
  submitted :boolean = false;
  editForm:boolean = false;
  submittedZip:boolean = false;
  fetchingZipCode:boolean = false;
  subscription!: Subscription;
  userSubscription: Subscription;
  password: any;
  routeState: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private shareDataService: ShareDataService,
    private toastr: ToastrServices,
    private httpService: HttpService,
    protected $gaService: GoogleAnalyticsServices
  ) {
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.userSubscription = this.shareDataService.userDataSubscription.subscribe(
      user => {
        this.userInfo = user;
      }
    );
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.vehicleFormData = this.router.getCurrentNavigation()?.extras.state?.['data'];
    }
  }

  ngOnInit(): void {
    this.initVehicleForm();
    this.fillVehicleForm();
  }

  private initVehicleForm(): void {
    this.vehicleForm = this.fb.group({
      vehicleFormData: [],
      name: [''],
      sf: [],
      vehicle_info_a: this.fb.group({
        vin: [''],
        make: ['', [Validators.required]],
       // brand: ['', [Validators.required]],
        model: ['', [Validators.required]],
        year: ['', [Validators.required]],
        zip_code: ['', [Validators.required], this.userValidator()],
        mileage: ['', [Validators.required]],
        asking_price: ['', [Validators.required, Validators.max(99999999)]],
        exterior_color: ['', [Validators.required]],
        country: ['US', [Validators.required]],
        trim: ['', [Validators.required]],
        drive_type: ['', [Validators.required]],
        fuel_type: ['', [Validators.required]],
        transmission: [''],
        engine: [''],
        body_type: [''],
        options: [''],
        market_modification: this.fb.group({
          message: ['']
        })
      }),
      vehicle_features: this.fb.group({
        standard_features: ['', [Validators.required]],
        premium_features: [''],
        market_modification_upgrades: ['']
      }),
      vehicle_condition: this.fb.group({
        purchased: ['', [Validators.required]],
        has_accident: ['', [Validators.required]],
        fully_repaired: [''],
        accident: ['', [Validators.required]],
        run_nd_drive: ['', [Validators.required]],
        warning_light: ['', [Validators.required]],
        condition: ['', [Validators.required]],
        modifications: ['', [Validators.required]],
        smoked: ['', [Validators.required]],
        current_miles: ['', [Validators.required]],
        keys: ['', [Validators.required]],
        message: ['']
      }),
      // vehicle_photo: this.fb.group({
      //   front_image: ['', [Validators.required]],
      //   rear_image: [''],
      //   driver_image: [''],
      //   passenger_image: [''],
      //   dashboard_image: [''],
      //   sitting_image: [''],
      //   images: ['', [Validators.maxLength(6)]],
      //   damage_photos: ['', [Validators.maxLength(5)]],
      //   message: ['']
      // }),
      personal_info: this.fb.group(
        {
          full_name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          confirm_email: ['', [Validators.required]],
          zip_code: [''],
          city: ['', [Validators.required]],
          phone_number: ['', [Validators.required, Validators.minLength(10)]],
          password: ['',],
          state: [''],
          // confirm_password: ['', [Validators.required]],
          customer_support: [false],
          receive_updates: [false]
        },
        // {
        //   validator: MustMatch('password', 'confirm_password')
        // }
      )
    });
    this.onChange();
  }

  private fillVehicleForm(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.shareDataService.onSubVehicleData.subscribe(
      (data: any) => {
        if (data && data.personal_info) {
          this.editForm = true;
          this.trimSubmitted = true;
          this.submittedZip = true;
          this.vehicleFormData = data.vehicleFormData;
          if (
            typeof data.personal_info.phone_number === 'string' &&
            data.personal_info.phone_number.includes('+1')
          ) {
            data.personal_info.phone_number = data.personal_info.phone_number.replace(
              '+1',
              ''
            );
          }
          this.vehicleForm.patchValue(data);

          // this.imagesArray = data.vehicle_photo.photos;
          // this.uploadedImages = data.vehicle_photo.photos;
          this.vehicle_info_options = data.vehicle_info_a.options || [];
          this.vehicle_info_upgrades =
            data.vehicle_info_a.market_modification.upgrades || [];
          this.currentStep = 1;
        } else if (this.vehicleFormData) {
          this.f.vehicleFormData.patchValue(this.vehicleFormData);
          this.f.name.patchValue(
            `${this.vehicleFormData.year
            } ${this.vehicleFormData.make.toUpperCase()} ${this.vehicleFormData.model.toUpperCase()}`
          );
          if (this.vehicleFormData.trim.length === 1) {
            this.trimSubmitted = true;
            this.vehicleInfo_a.trim.patchValue(this.vehicleFormData.trim[0]);
          }
          this.vehicleInfo_a.drive_type.patchValue(
            this.vehicleFormData.drive_type
          );
          if (this.vehicleFormData.vin) {
            this.vehicleInfo_a.vin.patchValue(
              this.vehicleFormData.vin.toUpperCase()
            );
          }
          this.vehicleInfo_a.make.patchValue(
            this.vehicleFormData.make.toUpperCase()
          );
          if (this.vehicleFormData.transmission) {
            this.vehicleInfo_a.transmission.patchValue(
              this.vehicleFormData.transmission[0]
            );
          }
          this.vehicleInfo_a.model.patchValue(
            this.vehicleFormData.model.toUpperCase()
          );
          this.vehicleInfo_a.engine.patchValue((this.vehicleFormData.engine || 'N/A'));
          this.vehicleInfo_a.year.patchValue(
            this.vehicleFormData.year.toUpperCase()
          );
          this.vehicleInfo_a.body_type.patchValue(this.vehicleFormData.body_type);
          this.vehicleInfo_a.fuel_type.patchValue(this.vehicleFormData.fuel_type);
          this.f.sf.patchValue(this.vehicleFormData.standard_features);
          this.vehicleFeatures.standard_features.patchValue(
            this.vehicleFormData.standard_features
          );
        } else {
          // this.router.navigate(['/appraisal'], { replaceUrl: true });
        }
      }
    );
  }

  get f(): any {
    return this.vehicleForm.controls;
  }
  get vehicleInfo_a(): any {
    return this.f.vehicle_info_a.controls;
  }
  get personalInfo(): any {
    return this.f.personal_info.controls;
  }
  get vehicleCondition() {
    return this.f.vehicle_condition.controls;
  }
  get vehicleFeatures() {
    return this.f.vehicle_features.controls;
  }

  private onChange(): void {
    this.vehicleForm.valueChanges.subscribe((values: VehicleVM) => {
      if (
        this.f.personal_info.controls.email.value !==
        this.f.personal_info.controls.confirm_email.value
      ) {
        this.f.personal_info.controls.confirm_email.setErrors({
          mustMatch: true
        });
      } else if (
        this.f.personal_info.controls.confirm_email.value &&
        this.f.personal_info.controls.confirm_email.value
      ) {
        this.f.personal_info.controls.confirm_email.setErrors(null);
      }
    });
  }

  public next(step:any): any {
    // tslint:disable-next-line: curly
    // if (this.currentStep >= 5) return false;
    this.currentStep = step;
    document.documentElement.scrollTop = 0;
    this.$gaService.setPage(`/steps/${step}`);
  }

  public prev(): any {
    // tslint:disable-next-line: curly
    if (this.currentStep <= 1) return false;
    this.currentStep--;
  }

  backArrowClick() {
    if (this.currentStep === 1) {
      this.router.navigate(['/appraisal'], { replaceUrl: true });
    } else {
      this.prev();
    }
  }

  public goToStep(step:any): void {
    if (step === 1 && this.f.vehicle_info_a.invalid) {
      return;
    } else if (
      (step === 2 && this.f.vehicle_features.invalid) ||
      this.f.vehicle_info_a.invalid
    ) {
      return;
    } else if (step === 3 && this.f.vehicle_condition.invalid) {
      return;
    } else if (step === 4 && this.f.vehicle_photo.invalid) {
      return;
    } else if (step === 5 && this.f.personal_info.invalid) {
      return;
    }
    this.currentStep = step;
  }

  submitTrim() {
    this.submitted = true;
    // tslint:disable-next-line: curly
    if (this.vehicleInfo_a.trim.invalid) return;
    this.trimSubmitted = true;
    // tslint:disable-next-line: curly
    $('#collapseOne').addClass('show');
  }

  editTrim() {
    this.trimSubmitted = false;
    $('#collapseOne').removeClass('show');
  }

  public onSubmit(): void {
    if (
      !this.f.personal_info.controls.customer_support.value &&
      !this.f.personal_info.controls.receive_updates.value
    ) {
      return this.toastr.showError(
        'Please check agree to the terms and conditions',
        'Personal Details'
      );
    } else if (this.f.personal_info.invalid) {
      return this.toastr.showError(
        'Please provide personal details',
        'Personal Details'
      );
    }
    this.shareDataService.changeData(this.vehicleForm.value);
    this.router.navigate(['new-register/preview']);
  }

  public onCancel(): void {
    this.router.navigate(['/appraisal']);
  }

  searchUser(text:any) {
    // debounce
    return timer(1000).pipe(
      switchMap(() => {
        return this.httpService.get(`auth/zip-code/${text}/`);
      })
    );
  }

  userValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      // tslint:disable-next-line: curly
      if (this.currentStep !== 1) return of({});
      this.fetchingZipCode = true;
      return this.searchUser(control.value).pipe(
        map((res):any => {
          this.fetchingZipCode = false;
          this.submittedZip = true;
          // if username is already taken
          if (!res.status) {
            // return error
            return { invalid: true };
          }
          this.vehicleForm.controls.personal_info['controls'].city.setValue(
            res.data[0].city
          );
          this.vehicleForm.controls.personal_info['controls'].state.setValue(
            res.data[0].state_name
          );
          this.personalInfo.zip_code.patchValue(control.value);
        })
      );
    };
  }

  ngAfterViewInit() {
    $('.collapse1').on('show.bs.collapse', function (e:any) {
      var $card = $(e).closest('.card');
      var $open = $($(e).data('parent')).find('.collapse.show');
      var additionalOffset = 0;
      if ($card.prevAll().filter($open.closest('.card')).length !== 0) {
        additionalOffset = $open.height();
      }
      $('html,body').animate(
        {
          scrollTop: $card.offset().top - additionalOffset - 20
        },
        500
      );
    });

    this.$gaService.setPage('/steps/1');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
