import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestPricesComponent } from './latest-prices.component';

describe('LatestPricesComponent', () => {
  let component: LatestPricesComponent;
  let fixture: ComponentFixture<LatestPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
