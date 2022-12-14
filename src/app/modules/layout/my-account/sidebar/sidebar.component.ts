import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'post-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isAccount = true;
  isSaved =false;
  isMyCar = false;
  constructor(private router: Router,
              private shareDataService: ShareDataService) {
              this.changeTab(this.shareDataService.currentUrl);
              router.events.subscribe((event?: any) => {
                if (event instanceof NavigationStart) {
                  // set statements for Start of the navigation
                  this.changeTab(event.url);
                }
              });
  }

  ngOnInit(): void {
  }

  public changeTab(url:any) {
    if (url === '/my-account/mycar') {
      this.isAccount = false;
      this.isSaved =false;
      this.isMyCar =true;
    }
    else if (url === '/my-account/favourite'){
      this.isSaved =true;
     this.isAccount = false;
     this.isMyCar =false;
    } else {
      this.isAccount = true;
      this.isSaved =false;
      this.isMyCar =false;
    }
  }
  

}
