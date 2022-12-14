import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastrServices {
  swalWithcustomClass:any = Swal.mixin({
    customClass: {
      container: 'notification-container-class',
      popup: 'notification-popup-class',
      // header: 'notification-header-class',
      title: 'notification-title-class',
      closeButton: 'notification-close-button-class',
      icon: 'notification-icon-class',
      image: 'notification-image-class',
      // content: 'notification-content-class',
      input: 'notification-input-class',
      actions: 'notification-actions-class',
      confirmButton: 'notification-confirm-button-class',
      cancelButton: 'notification-cancel-button-class',
      footer: 'notification-footer-class'
      },
    buttonsStyling: false
  });
  swalWithNotificationcustomClass = Swal.mixin({
    customClass: {
      container: 'notify-container-class',
      popup: 'notify-popup-class',
      // header: 'notify-header-class',
      title: 'notify-title-class',
      closeButton: 'notify-close-button-class',
      icon: 'notify-icon-class',
      image: 'notify-image-class',
      // content: 'notify-content-class',
      input: 'notify-input-class',
      actions: 'notify-actions-class',
      confirmButton: 'notify-confirm-button-class',
      cancelButton: 'notify-cancel-button-class',
      footer: 'notify-footer-class'
      },
    buttonsStyling: false
  });
  swalWithNotificationCorrectcustomClass = Swal.mixin({
    customClass: {
      container: 'notifysuccess-container-class',
      popup: 'notifysuccess-popup-class',
      // header: 'notifysuccess-header-class',
      title: 'notifysuccess-title-class',
      closeButton: 'notifysuccess-close-button-class',
      icon: 'notifysuccess-icon-class',
      image: 'notifysuccess-image-class',
      // content: 'notifysuccess-content-class',
      input: 'notifysuccess-input-class',
      actions: 'notifysuccess-actions-class',
      confirmButton: 'notifysuccess-confirm-button-class',
      cancelButton: 'notifysuccess-cancel-button-class',
      footer: 'notifysuccess-footer-class'
      },
    buttonsStyling: false
  });
  constructor(private toastr: ToastrService) { }

  showSuccess(message:any, title:any) {
    return this.swalWithcustomClass.fire({
      title: `<strong>${title}</strong>`,
      imageUrl: '../../../../assets/icons/success.png',
      imageAlt: '',
      html: message,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: true,
    });
  }

  showError(message:any, title:any) {
    this.swalWithcustomClass.fire({
      title: `<strong>${title}</strong>`,
      imageUrl: '../../../../assets/icons/success.png',
      imageAlt: '',
      html: message,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: true,
    });
  }
  notificationError(message:any, title:any) {
    this.swalWithNotificationcustomClass.fire({
      title: `<strong>${title}</strong>`,
     // imageUrl: '../../../../assets/icons/error.png',
       imageAlt: '',
     //  icon: 'error',
      html: message,
      showCloseButton: false,
      showCancelButton: true,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: true,
      // timer: 500000
    });
  }
  notificationSuccess(message:any, title:any) {
    this.swalWithNotificationCorrectcustomClass.fire({
      title: `<strong>${title}</strong>`,
     // imageUrl: '../../../../assets/icons/error.png',
       imageAlt: '',
       icon: 'success',
      html: message,
      showCloseButton: false,
      showCancelButton: true,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: true,
      // timer: 500000
    });
  }
  delete(message:any, title:any) {
    this.swalWithcustomClass.fire({
      title: `<strong>${title}</strong>`,
      imageUrl: '../../../../assets/icons/delete.png',
      imageAlt: '',
      html: message,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: true,
    });
  }

  showInfo(message:any, title:any) {
    this.showError(message, title);
  }

  showWarning(message:any, title:any) {
    this.showError(message, title);
  }

}
