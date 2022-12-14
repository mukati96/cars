import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { StorageService } from 'src/app/services/storage.service';
import { Subscription, timer } from 'rxjs';
import { InventoryService } from './inventory.service';
import * as _ from 'lodash';
import { AuthService } from 'src/app/guards/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'post-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {
  [x: string]: any;
  filterForm: any = FormGroup;
  subscription !: Subscription;
  vehicleSubscription !: Subscription;
  view = 'list';
  userInfo: any;
  favorites: any[] = [];
  filtersData: any;
  collection: any = { count: 0, data: [] };
  filterString: any = false;
  searchFilter: any;
  custom: any
  config = {
    itemsPerPage: 15,
    currentPage: 1,
    totalItems: this.collection.count
  };
  page = 1;
  fetchingData = true;
  availableMakes: any[] = [];
  availablieTrims: any;
  model__in: any;
  model: any;

  constructor(private fb: FormBuilder,
    private shareDataService: ShareDataService,
    private httpService: HttpService,
    private inventoryService: InventoryService,
    private storageService: StorageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    this.view = this.storageService.getSessionStorage('view') || 'grid';
    this.userInfo = this.storageService.getFromLocalStorage('userInfo');
    this.initForm();
    const brandData = this.router.getCurrentNavigation()?.extras.state;
    if (brandData) {
      this.filterForm.get('make_slug')?.patchValue([brandData['brand']]);
    } else if (!this.route.snapshot.queryParams['data']) this.getData();
    this.getFiltersCount();
    this.getExpiredVehicleSubscription();
  }

  ngOnInit(): void {

    this.shareDataService.headerText.subscribe(text => {
      this.filterForm.get('custom').patchValue(text);
    });
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      budget: [''],
      make: [''],
      make_slug: [''],
      km_driven: [''],
      fuel_type: [''],
      body_type: [''],
      transmission: [''],
      owner_type: [''],
      color: [''],
      year__lte: [''],
      year__gte: [''],
      offer_price_gte: [''],
      offer_price_lte: [''],
      city: [''],
      status: [''],
      trim: [''],
      model: [''],
      sort_by: [''],
      custom: [''],
      is_favorite: [false],
    });
    this.filterForm.statusChanges.subscribe((res: any) => {
      this.onChangeValue();
    });
  }

  getExpiredVehicleSubscription() {
    this.vehicleSubscription = this.inventoryService.expiredVehicleSubscription.subscribe(res => {
    });
  }

  getData(data: any = false, from = 'default', offset = 0, type: string = 'more') {
    const endpoint = `seller/inventory/list/?limit=15${offset ? '&offset=' + offset : ''}${this.filterString ? '&' + this.filterString : ''}`;
    this.fetchingData = true;
    this.httpService.get(endpoint).subscribe((res: any) => {
      if (from === 'scroll') {
        const updatedData = _.concat(this.collection.data, res.results);
        this.collection.data = _.uniqBy(updatedData, 'id');
      } else {
        this.collection.data = res.results;
      }
      this.collection.count = res.count;
      this.config.totalItems = res.count;
      this.fetchingData = false;
    }, err => {
      this.fetchingData = false;
    });
  }

  getFiltersCount() {
    this.httpService.get('seller/filter/count/').subscribe(res => {
      this.filtersData = res;
    });
  }

  pageReload(): void {
    window.location.reload();
    document.documentElement.scrollTop = 0;
  }

  public logout(): void {
    this.shareDataService.userData.next(null);
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onChangeValue() {
    const filters: any = _.pickBy(this.filterForm.value);
    const params: any = {};
    for (const i in filters) {
      if (i === 'fuel_type' && filters.fuel_type.length) {
        params.fuel_type__in = filters.fuel_type.join(',');
      } else if (i === 'body_type') {
        params.body_type__in = filters.body_type;
      } else if (i === 'transmission' && filters.transmission.length) {
        params.transmission__in = filters.transmission.join(',');
      } else if (i === 'year__lte') {
        params.year__lte = filters.year__lte;
      } else if (i === 'year__gte') {
        params.year__gte = filters.year__gte;
      } else if (i === 'model') {
        this.model = filters.model.map((m: any) => `${m}`);
        this.model__in = filters.model.map((m: any) => `"${m}"`);
        params.model__in = this.model__in.map((n: any) => `[${n}]`);
      } else if (i === 'trim') {
        let trim__in = filters.trim.map((m: any) => `"${m}"`);
        params.trim__in = trim__in.map((n: any) => `[${n}]`);
      } else if (i === 'color') {
        params.exterior_color__in = filters.color;
      } else if (i === 'make') {
        params.make = filters.make.join(',');
      } else if (i === 'make_slug') {
        params.make_slug__in = filters.make_slug.join(',');
      } else if (i === 'km_driven') {
        params.mileage__gte = filters.km_driven.value;
        params.mileage__lte = filters.km_driven.highValue;
      } else if (i === 'city') {
        params.user__city__icontains = filters.city;
        params.country__iexact = filters.city;
      } else if (i === 'budget') {
        params.top_offer_price__gte = filters.budget.min;
        params.top_offer_price__lte = filters.budget.max;
      } else if (i === 'owner_type' && filters.owner_type.length) {
        params.owner_type__in = filters.owner_type;
      } else if (i === 'sort_by' && filters.sort_by) {
        params.sort_by = filters.sort_by;
      } else if (i === 'status' && filters.status) {
        params.conformed_status = filters.status;
      } else if (i === 'is_favorite' && filters.is_favorite) {
        params.is_favorite = filters.is_favorite;
      } else if (i === 'custom' && filters.custom) {
        params.custom = filters.custom;
      }
    }
    const queryString = Object.keys(params).map((key) => {
      return key + '=' + params[key];
    }).join('&');
    this.filterString = queryString;
    this.getData(this.filterString, 'filter');
    this.config.currentPage = 1;
    this.page = 1;
  }

  onPageChange(event: any, type = 'more') {
    window.scrollTo(0, 0)
    const offset = (event - 1) * 15;
    this.getData(this.filterForm.value, 'default', offset, type);
    this.config.currentPage = event;
  }

  changeView(view: any) {
    this.view = view;
    this.storageService.saveToSession('view', view);
  }
  onClose() {
    $('.modal').hide();
    $('.modal-backdrop').removeClass('modal-backdrop');
    $('.modal-open').removeClass('modal-open');
  }
  ShowFilter() {
    $('.modal').show();
  }
  // onClose(){
  //   $(`#exampleModal1`).modal('hide');
  //   $("#exampleModal1").modal("hide");
  // }

  favoriteToggle(id: number, status: any) {
    const data = {
      vehicle: id,
      is_favorite: status
    };
    this.httpService.post(data, 'seller/like/favorite/').subscribe(res => {
      if (this.filterForm.value.is_favorite && !status) this.onChangeValue();
      this.collection.data.map((vehicle: any) => {
        if (id === vehicle.id) {
          vehicle.is_favorite = status;
        }
        return vehicle;
      });
    });
  }

  favoriteFilter() {
    this.filterForm.controls['is_favorite'].setValue(!this.filterForm.controls['is_favorite'].value);
  }

  changeStatus(status: string) {
    this.filterForm.controls.status.patchValue(status);
  }

  getSidebarData(ev?: any) {
    this.httpService.get(`seller/search/make/?model_make_id=${ev}`).subscribe((res: any) => {
      this.availableMakes = res.data;
    },
      err => {

      });
  }

  getSidebarTrimData(ev?: any) {
    const queryString = Object.keys(ev).map((key) => {
      return 'model_name' + '=' + ev[key]
    }).join('&');
    let data = this.filterForm.get('make')?.value[0];
    this.httpService.get(`seller/search/trim/?model_make_id=${data}&${queryString}`).subscribe((res: any) => {
      this.availablieTrims = res.results;
    }, err => { });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.vehicleSubscription) this.vehicleSubscription.unsubscribe();
  }

}
