import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { StorageService } from 'src/app/services/storage.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'post-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit {
  userInfo: any;
  searchFilter: any;
  appraisalList: any[] = [];
  spinner = false;
  reApproving = false;
  reqSent = false;
  token: any;
  queryEmail: any;
  queryToken: any;

  constructor(private httpService: HttpService,
              private toastrServices: ToastrServices,
              private storageService: StorageService,
              private spinnerService: SpinnerService,
              private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.queryEmail=localStorage.getItem('queryEmail')
    this.queryToken=localStorage.getItem('queryToken')
    let parms={
      email:this.queryEmail,
      token:this.queryToken
    }
    this.httpService.put(parms, 'auth/email/verify/').subscribe( res => {
    })
    this.userInfo = this.storageService.getFromLocalStorage('userInfo');
    this.getApprovalList();
    this.getHeaderTxt();
  }

  private getApprovalList(): void {
    this.spinnerService.run();
    this.spinner = true;
    this.httpService.get(`seller/vehicle/`).subscribe(res => {
      res.map((item:any) => {
        if (!item.name) {
          item.name = `${item.year} ${item.make} ${item.trim}`;
        }
        return item;
      });
      this.appraisalList = res;
      this.spinner = false;
      this.spinnerService.stop();
    }, err => {
      this.spinner = false;
      this.spinnerService.stop();
      this.toastrServices.showError(this.shareDataService.getErrorMessage(err), 'My Approval');
    });
  }

  getHeaderTxt() {
   this.shareDataService.headerText.subscribe( text => {
     this.searchFilter = text;
   });
  }

  // carStatus(carDetail) {
  //   //  if (carDetail.vehicle_status === 'Sold') {
  //   //   return 'Details';
  //    if (carDetail.vehicle_status === 'Rejected') {
  //    return 'Closed';}
  //    else if (carDetail.vehicle_status === 'Expired') {
  //     return 'Closed';
  //   } else if (!carDetail.is_admin_permitted) {
  //     return 'Reviewing';
  //   } else if (carDetail.is_admin_permitted) {
  //     return 'View offer';
  //   }
  // }

  // getLink(carDetail): string {
  //   if (carDetail.vehicle_status === 4) {
  //     return `/car-details/${carDetail.id}`;
  //   } else if (carDetail.vehicle_status === 5 || carDetail.conformed_status === 'Processing') {
  //     return `/car-details/${carDetail.id}`;
  //   } else if (carDetail.vehicle_status === 2) {
  //    return `/car-details/${carDetail.id}`;
  //   } else if (!carDetail.is_updated && !carDetail.current_top_offer) {
  //     return `/car-details/${carDetail.id}`;
  //   } else if (carDetail.is_admin_permitted &&
  //              carDetail.current_top_offer &&
  //              carDetail.conformed_status !== 'Processing') {
  //     return `/car-details/${carDetail.id}`;
  //   } else if (carDetail.is_updated && carDetail.vehicle_status !== 2) {
  //     return `/car-details/${carDetail.id}`;
  //   } else if (!carDetail.is_admin_permitted) {
  //     return `/car-details/${carDetail.id}`;
  //   }
  // }

  rePost(carDetail:any) {
    this.reApproving = true;
    this.httpService
    .put(carDetail, `seller/expiry/approval/${carDetail.id}/`)
    .subscribe(
      (res:any) => {
        this.toastrServices.showSuccess(
          'Please make sure that your car still has same condition before it posted',
          'Request Sent'
        );
        this.reApproving = false;
        this.reqSent = true;
        this.getApprovalList();
      },
      err => {
        this.reApproving = false;
        this.toastrServices.showError(
          this.shareDataService.getErrorMessage(err),
          'Re-approving'
        );
      }
    );
  }

}
