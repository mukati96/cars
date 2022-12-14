import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsServices {

  constructor(private $gaService: GoogleAnalyticsService) { }

  setPage(url:any, title = 'Seller') {
    if (url !== '/new-register') {
      this.$gaService.pageView(`${url}`, title);
    }
  }
}
