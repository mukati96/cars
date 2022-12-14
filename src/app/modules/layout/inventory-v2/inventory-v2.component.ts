import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from '@m0t0r/ngx-slider';
import * as _ from 'lodash';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/guards/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { InventoryService } from '../inventory/inventory.service';
declare const $: any;
@Component({
  selector: 'post-inventory-v2',
  templateUrl: './inventory-v2.component.html',
  styleUrls: ['./inventory-v2.component.scss']
})
export class InventoryV2Component implements OnInit, OnDestroy {
  [x: string]: any;
  filterForm: any = FormGroup;
  subscription !: Subscription;
  // vehicleSubscription !: Subscription;
  searchTextSub = new Subject();
  view = 'list';
  userInfo: any;
  favorites: any[] = [];
  filtersData: any;
  collection: any = { count: 0, data: [], offset: 0};
  filterString: any = false;
  searchFilter: any;
  searchText: any;
  custom:any
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
  minMileage = 0;
  maxMileage = 1000000;

  kmOptions: Options = {
    floor: 0,
    ceil: 999999,
    step: 1,
    showTicks: false,
    draggableRange: false,
    translate: (value: number): string => {
      return '' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' Mi';
    }
  };

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
                if(brandData) {
                  this.filterForm.get('make_slug')?.patchValue([brandData['brand']]);
                }
                this.getFiltersCount();
                this.route.queryParams.subscribe(p => {
                  if(p['data']){
                    const query =JSON.parse(p['data']);
                    if(query.pageNumber){
                      this.collection.offset = (query.pageNumber  - 1) * 15;
                      this.config.currentPage = query.pageNumber ;
                      this.page = query.pageNumber;
                    } else {
                      this.config.currentPage = 1;
                      this.collection.offset = 0;
                    }
                  } else {
                    this.config.currentPage = 1;
                    this.collection.offset = 0;
                  }
                });
               }

  ngOnInit(): void {
    this.getChangeValueInSearch();
  }

  getChangeValueInSearch() {
    this.searchTextSub.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(text => {
      this.shareDataService.headerText.next(text);
      this.filterForm.get('custom').setValue(text);
      let previousQuery: any = {};
      const query = JSON.stringify(Object.assign(previousQuery, { custom: text }));
      this.router.navigateByUrl(`/inventory?data=${query}`)
    });
  }

  setText(event: any) {
    this.searchTextSub.next(event.target.value);
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      pageNumber: [],
      budget: [''],
      make: [''],
      make_slug: [''],
      km_driven: [''],
      owner_type: [''],
      year__lte: [''],
      year__gte: [''],
      zip_code: [''],
      offer_price_gte: [''],
      offer_price_lte: [''],
      city: [''],
      status: [''],
      model: [''],
      sort_by: [''],
      custom: [''],
      radius: [''],
      is_favorite: [false],
    });
    this.filterForm.statusChanges.subscribe((res: any) => {
      this.onChangeValue();
    });
  }

  getData(data: any = false, from = 'default', offset = 0, type: string = 'more') {
    const endpoint = `seller/inventory/list/?limit=15${this.collection.offset ? '&offset=' + this.collection.offset : ''}${this.filterString ? '&' + this.filterString : ''}`;
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
      if (i === 'year__lte') {
        params.year__lte = filters.year__lte;
      } else if (i === 'year__gte') {
        params.year__gte = filters.year__gte;
      } else if (i === 'model') {
        this.model = filters.model.map((m: any) => `${m}`);
        this.model__in = filters.model.map((m: any) => `"${m}"`);
        params.model__in = this.model__in.map((n: any) => `[${n}]`);
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
      } else if (i === 'zip_code') {
        params.zip_code = filters.zip_code;
        params.country = "USA";
      } else if(i === 'radius' && filters.radius){
        params.radius = filters.radius;
      }
    }
    const queryString = Object.keys(params).map((key) => {
      return key + '=' + params[key];
    }).join('&');
    this.filterString = queryString;
    this.getData(this.filterString, 'filter');
  }

  onPageChange(event: any, type = 'more') {
    $(document).ready(function(){
      $(window).scrollTop(0);
    });
    this.collection.offset = (event - 1) * 15;
    // this.getData(this.filterForm.value, 'default', this.collection.offset, type);
    this.config.currentPage = event;
    let previousQuery: any = {};
    if (this.route.snapshot.queryParams['data']) {
      previousQuery = JSON.parse(this.route.snapshot.queryParams['data']);
    }
    const query = JSON.stringify(Object.assign(previousQuery, { pageNumber: this.config.currentPage }));
    this.router.navigateByUrl(`/inventory?data=${query}`)
  }


  onClose() {
    $(`#exampleModal1`).modal('hide');
    $("#exampleModal1").modal("hide");
  }

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
    this.httpService.get(`seller/search/make/?model_make_id=${this.filterForm.get('make').value[0]}`).subscribe((res: any) => {
      this.availableMakes = res.data;
    },
     err => {
     });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this['vehicleSubscription']) this['vehicleSubscription'].unsubscribe();
  }

}
