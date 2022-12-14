import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailV3Component } from './car-detail-v3.component';

describe('CarDetailV3Component', () => {
  let component: CarDetailV3Component;
  let fixture: ComponentFixture<CarDetailV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDetailV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
