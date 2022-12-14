import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShareDataService } from 'src/app/services/share-data.service';
import { StorageService } from 'src/app/services/storage.service';
import { InventoryV2Component } from '../inventory-v2.component';
import { InventoryV2Service } from '../inventory-v2.service';


@Component({
  selector: 'post-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit,OnDestroy {
  @Input() collection: any;
  @Input() config: any;
  @Input() fetchingData: boolean = false;
  @Input() favorites!: any[];
  searchFilter: any;
  subscription!: Subscription;
  userInfo: any;
  array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor(private inventoryComponent: InventoryV2Component,
              private storageService: StorageService,
              private shareDataService: ShareDataService, 
              private router:Router) { }

  ngOnInit(): void {
    this.userInfo = this.storageService.getFromLocalStorage('userInfo');
    this.getHeaderTxt();
  }
  
  getHeaderTxt() {
    this.shareDataService.headerText.subscribe( text => {
      this.searchFilter = text;
    });
  }

  favoriteToggle(id:any, status:any) {
    this.inventoryComponent.favoriteToggle(id, status);
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

  getRedirectLink(data:any) {
    if (data.vehicle_status != '4') {
      this.router.navigate([`/car-details/${data.id}`])
      return ;
    } else {
      return '/inventory';
    }
  }

}
