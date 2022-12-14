import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() popularCars:any = {};
  @Input() showStars?: boolean = false;

  constructor() { }
  
  ngOnInit(): void {
  }


}
