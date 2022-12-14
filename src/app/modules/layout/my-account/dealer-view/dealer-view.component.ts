import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../../../services/storage.service';
import * as _ from 'lodash';
declare const $: any;

@Component({
  selector: 'post-dealer-view',
  templateUrl: './dealer-view.component.html',
  styleUrls: ['./dealer-view.component.scss']
})
export class DealerViewComponent implements OnInit {

  reviewForm!: FormGroup;
  params: any;
  dealerDetails: any = {};
  submitted = false;
  formSubmitting = false;

  constructor(private fb: FormBuilder,
              private httpService: HttpService,
              private activatedRoute: ActivatedRoute,
              private shareDataService: ShareDataService,
              private spinnerService: SpinnerService,
              private toastrServices: ToastrServices,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.initForm();
    this.params = this.activatedRoute.snapshot.params;
    this.getDealerReview(this.params.id);
  }

  initForm(): void {
    this.reviewForm = this.fb.group({
      dealer_user: ['', [Validators.required]],
      title: ['', [Validators.required]],
      your_review: ['', [Validators.required]],
      customer_service: ['', [Validators.required]],
      buying_process: ['', [Validators.required]],
      depreciation: ['', [Validators.required]],
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      seller_user: ['']
    });
  }

  get f():any { return this.reviewForm.controls; }

  getDealerReview(id:number): void{
    this.spinnerService.run();
    this.httpService.get(`dealer/dealer/detail/${id}/`).subscribe(res => {
      res.adminReview = _.find(res.dealer_review, (item) => {
        return item.email === 'james@postyourcars.com' || item.email === 'admin@postyourcars.com';
      });
      if (res.adminReview) {
        res.adminReview.totalCount = this.getAverage(res.adminReview) || undefined;
      }
      _.remove(res.dealer_review, (item:any) => {
        item.rating = this.getAverage(item);
        return item.email === 'james@postyourcars.com' || item.email === 'admin@postyourcars.com';
      });
      res.dealer_review =  _.uniqBy(res.dealer_review, 'email');
      this.dealerDetails = res;
      this.spinnerService.stop();
    }, err => {
      this.spinnerService.stop();
      this.toastrServices.showError(
        this.shareDataService.getErrorMessage(err),
        'Dealer Profile'
      );
    });
  }

  submitReview() {
    this.submitted = true;
    // tslint:disable-next-line: curly
    if (this.reviewForm.invalid) return;
    this.formSubmitting = true;
    this.httpService.post(this.reviewForm.value, 'review/ratings/')
    .subscribe((res:any) => {
      this.formSubmitting = false;
      this.close();
      this.toastrServices.showSuccess('Review successfully submitted', 'Review')
      .then((result:any) => {this.getDealerReview(this.params.id); });
    }, (err:any) => {
      this.formSubmitting = false;
      this.toastrServices.showError(
        this.shareDataService.getErrorMessage(err),
        'Submit Review'
      );
    });
  }

  getAverage(ratings: any) {
    const add = Number(ratings.buying_process)
      + Number(ratings.customer_service)
      + Number(ratings.depreciation);
    const formula = (add * 5) / 15;
    return Number(formula.toFixed(1));
  }

  openModal() {
    const userInfo = this.storageService.getFromLocalStorage('userInfo');
    this.f['name'].patchValue(userInfo.full_name);
    this.f['dealer_user'].patchValue(parseInt(this.params.id, 10));
    this.f['seller_user'].patchValue(userInfo.id);
    this.reviewForm.patchValue(userInfo);
    $('#reviewModal').modal('show');
  }

  close() {
    $('#reviewModal').modal('hide');
    this.reviewForm.reset();
    this.submitted = false;
  }

  addItem(event:any) {
    this.reviewForm.controls[event.from].patchValue(event.val);
  }

  convertNameToAsterisk(name:any): any {
    return name.replace(name.substr(2, name.length - 3),
    name.substr(1, 5).replace(/./g, '*'));
  }

}
