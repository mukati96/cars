import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryISO } from 'ngx-intl-tel-input';
import { HttpService } from '../../../services/http.service';
import { ShareDataService } from '../../../services/share-data.service';
import { ToastrServices } from '../../../services/toastr.service';

@Component({
  selector: 'post-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactusForm!: FormGroup;
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
    this.contactusForm = this.fb.group({
      first_name: ['', [Validators.required ,Validators.pattern('^[a-zA-Z]*$')]],
      last_name: ['', [Validators.required ,Validators.pattern('^[a-zA-Z]*$')]],
      email: ['', [Validators.required, Validators.email]],
      subjects: ['', [Validators.required]],
      message: ['', [Validators.required]],
      mobile_number: ['',[Validators.required]]
    });
  }

  get f():any { return this.contactusForm.controls; }

  onSubmit(): void{
    this.submitted = true;
    // tslint:disable-next-line: curly
    if (this.contactusForm.invalid) return;
    this.formSubmitting = true;
    this.httpService.post(this.contactusForm.value, 'auth/contactus/')
    .subscribe(res => {
      this.submitted = false;
      this.formSubmitting = false;
      this.contactusForm.reset();
      this.toastrServices.showSuccess('Form Successfully Submitted', 'Contact Us');
    }, err => {
      this.formSubmitting = false;
      this.toastrServices.showError(
        this.shareDataService.getErrorMessage(err),
        'Contact Us'
      );
    });
  }

}
