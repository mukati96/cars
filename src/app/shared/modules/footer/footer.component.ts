import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
declare const $: any;
@Component({
  selector: 'post-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  enableFooter = false;
  constructor(private router: Router) {
    router.events.subscribe((event?: any) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/steps/submit' ||
            event.url === '/my-account/review' ||
            event.url === '/my-account/received-offer' ||
            event.url === '/login' ||
            event.url === '/appraisal') {
          this.enableFooter = true;
        } else this.enableFooter = false;
      } else if (event instanceof NavigationEnd) {
        // set statements for End of the navigation
      }
    });
  }

  ngOnInit(): void {
  }

  startWithTop(){
    $(document).ready(function(){
      $(window).scrollTop(0);
    });
  }
  
}
