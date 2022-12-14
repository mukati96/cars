import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryISO } from 'ngx-intl-tel-input';
import { HttpService } from '../../../../services/http.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { ToastrServices } from '../../../../services/toastr.service';

declare const $: any;
@Component({
  selector: 'post-latest-prices',
  templateUrl: './latest-prices.component.html',
  styleUrls: ['./latest-prices.component.scss']
})
export class LatestPricesComponent implements OnInit {
  latestPriceForm :any= FormGroup;
  // tooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  submitted = false;
  formSubmitting = false;

  constructor(private fb: FormBuilder,
              private httpService: HttpService,
              private shareDataService: ShareDataService,
              private toastrServices: ToastrServices) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {
    this.latestPriceForm = this.fb.group({
      first_name: ['', [Validators.required ,Validators.pattern('^[a-zA-Z]*$')]],
      last_name: ['', [Validators.required ,Validators.pattern('^[a-zA-Z]*$')]],
      email: ['', [Validators.required, Validators.email]],
      subjects: ['', [Validators.required]],
      message: ['', [Validators.required]],
      mobile_number: ['',[Validators.required]]
    });
  }

  get f() :any{ return this.latestPriceForm.controls; }

  onSubmit(): void{
    // this.submitted = true;
    // if (this.latestPriceForm.invalid) return;
    // this.formSubmitting = true;
    // this.httpService.post(this.latestPriceForm.value, 'auth/contactus/')
    // .subscribe(res => {
    //   this.submitted = false;
    //   this.formSubmitting = false;
    //   this.latestPriceForm.reset();
    //   this.toastrServices.showSuccess('Form Successfully Submitted', 'Contact Us');
    // }, err => {
    //   this.formSubmitting = false;
    //   this.toastrServices.showError(
    //     this.shareDataService.getErrorMessage(err),
    //     'Contact Us'
    //   );
    // });
  }

  close(){
   $(`#latestPriceModalWeb`).modal('hide');
  }
}
