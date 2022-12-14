import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { DealerViewComponent } from '../dealer-view/dealer-view.component';

@Component({
  selector: 'post-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() disabled = false;
  @Input() getValue: any;
  @Input() from: any;
  values = [
    {
      type: 'radio',
      id: 'star5',
      name: 'rating',
      value: 5,
      class: 'full',
      for: 'star5',
      title: 'Awesome - 5 stars'
    },
    {
      type: 'radio',
      id: 'star4half',
      name: 'rating',
      value: 4.5,
      class: 'half',
      for: 'star4half',
      title: 'Pretty good - 4.5 stars'
    },
    {
      type: 'radio',
      id: 'star4',
      name: 'rating',
      value: 4,
      class: 'full',
      for: 'star4',
      title: 'Pretty good - 4 stars'
    },
    {
      type: 'radio',
      id: 'star3half',
      name: 'rating',
      value: 3.5,
      class: 'half',
      for: 'star3half',
      title: 'good - 3.5 stars'
    },
    {
      type: 'radio',
      id: 'star3',
      name: 'rating',
      value: 3,
      class: 'full',
      for: 'star3',
      title: 'good - 3 stars'
    },
    {
      type: 'radio',
      id: 'star2half',
      name: 'rating',
      value: 2.5,
      class: 'half',
      for: 'star2half',
      title: 'Medium - 2.5 stars'
    },
    {
      type: 'radio',
      id: 'star2',
      name: 'rating',
      value: 2,
      class: 'full',
      for: 'star2',
      title: 'Medium - 2 stars'
    },
    {
      type: 'radio',
      id: 'star1half',
      name: 'rating',
      value: 1.5,
      class: 'half',
      for: 'star1half',
      title: 'poor - 1.5 stars'
    },
    {
      type: 'radio',
      id: 'star1',
      name: 'rating',
      value: 1,
      class: 'full',
      for: 'star1',
      title: 'bad - 1 star'
    },
    {
      type: 'radio',
      id: 'starhalf',
      name: 'rating',
      value: 0.5,
      class: 'half',
      for: 'starhalf',
      title: 'very bad - 0.5 stars'
    },
  ];

  constructor(private dealerReviewComponent: DealerViewComponent) { }

  ngOnInit(): void {
  }

  setValue(value:any) {
    this.getValue = value;
    this.dealerReviewComponent.f[this.from].patchValue(value);
  }

}
