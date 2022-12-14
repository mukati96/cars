import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from 'src/app/guards/auth.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { PlyrComponent } from 'ngx-plyr';
declare const $: any;

@Component({
  selector: 'post-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(PlyrComponent)
  plyr!: PlyrComponent;
  player!: Plyr;
  videoSources: Plyr.Source[] = [
    {
      src: 'https://postyourcars.s3.us-east-2.amazonaws.com/Videos/234489733_944926756366649_7032306159379807561_n.mp4',
      // provider: 'youtube',
    },
  ];
  bestPriceVideo: Plyr.Source[] = [
    {
      src: 'https://staging-postyourcars.s3.us-east-2.amazonaws.com/Videos/Final.mp4',
      // provider: 'youtube',
    },
  ];

  userInfo: any;
  popularCars1 = false;
  showStars = true;
  search = false
  subscription:any= Subscription;
  customOptions: OwlOptions = {
    loop: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    margin: 14,
    navText: ['', ''],
    items: 6,
    responsive: {
      0: {
        center: true,
        stagePadding: 50,
        items: 1,
      },
      500: {
        center: true,
        stagePadding: 50,
        items: 2,
      },
      700: {
        center: false,
        stagePadding: 0,
        items: 3
      },
      940: {
        items: 4
      },

    },
    nav: false
  };
  customOptionsMobile: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: false,
    autoplayTimeout: 4000,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    margin: 14,
    navText: ['', ''],
    items: 6,
    stagePadding: 10,
    //autoWidth:false,
    responsive: {
      0: {
        items: 2,
        loop: false,
      },
      500: {
        items: 2,
        loop: false,
      },
      700: {
        items: 3
      },
      940: {
        items: 4
      },

    },
    nav: false
  };
  customOptions1: OwlOptions = {
    loop: false,
    mouseDrag: true,
    autoplay: false,
    autoplayTimeout: 4000,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    margin: 14,
    navText: ['', ''],
    items: 4,
    responsive: {
      0: {
        center: false,
        stagePadding: 0,
        items: 2,
      },
      480: {
        center: false,
        stagePadding: 0,
        items: 2,
      },
      768: {
        center: false,
        stagePadding: 0,
        items: 4,
      },
    },
    nav: false
  };
  popularCars: any = [];
  featuredCars: any;
  transactionImage: any;
  BestDealsCars: any;
  windowWidth: any;
  windowHeight: any;
  webView = true;
  data: any;
  constructor(
    private shareDataService: ShareDataService,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService,
    private toastrServices: ToastrServices,
  ) {
    this.userInfo = this.storageService.getFromLocalStorage('userInfo');

  }

  ngOnInit(): void {
    this.subscription = this.shareDataService.userDataSubscription.subscribe(
      (data: any) => {
        this.userInfo = data;
      }
    );
    this.getpopularCars()
    this.getFeaturedCars()
    this.getBestDealsCars()
    this.gettransactionImage()
    $(document).ready(function () {
      $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
          $('.scroll_top').addClass('show');
        } else {
          $('.scroll_top').removeClass('show');
        }
      });

      $('#top_scroll').click(function () {
        $('html, body').animate({
          scrollTop: $('html, body').offset().top
        });
      });

      $('.faq_height_min .card').click(function () {
        $('.faq_height_min').addClass('faq_height_max');
      });
    });
  }

  ////video///
  played(event: Plyr.PlyrEvent) {
  }

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }

  // /api/v1
  getpopularCars() {
    this.httpService.get('dealer/popular/list/').subscribe(res => {
      this.popularCars = res.slice(0, 4);
      this.popularCars1 = true;
    });
  }
  getBestDealsCars() {
    this.httpService.get('seller/best/deals/').subscribe(res => {
      this.BestDealsCars = res.slice(0, 4);
      this.popularCars1 = true;
      // this.toastrServices.showSuccess('Offer Placed Successfully', 'Make Offer');
      // },err => {
      // this.toastrServices.showError(
      //   this.shareDataService.getErrorMessage(err),
      //   ''
      // );
    });
  }
  getFeaturedCars() {
    this.httpService.get('seller/featured/vehicle/list/').subscribe(res => {
      this.featuredCars = res.slice(0, 4);

      this.popularCars1 = true;
    });
  }

  startWithTop(){
    $(document).ready(function(){
      $(window).scrollTop(0);
    });
  }

  gettransactionImage() {
    this.httpService.get('seller/transaction/image/').subscribe(res => {
      // const data= res;
      this.transactionImage = res.slice(0, 4);
      this.popularCars1 = true;
    });
  }

  favoriteToggle(id:any, status:any) {
      if (this.userInfo == '') {
      this.router.navigate(['/login'])
      return
    }
    const data = {
      vehicle: id,
      is_favorite: status
    };
    this.httpService.post(data, 'seller/like/favorite/').subscribe(res => {
      this.popularCars.map((vehicle:any) => {
        if (id === vehicle.id) {
          vehicle.is_favorite = status;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
        }
        return vehicle;
      });
    })
  }

  favoriteToggle1(id:any, status:any) {
    if (this.userInfo == '') {
      this.router.navigate(['/login'])
      return
    }
    const data = {
      vehicle: id,
      is_favorite: status
    };
    this.httpService.post(data, 'seller/like/favorite/').subscribe(res => {
      this.BestDealsCars.map((vehicle:any) => {
        if (id === vehicle.id) {
          vehicle.is_favorite = status;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
        }
        return vehicle;
      });
    })
  }

  favoriteToggleFeactured(id:any, status:any) {
    if (this.userInfo == '') {
      this.router.navigate(['/login'])
      return
    }
    const data = {
      vehicle: id,
      is_favorite: status
    };
    this.httpService.post(data, 'seller/like/favorite/').subscribe(res => {
      this.featuredCars.map((vehicle:any) => {
        if (id === vehicle.id) {
          vehicle.is_favorite = status;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
        }
        return vehicle;
      });
    })
  }

  pageReload(): void {
    window.location.reload();
    document.documentElement.scrollTop = 0;
  }

  ngAfterViewInit() {
  }

  public logout(): void {
    this.shareDataService.userData.next(null);
    this.authService.logout();
    this.router.navigate(['/']);
  }

  inventory() {
    this.router.navigate(['/inventory'])
  }

  Search() {
    if (this.search == false) {
      this.search = true
    }
    else {
      this.search = false
    }
  }

  checkWindowWidthHeight() {
    let me:any = this
    this.windowWidth = $(window).width();
    this.windowHeight = $(window).height();
    $(window).resize(()=>{
      me.windowWidth = $(window).width();
      me.windowHeight = $(window).height();
    });
    if(this.windowWidth <= 768) {
      this.webView = false
      this.vehicleDate(this.data);
    }
  }

  vehicleDate(data:any) {
    this.data = data
    if (data.length === 7) {
      localStorage.setItem('appraisalTab', 'licence_plate');
      this.router.navigate(['/new-register'], { state: { licence_plate: data } });
    } else if (data.length === 17) {
      localStorage.setItem('appraisalTab', 'vin');
      this.router.navigate(['/new-register'], { state: { vin: data } });
    } else {
      this.router.navigate(['/new-register']);
    }
  }

  ngOnDestroy() {
    // if (this.subscription) this.subscription.unsubscribe();
  }

  openInventoryWithSelectedBrand(brand: string) {
    this.router.navigateByUrl('/inventory', { state: { brand } });
    $(document).ready(function(){
      $(window).scrollTop(0);
    });
  }

  toggleVideo(id: number) {
    const video: any = document.getElementById(`car-video`);
    video.play();
  }

  pauseVideo() {
    const video: any = document.getElementById(`car-video`);
    video.pause();
  }

  toggleAboutPostVideo(id: number) {
    const video: any = document.getElementById(`post-video`);
    video.play();
  }

  pauseAboutPostVideo() {
    const video: any = document.getElementById(`post-video`);
    video.pause();
  }


}
