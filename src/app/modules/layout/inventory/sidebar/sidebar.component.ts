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
import { InventoryComponent } from '../inventory.component';
import { ShareDataService } from '../../../../services/share-data.service';
import { OnChanges } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER, E} from '@angular/cdk/keycodes';
declare const $: any;
import { CAR_MAKES } from 'src/app/constants/makes';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
// import _remove from 'lodash/remove';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'post-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit ,OnChanges, AfterViewInit {
  @Input() filtersData : any;
  @Input() filterForm : any;
  @Input() models: any;
  @Input() trims: any;
  @Output() changeMake = new EventEmitter();
  @Output() changeModel =new  EventEmitter();
  @Output() updateListData = new EventEmitter();
  @Output() collections = new EventEmitter();
  CAR_MAKES = CAR_MAKES.sort((a, b) => {
    return a.localeCompare(b);
  });
  km_driven: any;
  model:any[]=[];
  trim:any[]=[];
  make: any[] = [];
  fuel_type: any[] = [];
  body_type: any[] = [];
  owner_type: any[] = [];
  transmission: any[] = [];
  year__gte: any[] = [];
  year__lte:any[] = [];
  classAdded = '';
  chips: any = [];
  color:any[]=[];
  searchKey: any;
  searchFilter: any;
  minValue = 0;
  maxValue = 0;
  budgetValues:any = { min: 0, max: 0 };
  removable = true;
  addOnBlur = true;
  minKMValue = 1;
  minMileage = 0;
  maxMileage = 0;
  year :any= [ 
    2022,
    2021,
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
    2012,
    2011,
    2010,
    2009,
    2008,
    2007,
    2006,
    2005,
    2004,
    2003,
    2002,
    2001,
    2000,
    1999,
    1998
  ];

  minYear: any[] = this.year;
  maxYear: any[] = this.year;
  budgetOptions: Options = {
    floor: 0,
    ceil: 6,
    step: 1,
    showTicks: false,
    draggableRange: false,
    translate: (value: number): string => {
      if (value === 0) {
        return '$0';
      } else if (value === 1) {
        return '$5k';
      } else if (value === 2) {
        return '$10k';
      } else if (value === 3) {
        return '$20k';
      } else if (value === 4) {
        return '$50k';
      } else if (value === 5) {
        return '$80k';
      } else if (value === 6) {
        return '$100k+';
      }
      return '$' + value + 'K';
    }
  };
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
  currentUrl: any;
  previousUrl: any;

  get f():any {
    return this.filterForm.controls;
  }

  constructor(private inventoryComponent: InventoryComponent,
              private shareDataService: ShareDataService, private router: Router,
     private route: ActivatedRoute , private location: Location) {}

  ngOnInit(): void {
    if(this.route.snapshot.queryParams['data'] ) {
      const query = JSON.parse(this.route.snapshot.queryParams['data']);
      let me:any=this;
      Object.keys(query).map((key:any, index:any) => {
        me[key] = query[key];
        this.filterForm.controls[key].setValue(me[key], { emitEvent: false });
        this.updateChips();
      });
      this.changeMake.emit(`${this.make}`);
      if(this.model.length) {
        this.changeModel.emit(this.model);
      }
      this.filterForm.updateValueAndValidity();
    } else {
      this.CAR_MAKES = [];
      setTimeout(() => {
        this.CAR_MAKES = CAR_MAKES.sort((a, b) => {
          return a.localeCompare(b);
        });
      },0)
     
    }
  }

  ngOnChanges() {
    if (this.filtersData) {
      Object.keys(this.filtersData).map((key, index) => {
        this.filtersData[key].total = 0;
        this.filtersData[key].map((i:any) => {
          if(i.transmission===''){
            i.name_count=0
            this.filtersData[key].total = this.filtersData[key].total + i.name_count;
          }
        });
      });
    }
  }

  remove(item: any): void {
    if(item.controlName === 'make') {
      this.model = [];
      this.trim = []
      this.filterForm.controls.model.setValue('', { emitEvent: false });
      this.filterForm.controls.trim.setValue('', { emitEvent: false });
      this.radioOptionsChecked(item.value, item.controlName);
      this.updateChips();
      this.router.navigate(['/inventory'])
    } else { 
      this.openNewPageWithQueryParam({target: {value : item.value}}, item.controlName);
    }
  }


  public optionsChecked(event: any, controlName: ValidProps): any {
    this.filterForm.controls.make_slug.setValue('', { emitEvent: false });
    let currentValue = event;    
    if(typeof event !== "string") {
      currentValue = event.target.value
    }
    if (currentValue === '') {
      this[controlName] = [];
    }
    if (this[controlName].includes(currentValue) || currentValue === '') {
      this[controlName] = this[controlName].filter((e:any) => {
        return e !== currentValue;
      });
    } else {
      this[controlName].push(currentValue);
    }
    this.filterForm.controls[`${controlName}`].setValue(this[controlName]);
    this.updateChips(); 
    if (this[controlName].length) {
      this.changeMake.emit(`${this.make}`);
    }
    if(controlName === 'model') {
      this.changeModel.emit(this.model);
    }
  }

  public radioOptionsChecked(event: any, controlName:ValidProps): void {
    this.filterForm.controls.make_slug.setValue('', { emitEvent: false });
    let currentValue = event;
    if(typeof event !== "string") {
      currentValue = event.target.value
    }
    if (currentValue === '') {
      this[controlName] = [];
    }
    if (this[controlName].includes(currentValue) || currentValue === '') {
      this[controlName] = this[controlName].filter((e :any)=> {
        return e !== currentValue;
      });
    } else {
      this[controlName] = [currentValue];
    }
    this.filterForm.controls[controlName].setValue(this[controlName]);
    this.updateChips();
    if (this[controlName].length) {
      this.changeMake.emit(`${this.make}`);
    }
    if(controlName === 'model') {
      this.changeModel.emit(this.model);
    }
  }

  updateChips() {
    this.chips = [
      ...this.getValueWithUpdatedKey('make'), 
      ...this.getValueWithUpdatedKey('model'), 
      ...this.getValueWithUpdatedKey('trim'),
      ...this.getValueWithUpdatedKey('fuel_type'),
      ...this.getValueWithUpdatedKey('body_type'),
      ...this.getValueWithUpdatedKey('transmission'),
      ...this.getValueWithUpdatedKey('color'),
    ];

  }

  getValueWithUpdatedKey(key: ValidProps) {
    return this[key].map((m:any) => {
      return {
        controlName: key,
        value: m
      };
    });
  }

  choose(value:any, controlName:any) { 
    this.openNewPageWithQueryParam({target: {value : value}}, controlName);
  }


  chooseYear(from?:any) {
    const min = parseInt(this.filterForm.get('year__gte').value);
    const max = parseInt(this.filterForm.get('year__lte').value);
    if(max) {
      this.minYear = this.year.filter((i:any) => {
        return i <= max;
      });
    }
    if(min) {
      this.maxYear = this.year.filter((i:any) => {
        return i >= min;
      });
    }
  }

  clearFilters() {  
    this.filterForm.reset();
    this.chips=[];
    this.make = [];
    this.fuel_type = [];
    this.owner_type = [];
    this.body_type = [];
    // this.year__gte = [];
    // this.year__lte = [];
    this.transmission = [];
    this.color = [];
    this.trim=[];
    this.model=[];
    this.minValue = 0;
    this.maxValue = 0;
    this.minMileage = 0;
    this.maxMileage = 0;
    this.budgetValues.min = 0;
    this.budgetValues.max = 0;
    this.searchKey = '';
    this.searchFilter = null;
    this.inventoryComponent.config.currentPage = 1;
    this.inventoryComponent.page = 1;
    this.filterForm.controls.model.setValue('', { emitEvent: false });
    this.filterForm.controls.trim.setValue('', { emitEvent: false });
    this.filterForm.controls.color.setValue('', { emitEvent: false });
    this.filterForm.controls.sort_by.setValue('', { emitEvent: false });
    this.filterForm.controls.is_favorite.setValue(false, { emitEvent: false });
    this.filterForm.controls.status.setValue('', { emitEvent: false });
    this.filterForm.controls.year__gte.setValue('', { emitEvent: false });
    this.filterForm.controls.year__lte.setValue('', { emitEvent: false });
    this.filterForm.controls.fuel_type.setValue('', { emitEvent: false });
    this.filterForm.controls.make.setValue('', { emitEvent: false });
    this.filterForm.controls.body_type.setValue('', { emitEvent: false });
    this.filterForm.controls.make_slug.setValue('', { emitEvent: false });
    //this.changeTextVal();
    this.router.navigate(['/inventory'])
  }

  onUserChangeEnd($event:any, controlName:any) {
    if (controlName === 'km_driven') {
      this.filterForm.controls[controlName].setValue($event);
    } else {
      const changeKey: any = $event.pointerType ? 'max' : 'min';
      const controlKey = $event.pointerType ? 'highValue' : 'value';
      if ($event[controlKey] === 0) {
        this.budgetValues[changeKey] = 0;
      } else if ($event[controlKey] === 1) {
        this.budgetValues[changeKey] = 5000;
      } else if ($event[controlKey] === 2) {
        this.budgetValues[changeKey] = 10000;
      } else if ($event[controlKey] === 3) {
        this.budgetValues[changeKey] = 20000;
      } else if ($event[controlKey] === 4) {
        this.budgetValues[changeKey] = 50000;
      } else if ($event[controlKey] === 5) {
        this.budgetValues[changeKey] = 80000;
      } else if ($event[controlKey] === 6) {
        this.budgetValues[changeKey] = 100000;
      }
      this.filterForm.controls[controlName].setValue(this.budgetValues);
    }
  }

  ngAfterViewInit(): void {
    const accordions:any = document.getElementsByClassName('accordion');
    for (let i = 0; i < accordions.length; i++) {
      accordions[i].addEventListener('click', function() {
        accordions[i].classList.toggle('active');
        const panel:any = accordions[i].nextElementSibling;
        panel.classList.toggle('active');
      });
    }
  }

  togglePanel(id: string, headerId: string) {
   let data:any = document.getElementById(id);
                  data.classList.toggle("active")
  let data1:any = document.getElementById(headerId);
                  data1.classList.toggle("active");
  }

  openNewPageWithQueryParam(event: any, controlName: any) {
    let previousQuery: any = {};
    let me:any =this;
    if(this.route.snapshot.queryParams['data']) {
      previousQuery = JSON.parse(this.route.snapshot.queryParams['data']);
    }
    let previousAndCurrentValue = [];
    if (me[controlName].includes(event.target.value) || event.target.value === '') {
      me[controlName] = me[controlName].filter((e:any) => {
        return e !== event.target.value;
      });
    } else {
      me[controlName].push(event.target.value);
    }
    if(controlName === 'make') {
      previousAndCurrentValue = [event.target.value];
      delete previousQuery.model;
      delete previousQuery.trim;
    } else {
      previousAndCurrentValue = [...me[controlName]];
    } 
    const query = JSON.stringify(Object.assign(previousQuery, {[controlName]: previousAndCurrentValue}));
    this.redirectOnNewPage(query);
  }

  redirectOnNewPage(query: string) {
    window.location.href = `/inventory?data=${query}`;
    $('.panel').removeClass('active');
    $('.accordion').removeClass('active');
  }

}

type ValidProps = 'make' | 'model' | 'trim' | 'transmission' | 'fuel_type' | 'body_type' | 'color'
