import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrServices } from 'src/app/services/toastr.service';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'post-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  fPForm!: FormGroup;
  submitted = false;
  formSubmitting = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrServices,
              private httpService: HttpService,
              private storageService: StorageService,
              private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.fPForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      is_seller: [true],
      is_dealer:  [false]
    });
  }

  get f() { return this.fPForm.controls; }

  sendMail() {
    this.submitted = true;
    if (this.fPForm.invalid) return;
    this.formSubmitting = true;
    this.httpService.post(this.fPForm.value, 'auth/password_reset/').subscribe(res => {
      this.formSubmitting = false;
      this.notify(this.fPForm.value.email, 'success');
    }, err => {
      this.formSubmitting = false;
      if (err.status === 400 && err.error.email) {
        this.notify(this.fPForm.value.email, 'warning');
      } else {
        this.toastr.showError(this.shareDataService.getErrorMessage(err), 'Send Email');
      }
    });
  }

  notify(label:any, type: string) {
    let img: any;
    let textdescription: any;
    let titletxt: any;
    if (type === 'success') {
      titletxt = 'Email Sent';
      img = '../../../../assets/icons/Done.png';
      textdescription = `An email has been sent to ${label} with further instructions`;
    } else if (type === 'warning') {
      titletxt = 'Email not found!';
      img = '../../../../assets/icons/warning.png';
      textdescription = `The email is not yet registered Please try another email or <a class="blue-txt" href="/appraisal">Sign up</a>`;
    }
    Swal.fire({
      title: titletxt,
      text: textdescription,
      imageUrl: img,
      imageAlt: '',
      html: textdescription,
      showCancelButton: false,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
      }
    });
  }

  keydown(event:any) {
    // tslint:disable-next-line: deprecation
    const e = window.event || event;
    const key = e.keyCode;
    // space pressed
    if (key === 32) { // space
      e.preventDefault();
     }
  }

}
