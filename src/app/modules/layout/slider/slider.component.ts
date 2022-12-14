import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/guards/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'post-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() popularCars:any = {};
  @Input() showStars?: boolean = false;
  userInfo:any;
  constructor( private authService: AuthService,
    private router: Router,
    private httpService: HttpService,) { }

  

  ngOnInit(): void {
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
    this.httpService.post(data, 'seller/like/favorite/').subscribe((res:any) => {
      this.popularCars.map((vehicle:any) => {
        if (id === vehicle.id) {
          vehicle.is_favorite = status;
        }
        return vehicle;
      });
    })
  }
}
