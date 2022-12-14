import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  EventEmitter,
  AfterViewInit,
  Output
} from '@angular/core';
import { Options } from '@m0t0r/ngx-slider';
import { ShareDataService } from '../../../../services/share-data.service';
import { OnChanges } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER, I} from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
declare const $: any;
import { CAR_MAKES } from 'src/app/constants/makes';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryV2Component } from '../inventory-v2.component';
import { YEARS } from 'src/app/constants/years';
import { HttpService } from 'src/app/services/http.service';
import { MONTHS } from 'src/app/constants/miles';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-sidebar-mobile-v2',
  templateUrl: './sidebar-mobile-v2.component.html',
  styleUrls: ['./sidebar-mobile-v2.component.scss']
})
export class SidebarMobileV2Component implements OnInit {
  @Input() filtersData: any;
  @Input() filterForm: any;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @Input() models: any;
  @Input() trims: any;
  @Output() changeMake = new EventEmitter();
  @Output() changeModel = new EventEmitter();
  @Output() onClose = new EventEmitter();
  searchTextSub = new Subject();
  CAR_MAKES = CAR_MAKES.sort((a, b) => {
    return a.localeCompare(b);
  });
  km_driven: any;
  model: any[] = [];
  make: any[] = [];
  year__gte: any[] = [];
  year__lte: any[] = [];
  classAdded = '';
  chips: any = [];
  searchKey: any;
  searchFilter: any;
  minMileage: number = 0;
  maxMileage: number = 150000;
  stateCityValue: any;
  show !: boolean;
  errorZipcode: any;
  searchText: any;
  zipcodeValue: any;
  selctedRadius !: any[];
  maxErrorMsg :any;
  valueMin: any;
  highValueMax: any;
  maskInputAmount(e:any) {
    const t = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,2})(\d{0,3})/);
    e.target.value = t[2] ? t[1] + ',' + t[2] + (t[3] ? ',' + t[3] : '') :
      t[1];
  }
  windowWidth: any;
  query: any;
  windowHeight: any;
  year: any = YEARS;
  minYear: any[] = this.year;
  maxYear: any[] = this.year;
  kmOptions: Options = {
    floor: 0,
    ceil: 150000,
    step: 1000,
    showTicks: false,
    draggableRange: false,
    enforceStep: false,
    enforceRange: false,
  };
  miles: any = MONTHS;
  get f() {
    return this.filterForm.controls;
  }

  constructor(private router: Router,
    private shareDataService: ShareDataService,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private inventory: InventoryV2Component,) { }

  ngOnInit(): void {
    this.checkWindowWidthHeight();
    this.getChangeValueInSearch();
  }

  checkWindowWidthHeight() {
    this.windowWidth = $(window).width();
    this.windowHeight = $(window).height();
    $(window).resize(() => {
      this.windowWidth = $(window).width();
      this.windowHeight = $(window).height();
    });
    if (this.windowWidth <= 768) {
      this.route.queryParams.subscribe(p => {
        this.listenForQueryChanges(p);
        if (!p['data']) {
          this.updateMakes();
        }
      });
    }
  }

  listenForQueryChanges(data:any) {
    if (this.route.snapshot.queryParams['data']) {
      const query = JSON.parse(this.route.snapshot.queryParams['data']);
      Object.keys(query).map((key: any, index: any) => {
        if (key === 'km_driven') {
          this.minMileage = query[key][0].min;
          this.maxMileage = query[key][0].max;
          this.filterForm.controls[key].setValue({ value: this.minMileage, highValue: this.maxMileage }, { emitEvent: false });
        }
        else if (key === 'zip_code') {
          this.fethZipCodeWithState(query[key]);
          this.filterForm.controls[key].setValue(query[key], { emitEvent: false });

        }
        else if (key === 'custom') {
          this.searchText = query[key];
          this.filterForm.controls[key].setValue(this.searchText, { emitEvent: false });
        }
        else {
          this.filterForm.controls[key].setValue(query[key], { emitEvent: false });
        }
      });
      if (!('make' in query)) {
        this.filterForm.get('make').patchValue([], { emitEvent: false })
      }
      if (!('model' in query)) {
        this.filterForm.get('model').patchValue([], { emitEvent: false })
      }
      if (!('year__gte' in query)) {
        this.filterForm.get('year__gte').patchValue([], { emitEvent: false })
      }
      if (!('year__lte' in query)) {
        this.filterForm.get('year__lte').patchValue([], { emitEvent: false })
      }
      if (!('km_driven' in query)) {
        this.minMileage = 0;
        this.maxMileage = 150000;
        this.filterForm.get('km_driven').patchValue({ value: '', highValue: '' }, { emitEvent: false })
      }
      this.changeMake.emit(`${this.make}`);
      if (this.model.length) {
        this.changeModel.emit(this.model);
      }
      this.filterForm.updateValueAndValidity();
    } else {
      this.searchText = '';
    }
  }

  updateMakes() {
    this.CAR_MAKES = [];
    this.minYear = [];
    this.maxYear = [];
    this.minMileage = 0;
    this.maxMileage = 150000;
    setTimeout(() => {
      this.CAR_MAKES = CAR_MAKES.sort((a, b) => {
        return a.localeCompare(b);
      });
      this.minYear = YEARS;
      this.maxYear = YEARS;
    }, 500)
    this.filterForm.get('make').patchValue([], { emitEvent: false });
    this.filterForm.get('model').patchValue([], { emitEvent: false });
    this.filterForm.get('year__gte').patchValue([], { emitEvent: false });
    this.filterForm.get('year__lte').patchValue([], { emitEvent: false });
    this.filterForm.get('km_driven').patchValue(null, { emitEvent: false });
    this.filterForm.get('custom').patchValue(null, { emitEvent: false });
    this.filterForm.get('radius').patchValue('', { emitEvent: false });
    this.filterForm.get('zip_code').patchValue('', { emitEvent: false });
    this.show = false;
    this.filterForm.updateValueAndValidity();
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
      this.redirectOnNewPage(query);
    });

  }

  scrolltoId(head: any) {
    setTimeout(() => {
      var elmnt = document.getElementById(head);
      elmnt?.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'start' });
    }, 200);
    this.classAdded = head;
  }
  ngOnChanges() {
    if (this.filtersData) {
      Object.keys(this.filtersData).map((key, index) => {
        this.filtersData[key].total = 0;
        this.filtersData[key].map((i: any) => {
        });
      });
    }
  }

  clearFilters() {
    this.filterForm.reset();
    window.location.href = `/inventory`;
  }

  onChangeMileageInputMax(event: any) {
    const ev: any = {
      highValue: this.maxMileage,
      pointerType: 0,
      value: this.minMileage
    }
    this.valueMin = ev.value;
    this.highValueMax = ev.highValue;
    if (this.valueMin >= this.highValueMax) {
      this.maxMileage = 150000;
      this.maxErrorMsg = "Try a different mileage range"
    } else if (this.valueMin <= this.highValueMax) {
      this.maxErrorMsg = "";
    }

    if (this.highValueMax != 150000) {
      $('.plusSign').hide();
      $('.plusSign').removeClass('d-inline-block');
    } else if (this.highValueMax === 150000) {
      $('.plusSign').addClass('d-inline-block');
    }
  }

  onChangeMileageInputMin(event: any) {
    const ev: any = {
      highValue: this.maxMileage,
      pointerType: 0,
      value: this.minMileage
    }
    this.valueMin = ev.value;
    this.highValueMax = ev.highValue;
    if (this.valueMin >= this.highValueMax) {
      this.maxMileage = 150000;
      this.maxErrorMsg = "Try a different mileage range"
    } else if (this.valueMin <= this.highValueMax) {
      this.maxErrorMsg = "";
    }
  }

  onUserChangeEnd($event: any, controlName: any) {

    if (this.valueMin >= this.highValueMax) {
      this.maxMileage = 150000;
      this.maxErrorMsg = "Try a different mileage range"
    } else if (this.valueMin <= this.highValueMax) {
      this.maxErrorMsg = "";
      if (controlName === 'km_driven') {
        this.filterForm.controls[controlName].setValue($event);
        this.openNewPageWithQueryParam($event, controlName);
      }
    } else {
      this.filterForm.controls[controlName].setValue($event);
      this.openNewPageWithQueryParam($event, controlName);
    }
    this.filterForm.updateValueAndValidity();
    this.tapPillClose();
  }

  openNewPageWithQueryParam(event: any, controlName: any) {
    let previousQuery: any = {};
    let me: any = this;
    if (this.route.snapshot.queryParams['data']) {
      previousQuery = JSON.parse(this.route.snapshot.queryParams['data']);
    }
    previousQuery.pageNumber = 1;
    this.inventory.collection.offset = 0;
    let previousAndCurrentValue = [];
    if (controlName !== 'km_driven') {
      if (me[controlName].includes(event.target.value) || event.target.value === '') {
        me[controlName] = me[controlName].filter((e: any) => {
          return e !== event.target.value;
        });
      } else {
        if (controlName === 'make') {
          me[controlName] = [event.target.value];
        } else {
          me[controlName].push(event.target.value);
        }
      }
    }

    if (controlName === 'km_driven') {
      previousAndCurrentValue = [{ min: event.value, max: event.highValue }];
    } else {
      previousAndCurrentValue = [...me[controlName]];
    }
    const query = JSON.stringify(Object.assign(previousQuery, { [controlName]: previousAndCurrentValue }));
    this.onClose.emit();
    this.redirectOnNewPage(query)
  }

  setMake(ev: any) {
    this.make = [ev.target.value];
    this.filterForm.get('make').setValue(this.make, { emitEvent: false });
    this.changeMake.emit(`${this.make}`);
  }

  setModel(ev: any) {
    this.model = [ev.target.value];
    this.filterForm.get('model').setValue(this.model, { emitEvent: false });
  }

  applyFilter() {
    let previousQuery: any = {};

    if (this.route.snapshot.queryParams['data']) {
      previousQuery = JSON.parse(this.route.snapshot.queryParams['data']);
    }
    previousQuery.pageNumber = 1;
    this.inventory.collection.offset = 0;
    const query = JSON.stringify(Object.assign(previousQuery, { make: this.make, model: this.model }));
    this.redirectOnNewPage(query);
    this.tapPillClose();
  }

  chooseYear(value: any, controlName: any) {
    if (controlName === "year__gte") {
      var min = value;
    }
    else {
      var max = value;
    }
    if (max) {
      this.minYear = this.year.filter((i: any) => {
        return i <= max;
      });
    }
    if (min) {
      this.maxYear = this.year.filter((i: any) => {
        return i >= min;
      });
    }
  }

  yearFilter(yearMin:any, yearMax:any) {
    parseInt(this.filterForm.get('year__gte').setValue(yearMin.value, { emitEvent: false }));
    parseInt(this.filterForm.get('year__lte').setValue(yearMax.value, { emitEvent: false }));
    let previousQuery: any = {};
    if (this.route.snapshot.queryParams['data']) {
      previousQuery = JSON.parse(this.route.snapshot.queryParams['data']);
    }
    previousQuery.pageNumber = 1;
    this.inventory.collection.offset = 0;
    const query = JSON.stringify(Object.assign(previousQuery, { year__gte: yearMin.value, year__lte: yearMax.value }));
    this.redirectOnNewPage(query);
    this.tapPillClose();
  }

  redirectOnNewPage(query:any) {
    this.router.navigateByUrl(`/inventory?data=${query}`)
    this.onClose.emit();
  }

  getDistanceData(data:any) {
    if (data.value.length <= '4') {
      return;
    }
    this.httpService.get(`auth/zip-code/${data.value}/`).subscribe((res: any) => {
      if (res.errorMessage == "Zip code does not exists") {
        this.errorZipcode = res.errorMessage
        this.show = false
      } else {
        this.stateCityValue = res.data[0];
        this.zipcodeValue = res.data[0].zip;
        this.filterForm.get('radius').patchValue('', { emitEvent: false });
        const query = JSON.stringify(Object.assign({ radius: '' }));
        this.redirectOnNewPage(query);
        this.filterForm.get('zip_code').setValue(this.zipcodeValue, { emitEvent: false });
        this.show = true;
        let previousQuery: any = {};
        if (this.route.snapshot.queryParams['data']) {
          previousQuery = JSON.parse(this.route.snapshot.queryParams['data']);
        }
        const query1 = JSON.stringify(Object.assign(previousQuery, { zip_code: data.value }));
        this.router.navigateByUrl(`/inventory?data=${query1}`)

        $("#staticBackdrop").modal("hide");
      }
    })
  }
  fethZipCodeWithState(zipcode: any) {
    this.httpService.get(`auth/zip-code/${zipcode}/`).subscribe((res: any) => {
      this.stateCityValue = res.data[0];
      this.show = true;
      this.filterForm.get('zip_code').patchValue(zipcode);
    })
  }

  zipcodeClear(data:any) {
    data.value = ''
    $("#Nationwide").modal("hide");
  }
  chooseRadius(ev: any, controlName: any) {
    this.selctedRadius = [ev.target.value]
    this.filterForm.get('radius').setValue(ev.target.value, { emitEvent: false });
  }
  applyDirectionFilter() {
    let previousQuery: any = {};
    if (this.route.snapshot.queryParams['data']) {
      previousQuery = JSON.parse(this.route.snapshot.queryParams['data']);
    }
    previousQuery.pageNumber = 1;
    this.inventory.collection.offset = 0;
    const query = JSON.stringify(Object.assign(previousQuery, { radius: this.selctedRadius }));
    this.redirectOnNewPage(query);
    this.tapPillClose();
  }
  setText(event: any) {
    this.searchTextSub.next(event.target.value);
    this.onClose.emit();
  }

  tapPillClose() {
    $('.tab-pane').removeClass('active show');
    $('.nav-link').removeClass('active');
    $('.nav-link').attr('aria-selected', false);
  }
}

type ValidProps = 'make' | 'model' | 'year__lte' | 'year__gte' | 'km_driven'

