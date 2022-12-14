import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShareDataService } from 'src/app/services/share-data.service';
import { InventoryComponent } from '../inventory.component';

@Component({
  selector: 'post-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {
  @Input() collection: any;
  @Input() config: any;
  @Input() fetchingData: boolean  = false;
  @Input() favorites!: any[];
  searchFilter: any;
  subscription!: Subscription;
  constructor(private inventoryComponent: InventoryComponent,
                 private shareDataService: ShareDataService,
              private router: Router) { }

  ngOnInit(): void {
    this.shareDataService.headerText.subscribe( text => {
      this.searchFilter = text;
    });
  }



  getRedirectLink(data:any) {
    if (data.conformed_status === 'Processing') {
      return `/car/details/${data.id}`;
    } else {
      return '/inventory';
    }
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

}
