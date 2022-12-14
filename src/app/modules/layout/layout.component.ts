import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/guards/auth.service';
import { GoogleAnalyticsServices } from 'src/app/services/google-analytics.service';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrServices } from 'src/app/services/toastr.service';
declare const $: any;
@Component({
  selector: 'post-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  showLayout = true;
  showHeader = false;
  showFooter = true;
  userInfo: any = {};
  isAuthenticated = false;
  private previousUrl: any = undefined;
  private currentUrl: any = undefined;

  constructor(public auth: AuthService,
              private router: Router,
              private renderer: Renderer2,
              private httpService: HttpService,
              public spinnerService: SpinnerService,
              private storageService: StorageService,
              private shareDataService: ShareDataService,
              private toastService: ToastrServices,
              private $gaService: GoogleAnalyticsServices) {
              this.isAuthenticated = auth.checkAuthentication();
              if(!this.isAuthenticated && window.location.pathname && window.location.pathname !== '/login')
                this.auth.loadUrl = window.location.pathname;
              this.storageService.removeFromLocalStorage('visited')
              // if (auth.checkAuthentication()) {
              //   this.store.dispatch(
              //     new UpdateProfile(
              //       this.storageService.getFromLocalStorage('userInfo')
              //     )
              //   );
              // }
              router.events.subscribe((event?: any) => {
                if (event instanceof NavigationStart) {
                  // set statements for Start of the navigation
                  this.shareDataService.currentUrl = event.url;
                } else if (event instanceof NavigationEnd) {
                  // set statements for End of the navigation
                  let loader = this.renderer.selectRootElement('#loader');
                  this.renderer.setStyle(loader, 'display', 'none');
                  // Google Analytics Virtually Page Send
                  this.$gaService.setPage(`${event.urlAfterRedirects}`);

                  this.previousUrl = this.currentUrl;
                  this.currentUrl = event.url;
                  this.setPages(event.url);
                  document.documentElement.scrollTop = 0;
                }
              });
             
            }

  ngOnInit() {}

  ngAfterViewInit() {
    $(document).on('click','.swal2-image', () => {
      this.toastService.swalWithcustomClass.close();
    });
    // this.disablePageFromScrolling();
    //  swal2-image
  }

  private setPages(url: string): void {
    if (url === '/' ||
        url === '/home' ||
        url === '/appraisal' ||
        url.includes('/?mc_cid') ||
        url.includes('/?fbclid') ||
        url.includes('utm_campaign')
        ) {
      this.showHeader = false;
      this.showFooter = false;
      
      // if (url === '/new-design') {
      //   this.storageService.saveToLocalStorage('visited', true);
      // }
    } else if (url === '/new-register' || url === '/new-register/preview') {
      this.showHeader = true;
      this.showFooter = true;
      setTimeout(() => {
        this.showFooter = true;
      }, 1000);
    } else {
      this.shareDataService.changeData(undefined);
      this.showHeader = true;
      this.showFooter = true;
      setTimeout(() => {
        this.showFooter = true;
      }, 1000);
    }
  }
}
