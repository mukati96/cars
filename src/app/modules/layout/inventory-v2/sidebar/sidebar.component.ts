import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Output
} from '@angular/core';
import { Options } from '@m0t0r/ngx-slider';
import { ShareDataService } from '../../../../services/share-data.service';
import { OnChanges } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, E } from '@angular/cdk/keycodes';
declare const $: any;
import { CAR_MAKES } from 'src/app/constants/makes';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
// import _remove from 'lodash/remove';
import { Location } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { InventoryV2Component } from '../inventory-v2.component';
import { HttpService } from 'src/app/services/http.service';
import { Subject } from 'rxjs';
import { YEARS } from 'src/app/constants/years';
import { MONTHS } from 'src/app/constants/miles';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'post-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() filtersData: any;
  @Input() filterForm: any;
  @Input() models: any;
  @Output() changeMake = new EventEmitter();
  @Output() changeModel = new EventEmitter();
  @Output() updateListData = new EventEmitter();
  @Output() collections = new EventEmitter();
  @Input() collection: any;
  CAR_MAKES = CAR_MAKES.sort((a, b) => {
    return a.localeCompare(b);
  });
  km_driven: any;
  model: any[] = [];
  make: any[] = [];
  year__gte: any[] = [];
  year__lte: any[] = [];
  zip_code: any[] = [];
  radius: any[] = [];
  searchKey: any;
  searchFilter: any;
  maxMileage = 150000;
  minMileage = 0;
  year: any = YEARS;
  miles: any = MONTHS;
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
    animate: false
  };
  errorZipcode :any;
  currentUrl: any;
  show = false;
  previousUrl: any;
  checkedList !: any[];
  showDropDown !: boolean;
  currentSelected: any;
  minYears: any;
  windowWidth: any;
  windowHeight: any;
  data: any;
  stateCityValue: any;
  mileageChanged = new Subject();
  mileageErrorMessage: any;
  maxErrorMsg:any;
  get f(): any {
    return this.filterForm.controls;
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private inventory: InventoryV2Component,
    private httpService: HttpService,
    public location: Location
  ) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.checkWindowWidthHeight();
    this.getChangeValueInMileage();
  }

  checkWindowWidthHeight() {
    this.windowWidth = $(window).width();
    this.windowHeight = $(window).height();
    $(window).resize(() => {
      this.windowWidth = $(window).width();
      this.windowHeight = $(window).height();
    });
    if (this.windowWidth > 768) {

      this.route.queryParams.subscribe(p => {
        if (!p['data']) {
          this.updateMakes();
        }
        else {
          this.listenForQueryChanges();
        }
      });
    }
  }

  listenForQueryChanges() {
    if (this.route.snapshot.queryParams['data']) {
      const query = JSON.parse(this.route.snapshot.queryParams['data']);
      Object.keys(query).map((key: any, index: any) => {
        if (key === 'km_driven') {
          this.minMileage = query[key][0].min;
          this.maxMileage = query[key][0].max;
          this.filterForm.controls[key].setValue({ value: this.minMileage, highValue: this.maxMileage }, { emitEvent: false });
        } else if (key === 'custom') {
          this.inventory['searchText'] = query[key];
          this.filterForm.controls[key].setValue(this.inventory['searchText']);
        } else if (key === 'zip_code') {
          this.fethZipCodeWithState(query[key]);
          this.filterForm.controls[key].setValue(query[key], { emitEvent: false });
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
      if (!('radius' in query)) {
        this.filterForm.get('radius').patchValue('', { emitEvent: false })
      }
      if (!('zip_code' in query)) {
        this.filterForm.get('zip_code').patchValue('', { emitEvent: false })

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
      this.inventory['searchText'] = '';
      this.filterForm.get('custom').setValue('');
    }
  }

  updateMakes() {
    this.CAR_MAKES = [];
    this.minMileage = 0;
    this.maxMileage = 150000;
    setTimeout(() => {
      this.CAR_MAKES = CAR_MAKES.sort((a, b) => {
        return a.localeCompare(b);
      });
    }, 500)
    this.filterForm.get('make').patchValue([], { emitEvent: false });
    this.filterForm.get('model').patchValue([], { emitEvent: false });
    this.filterForm.get('year__gte').patchValue([], { emitEvent: false });
    this.filterForm.get('year__lte').patchValue([], { emitEvent: false });
    this.filterForm.get('km_driven').patchValue(null, { emitEvent: false });
    this.filterForm.get('radius').patchValue('', { emitEvent: false });
    this.filterForm.get('zip_code').patchValue('');
    this.show = false;
    this.filterForm.updateValueAndValidity();
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

  ///year
  chooseYear(value: any, controlName: any) {
    const min = parseInt(this.filterForm.get('year__gte').value);
    const max = parseInt(this.filterForm.get('year__lte').value);
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
    this.openNewPageWithQueryParam({ target: { value: value.target.value } }, controlName);
  }
  //mileage
  onUserChangeEnd(event: any, controlName: any) {
    this.maxErrorMsg = "";
    if (controlName === 'km_driven') {
      this.filterForm.controls[controlName].setValue(event);
      this.openNewPageWithQueryParam(event, controlName);
    }
  }

  /////zipcode//
  getDistanceData(data:any, controlName: any) {
    if (data.value.length <= '4') {
      return;
    }
    this.httpService.get(`auth/zip-code/${data.value}/`).subscribe((res: any) => {
      if (res.errorMessage == "Zip code does not exists") {
        this.errorZipcode = res.errorMessage
        this.show = false
      } else {
        this.stateCityValue = res.data[0];
        this.show = true;
        this.filterForm.get('zip_code').patchValue(data.value, { emitEvent: false });
        // let previousQuery: any = {};
        // if (this.route.snapshot.queryParams['data']) {
        //   previousQuery = JSON.parse(this.route.snapshot.queryParams['data']);
        // }
        // const query = JSON.stringify(Object.assign(previousQuery, { zip_code: data.value }));
        // this.router.navigateByUrl(`/inventory?data=${query}`)
        this.openNewPageWithQueryParam({ target: { value: data.value } }, controlName);
        $("#Nationwide").modal("hide");
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
    if (controlName === 'radius') {
      this.openNewPageWithQueryParam({ target: { value: ev.target.value } }, controlName);
    }
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
    if (controlName === 'make') {
      previousAndCurrentValue = [event.target.value];
      delete previousQuery.model;
    } else if (controlName === 'model') {
      previousAndCurrentValue = [event.target.value];
      delete previousQuery.model;
    } else if (controlName === 'year__gte') {
      previousAndCurrentValue = [event.target.value];
      delete previousQuery.year__gte;
    } else if (controlName === 'year__lte') {
      previousAndCurrentValue = [event.target.value];
      delete previousQuery.year__lte;
    } else if (controlName === 'km_driven') {
      previousAndCurrentValue = [{ min: event.value, max: event.highValue }];
    } else if (controlName === 'radius') {
      previousAndCurrentValue = [event.target.value];
    } else if (controlName === 'zip_code') {
      previousAndCurrentValue = [event.target.value];
    } else {
      previousAndCurrentValue = [...me[controlName]];
    }
    const query = JSON.stringify(Object.assign(previousQuery, { [controlName]: previousAndCurrentValue }));
    this.redirectOnNewPage(query);
  }

  redirectOnNewPage(query: string) {
    this.router.navigateByUrl(`/inventory?data=${query}`)
    $('.panel').removeClass('active');
    $('.accordion').removeClass('active');
  }

  onChangeMileageInputMin(event: any) {
    const ev: any = {
      highValue: this.maxMileage,
      pointerType: 0,
      value: this.minMileage
    }
    this.mileageChanged.next(ev)
  }

  onChangeMileageInputMax(event: any) {
    const ev: any = {
      highValue: this.maxMileage,
      pointerType: 0,
      value: this.minMileage
    }
    if (ev.value >= ev.highValue) {
      this.maxMileage = 150000;
      this.maxErrorMsg = "Try a different mileage range"
    } else if (ev.value <= ev.highValue) {
      this.maxErrorMsg = "";
      this.mileageChanged.next(ev)
    } else {
      this.mileageChanged.next(ev)
    }

    if (ev.highValue != 150000) {
      $('.plusSign').hide();
      $('.plusSign').removeClass('d-inline-block');
    } else if (ev.highValue === 150000) {
      $('.plusSign').addClass('d-inline-block');
    }
  }

  getChangeValueInMileage() {
    this.mileageChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text:any) => {
      this.onUserChangeEnd(text, 'km_driven');

    });
  }
}

type ValidProps = 'make' | 'model' | 'year__lte' | 'year__gte' | 'km_driven' | 'radius'
