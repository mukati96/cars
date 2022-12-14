import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'post-appraisal-submit',
  templateUrl: './appraisal-submit.component.html',
  styleUrls: ['./appraisal-submit.component.scss']
})
export class AppraisalSubmitComponent implements OnInit {
  constructor(private shareDataService: ShareDataService,private router: Router) { }

  ngOnInit(): void {
    this.loadFacebookPixel();
  }
  homePage(){
    this.router.navigate([""]).then(() => {
      window.location.reload()
    });
  }

  loadFacebookPixel():any {
    ( (f: any, b:any, e:any, v:any, n, t, s)=> {
      let an:any=n;
      let at:any=n;
      let as:any=s;
        if (f.fbq) return; an = f.fbq =  ()=> {
          an.callMethod ?
          an.callMethod.apply(an, arguments) : an.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = an;
        an.push = an; an.loaded = !0;
        an.version = '2.0'; an.queue = [];
        at = b.createElement(e);
        at.async = !0;
        at.src = v; as = b.getElementsByTagName(e)[0];
        as.parentNode.insertBefore(at, as)
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    (window as any).fbq.disablePushState = true; //not recommended, but can be done
    (window as any).fbq('init', '529435774918573');
    (window as any).fbq('track', 'PageView');
  }

}
