import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrServices } from 'src/app/services/toastr.service';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import Swal from 'sweetalert2';
import { MustMatch } from 'src/app/_helper/must-match.validator';

@Component({
  selector: 'post-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassword!: FormGroup;
  params: any;
  submitted = false;
  formSubmitting = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrServices,
              private httpService: HttpService,
              private storageService: StorageService,
              private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.params = this.route.snapshot.params;
    this.resetPassword = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]]
    },
    {
      validator: MustMatch('password', 'confirm_password')
    });
  }

  get f() { return this.resetPassword.controls; }

  public onSubmit(): void{
    this.submitted = true;
    if (this.resetPassword.invalid) return;
    const data = {
      token: this.params.token,
      password: this.resetPassword.value.password
    }
    this.formSubmitting = true;
    this.httpService.post(data, 'auth/password_reset/confirm/').subscribe(res => {
      this.formSubmitting = false;
      this.notify();
    }, err => {
      this.formSubmitting = false;
      if (err.status === 400) {
        this.toastr.showError(err.error.password[0], 'Reset Password');
      } else {
        this.toastr.showError(this.shareDataService.getErrorMessage(err), 'Reset Password');
      }
    });
  }


  notify() {
    Swal.fire({
      title: 'Success!',
      text: 'Your Password has been updated successfully',
      imageUrl: '../../../../assets/icons/Done.png',
      imageAlt: '',
      showCancelButton: false,
      confirmButtonText: 'Continue',
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/login']);
      }
    });
  }

}
