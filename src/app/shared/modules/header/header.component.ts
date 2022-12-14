import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/guards/auth.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { StorageService } from 'src/app/services/storage.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
declare const $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  userInfo: any;
  search = false;
  value:any;
  enableSearch = false;
  isShown: boolean = false;
  public showRuleContent: boolean = false;
  public buttonName: any = 'Expand';
  currentUrl: string = '';
  searchTextSub = new Subject();

  constructor(private router: Router,
    private authService: AuthService,
    private shareDataService: ShareDataService,
    private storageService: StorageService) {
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
    });
  }

  ngOnInit(): void {
    this.shareDataService.userDataSubscription.subscribe((data: any) => {
      this.userInfo = data;
    });
    this.getChangeValueInSearch();
  }

  getChangeValueInSearch() {
    this.searchTextSub.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(text => {
      this.shareDataService.headerText.next(text);
    });
  }


  setText(event: any) {
    this.searchTextSub.next(event.target.value);
  }

  Search() {
    this.isShown = !this.isShown;
  }

  public logout(): void {
    this.shareDataService.userData.next(null);
    this.authService.logout();
    location.reload();
    this.router.navigate(['/login']);
  }

  toggle($event:any) {
    this.showRuleContent = !this.showRuleContent;


    if (this.showRuleContent)
      this.buttonName = "Collapse";
    else
      this.buttonName = "Expand";
  }

  scrollbar() {
    $('body').toggleClass('no-scroll');
  }

  logo() {
    $('body').removeClass('no-scroll');
    $('.navbar-toggler').addClass('collapsed');
    $('.navbar-collapse').collapse('hide');
  }

  redirctPage() {
    $('body').removeClass('no-scroll');
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('.search-form img').click(function () {
        $('.hideclick').toggleClass('showclick');
      });
    });
    $('.navbar-nav>li>.dropdown-menu>a').on('click', function () {
      $('.navbar-collapse').collapse('hide');
    });
    $('.navbar-nav>li>a').on('click', function () {
      $('.navbar-collapse').collapse('hide');
    });
  }

  pageReload(): void {
    window.location.reload();
    document.documentElement.scrollTop = 0;
  }
}
