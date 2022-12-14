import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  enabled = new Subject<boolean>();
  showSpinner = false;
  // private busyRequestCount: number = 0;
  constructor() { }
  body = document.getElementsByTagName('body')[0];

  public run(): void {
    this.enabled.next(true);
    this.body.classList.add('no-scroll');
    this.showSpinner = true;
  }

  public stop(): void {
    this.enabled.next(false);
    this.body.classList.remove('no-scroll');
    this.showSpinner = false;
}
}

// export enum snipperColors {
//   bgColor = 'rgba(0, 0, 0, 0.8)',
//   color = '#fff'
// }
