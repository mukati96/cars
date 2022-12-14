import { Component, Input, OnInit } from '@angular/core';
import { NewRegisterComponent } from '../new-register.component';

@Component({
  selector: 'post-header-steps',
  templateUrl: './header-steps.component.html',
  styleUrls: ['./header-steps.component.scss']
})
export class HeaderStepsComponent implements OnInit {

  @Input() currentStep :any;
  @Input() userInfo: any;

  constructor(private stepsComponent: NewRegisterComponent,) { }

  ngOnInit(): void {
  }

  goToStep(step:any) {
    this.stepsComponent.goToStep(step);
  }

}