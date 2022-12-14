import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import * as _ from 'lodash';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {
  auctions: any = [];
  currentDate = new Date();

  constructor(private httpService: HttpService,
              private shareDataService: ShareDataService,
              private toastrServices: ToastrServices,
              private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.getTodaysDeal();
  }

  getTodaysDeal() {
    this.spinnerService.run();
    this.httpService.get('appointment/confirmed/appraisals/')
    .subscribe((res: any) => {
      res = _.filter(res, (item: any) => {
        const inputDate = new Date(item.date);
        return inputDate.setHours(0, 0, 0, 0) === this.currentDate.setHours(0, 0, 0, 0);
      });
      this.auctions = res;
      this.spinnerService.stop();
    }, err => {
      this.spinnerService.stop();
      this.toastrServices.showError(
        this.shareDataService.getErrorMessage(err),
        `Today's Auction`
      );
    });
  }

}
